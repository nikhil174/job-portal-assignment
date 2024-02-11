import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import SignIn from './pages/Signin';
import MainSection from './pages/MainSection';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
        <ToastContainer />
      <div className='App'>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainSection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
