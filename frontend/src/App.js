import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import SignIn from './pages/Signin';
import MainSection from './pages/MainSection';
import Header from './components/Header';

const App = () => {
  return (
    <div className='App'>
      <ToastContainer />
      <Header />
      {/* <SignIn /> */}
      <MainSection />
    </div>
  );
};

export default App;
