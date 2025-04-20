import React from 'react'
import Navbar from '../componets/Navbar';
import LoginPage from './LoginPage';
import Dashboard from '../componets/Dashboard';
import Profile from '../componets/Profile';


const ProfilePage = () => {
    const token = localStorage.getItem('token');

  return (
    <>
    {token ?
      <>
        <div className='flex'>
          <Navbar  />
          <div className='h-screen w-full'>
            <Dashboard />
            <Profile />
          </div>
        </div>
      </>
      :
      <>
        <LoginPage />
      </>
    }
  </>
  )
}

export default ProfilePage