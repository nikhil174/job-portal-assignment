import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../store/userReducer';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
  const username = useSelector((state) => state.user.username);
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('jobify_token');
    dispatch(signOut());
    toast.success('Logged out Successfully.');
  };

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div className='header'>
      <div className="header_user">
        <p>{username ? `Hi, ${username}` : 'Hi, Guest'}</p>
      </div>
      <div className="postJob">
        {role === 'RECRUITER' && <Link to="/jobs/create">Post a Job</Link>}
      </div>
      <div className="header_auth">
        { username ? 
        <button onClick={handleSignOut}>Logout</button> : 
        <button onClick={handleLogin}>Login</button>
        }
      </div>
    </div>
  );
}
