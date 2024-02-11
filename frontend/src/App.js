import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import SignIn from './pages/Signin';
import MainSection from './pages/MainSection';

const App = () => {
  return (
    <div className='App'>
      <ToastContainer />
      {/* <SignIn /> */}
      <MainSection />
    </div>
  );
};

export default App;
