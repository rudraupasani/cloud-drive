import React from 'react';
import Navbar from '../componets/Navbar';
import LoginPage from './LoginPage';
import Dashboard from '../componets/Dashboard';
import Home from '../componets/Home';

const HomePage = () => {
  const token = localStorage.getItem('token');

  return (
    <>
      {token ?
        <>
          <div className='flex'>
            <Navbar  />
            <div className='h-screen w-full'>
              <Dashboard />
              <Home />
            </div>
          </div>
        </>
        :
        <>
          <LoginPage />
        </>
      }
    </>
  );
};

export default HomePage;
