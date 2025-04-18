import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [conformLogout, setConformLogout] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", inputValue);
    // You could add actual search logic here
  };

  return (
    <>
      <div className='w-110 lg:w-full h-22 bg-white border-b-gray-200 border-b-2 shadow-md flex items-center justify-between px-4'>
        <form onSubmit={handleSearch}>
          <div className='flex items-center'>
            <input
              className='hidden lg:block h-12 mt-2 w-120 border border-gray-300 rounded-lg rounded-r-none p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Search for files...'
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type='submit'
              className='p-4 lg:mr-0 hidden lg:block bg-blue-400 text-white py-3 px-4 rounded-lg rounded-l-none cursor-pointer ml-0 mt-2'
            >
              Search
            </button>
          </div>
        </form>
        <button className='lg:hidden'><FaBars className='text-2xl -ml-30' /></button>


        <div className='flex items-center'>
          <div className='flex items-center py-1 px-2 rounded-lg'>

            <button
              className='cursor-pointer rounded-full p-2 bg-gray-100 shadow-2xl hover:bg-black hover:text-white hover:shadow-md transition duration-300 ease-in-out'
              onClick={() => {
                navigate("/profile");
              }}
            >
              <CgProfile className='text-3xl' />
            </button>
          </div>

          <button
            onClick={() => {
              setConformLogout(true);
            }}
            className='bg-blue-400 text-white py-3 px-4 rounded-lg cursor-pointer hover:bg-black hover:text-white hover:shadow-md transition duration-300 ease-in-out'
          >
            Logout
          </button>
        </div>
      </div>

      
    {conformLogout && (
      <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 '>
        <div className='bg-amber-100 p-16 rounded-4xl shadow-lg '>
          <h2 className='text-lg font-semibold mb-4'>Are you sure you want to logout?</h2>
          <div className='flex justify-end'>
            <button
              onClick={() => setConformLogout(false)}
              className='bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-4  cursor-pointer'
            >
              Cancel
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                toast.success("User logged out successfully");
                navigate("/login");
              }}
              className='bg-red-500 text-white py-2 px-4 rounded-lg mr-10 cursor-pointer'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
    </>

  );
};
  

export default Dashboard;
