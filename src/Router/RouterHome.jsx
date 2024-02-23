import React from 'react'
import Register from '../Components/User/Register'
import Login from '../Components/User/Login'
import { Routes,Route } from 'react-router-dom'
import OtpVerification from '../pages/otpverification'


function RouterHome() {
  return (
    <>
    <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/getotp" element={<OtpVerification />} />

        </Routes>
    </>
  )
}

export default RouterHome