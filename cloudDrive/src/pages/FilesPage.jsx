import React from 'react'
import Navbar from '../componets/Navbar'
import Dashboard from '../componets/Dashboard'
import Filehome from '../componets/Filehome'


const FilesPage = () => {
  return (
    <>
    <div className='flex'>
    <Navbar  />
    <div className='h-screen w-full'>
      <Dashboard />
      <Filehome />
    </div>
  </div>
</>

  )
}

export default FilesPage