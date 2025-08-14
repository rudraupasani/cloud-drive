import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className='hidden lg:flex flex-col w-60 bg-white shadow-md h-screen sticky top-0 z-40'>
        {/* Logo */}
        <div className='p-4 border-b-2 border-gray-200 flex items-center'>
          <img
            className='h-14 w-14 rounded-2xl object-cover'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjqT-BG4Dkj5kJu3cpPE0gz2ArPJPqEtAQA&s"
            alt="CloudDrive Logo"
          />
          <h1 className='font-bold text-2xl ml-2'>CloudDrive</h1>
        </div>

        {/* Navigation Links */}
        <div className='flex flex-col flex-grow items-center bg-gray-50'>
          <Link
            to="/"
            className='w-full text-center py-4 text-md font-bold bg-gray-50 hover:bg-blue-400 hover:text-white transition duration-200'
          >
            Home
          </Link>
          <Link
            to="/upload"
            className='w-full text-center py-4 text-md font-bold bg-gray-50 hover:bg-blue-400 hover:text-white transition duration-200 mt-1'
          >
            Upload
          </Link>
          <Link
            to="/files"
            className='w-full text-center py-4 text-md font-bold bg-gray-50 hover:bg-blue-400 hover:text-white transition duration-200 mt-1'
          >
            Files
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
