import React, { useState } from 'react';
import './signin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Config from '../config';

const PostJob = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [organization, setOrganization] = useState('');
    const [stack, setStack] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken = useSelector((state) => state.user.accessToken);
    const role = useSelector((state) => state.user.role);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (role !== 'RECRUITER') {
            toast.error('Only recruiters can post jobs');
            navigate('/');
            return;
        }
        setLoading(true);
        try {
            const data = {
                title,
                description,
                organization,
                stack: stack.split(',').map(item => item.trim()),
            }
            await axios.post(`${Config.ip}jobs`, data, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            toast.success('Job created successfully!');
            setLoading(false);
            navigate('/')
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="signin_container">
            <h2 id="title">Post a Job</h2>
            <form onSubmit={handleSignup}>
                <div className="form-item">
                    <label>Title:</label>
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label>Description:</label>
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label>Organization:</label>
                    <input type="text" placeholder="Organization" value={organization} onChange={e => setOrganization(e.target.value)} required />
                </div>
                <div className="form-item">
                    <label>Stack:</label>
                    <input type="text" placeholder="Stack (comma-separated)" value={stack} onChange={e => setStack(e.target.value)} required />
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
                            ("Post Job")
                        }
                    </button>
                </div>
            </form>
            <p className="signup_link">Back to <Link to="/">Jobs</Link></p>
        </div>
    );
};

export default PostJob;
