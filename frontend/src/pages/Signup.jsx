import React, { useState } from 'react';
import './signin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../store/userReducer';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CANDIDATE'); // Default role is 'CANDIDATE'
    const [about, setAbout] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('http://localhost:5000/auth/signup', {
                name,
                email,
                password,
                role,
                about
            });
            const { access_token : accessToken } = response.data;
            const appliedJobs = [];
            const postedJobs = [];
            // Dispatch action to store access token in Redux
            dispatch(login({ accessToken, name, role, appliedJobs, postedJobs }));
            // Store access token in local storage
            localStorage.setItem('jobify_token', accessToken);
            toast.success('Signed up Successfully.');
            // Redirect to home page
            navigate('/');
        } catch (error) {
            toast.error('Signup failed. Please check your credentials.');
            console.error('Signup failed:', error.message);
        }
    };

    return (
        <div className="signin_container">
            <h2 id="title">Sign Up</h2>
            <form onSubmit={(e) => handleSignup(e)}>
                <div className="form-item">
                    <label>Name:</label>
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-item">
                    <label>Email:</label>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-item">
                    <label>Password:</label>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-item">
                    <label>Role:</label>
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="CANDIDATE">Candidate</option>
                        <option value="RECRUITER">Recruiter</option>
                    </select>
                </div>
                <div className="form-item">
                    <label>About:</label>
                    <textarea placeholder="About" value={about} onChange={e => setAbout(e.target.value)} />
                </div>
                <div className="form-item">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <p className="sigup_link">Already have an account? <Link to="/login">Login</Link></p>
        </div>
    ); 
};

export default Signup;
