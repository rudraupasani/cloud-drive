import React from 'react'
import Navbar from '../componets/Navbar'
import Dashboard from '../componets/Dashboard'
import Upload from '../componets/Upload'

const UploadPage = () => {
  return (
    <>
    <div className='flex'>
    <Navbar />
    <div className='w-full h-screen '>
    <Dashboard />
    <Upload />
    </div>
    </div>
    </>
  )
}

export default UploadPage