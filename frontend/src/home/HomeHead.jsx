import React from 'react'
import './Home.css'
import logo from '../assets/InnoMindsBlogs.png'
import { NavLink } from 'react-router-dom';

function HomeHead(props) {
  const isAuthenticated = props.isAuthenticated;

  return (
    <div className='home_head'>
        <div className="head_logo_name">
            <img className='head_logo' src={logo} alt="InnoMinds Logo"/>
            <p className='head_name'> InnoMinds </p>
        </div>
        <div className="head_navbar">
            <NavLink to="/" className="nav_link" end>Home</NavLink>
            <NavLink to="/blogs" className="nav_link">Blogs</NavLink>
            <NavLink to="/about" className="nav_link">About Us</NavLink>
            <NavLink to="/contact" className="nav_link">Contact Us</NavLink>
        </div>
        <div className="head_login">
          {!isAuthenticated && 
			     <NavLink to="/login" className="nav_login"> Login </NavLink> }
        </div>
    </div>
  )
}

export default HomeHead