import React, { useState } from 'react';
import './signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/userReducer';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Config from '../config';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await axios.post(`${Config.ip}auth/signin`, {
                email,
                password
            });
            const { access_token: accessToken } = response.data;
            response = await axios.get(`${Config.ip}users/aboutme`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const { name, role, appliedJobs, postedJobs } = response.data;
            // Dispatch action to store access token in Redux
            dispatch(login({ accessToken, name, role, appliedJobs, postedJobs }));
            // Store access token in local storage
            localStorage.setItem('jobify_token', accessToken);
            setLoading(false);
            toast.success('Logged in Successfully.');
            // Redirect to home page
            navigate('/');
        } catch (error) {
            setLoading(false);
            toast.error('Login failed. Please check your credentials.');
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div className="signin_container">
            <h2 id="title">Log In</h2>
            <form onSubmit={handleSignIn}>
                <div className="form-item">
                    <label>Email:</label>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-item">
                    <label>Password:</label>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-item">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${loading ? "disabledBtn" : ""}`}
                    >
                        {loading ?
                            (<span className="material-symbols-outlined rotate" id="searchIcon">
                                progress_activity
                            </span>) :
                            ("Log In")
                        }
                    </button>
                </div>
            </form>
            <p className="sigup_link">New user? <Link to="/signup">Sign up</Link></p>
        </div>
    );
};

export default SignIn;
