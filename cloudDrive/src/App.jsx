import React from 'react'
import LoginPage from './pages/LoginPage'
import { Routes, Route} from 'react-router-dom'
import Register from './componets/Register'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import FilesPage from './pages/FilesPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/files' element={<FilesPage />} />
        <Route path='/profile' element={<ProfilePage />} />

      </Routes>
  )
}

export default App