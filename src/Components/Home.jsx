import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

function Home() {
    const location = useLocation();
    const id = location.state && location.state.id;
    
  return (
    <>
    <h1>Hello {location.state.id}and  welcome </h1>
    </>
  )
}

export default Home