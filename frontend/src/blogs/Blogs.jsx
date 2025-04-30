import React, { useEffect } from 'react'
// import jwtDecode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';


import { useNavigate } from 'react-router-dom';
import HomeHead from '../home/HomeHead'
import BlogBody from './BlogBody'

function Blogs() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // console.log("Token expired");
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        // console.log("Token is valid");
      }
    } catch (err) {
      console.error("Invalid token format:", err);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [])

  return (
    <div className='blogs_ctr'>
        <HomeHead isAuthenticated={true} />
        <BlogBody />
    </div>
  )
}

export default Blogs
