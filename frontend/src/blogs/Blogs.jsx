import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';


import { useNavigate } from 'react-router-dom';
import HomeHead from '../home/HomeHead'
import BlogBody from './BlogBody'

function Blogs() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 
  
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
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        
        const userData = {
          name: `${decoded.first_name} ${decoded.last_name}`,
          position: "Tech Founder", 
          company: "InnoTech Solutions",
          followers: 342,
          following: 156,
          articlesCount: 27
        };
  
        setUserData(userData);
        // console.log("User data:", userData);
      }
    } catch (err) {
      console.error("Invalid token format:", err);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, []);
  
  return (
    <div className='blogs_ctr'>
        <HomeHead isAuthenticated={true} />
        <BlogBody userData={userData} />
    </div>
  )
}

export default Blogs
