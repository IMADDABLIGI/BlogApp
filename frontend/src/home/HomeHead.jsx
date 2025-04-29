import React from 'react'
import './Home.css'
import logo from '../assets/InnoMindsBlogs.png'

function HomeHead() {
  return (
    <div className='home_head'>
        <div className="head_logo_name">
            <img className='head_logo' src={logo}/>
            <p className='head_name'> InnoMinds </p>
        </div>
        <div className="head_navbar">

        </div>
        <div className="head_login">

        </div>
    </div>
  )
}

export default HomeHead
