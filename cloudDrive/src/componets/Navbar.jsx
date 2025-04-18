import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
    <div className='hidden lg:block w-60 bg-white shadow-md h-screen justify-between sticky top-0'>
        {/* Logo */}
        <div className='p-4 border-b-2 border-gray-200 flex items-center'>
            <img className='h-13.5 w-16 rounded-2xl ml-[-10px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjqT-BG4Dkj5kJu3cpPE0gz2ArPJPqEtAQA&s" alt="" />
            <h1 className='font-bold text-2xl mt-1 ml-[-6px]'>CloudDrive</h1>
        </div>

        <div className='flex flex-col items-center justify-center bg-gray-50'>
            <Link to="/" className='w-full text-center py-4 text-md font-bold bg-gray-50 hover:bg-blue-400 hover:text-white'>Home</Link>
            <Link to="/upload" className='mt-1 w-full text-center py-4 text-md font-bold bg-gray-50 hover:bg-blue-400 hover:text-white'>Upload</Link>
            <Link to="/files" className=' mt-1 w-full text-center py-4 text-md font-bold bg-gray-50 hover:bg-blue-400 hover:text-white'>Files</Link>

        </div>

    </div>
    
    </>
  )
}

export default Navbar