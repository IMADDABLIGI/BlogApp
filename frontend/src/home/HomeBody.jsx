import React from 'react'
import bodyImg from '../assets/HomeJpg.jpg'

function HomeBody() {
  return (
    <div className="home_body">
      <div className="home_left">
        <h1 className="home_title">Welcome to the Platform</h1>
        <p className="home_subtitle">Start sharing your ideas, discover blogs, and grow with the community.</p>
      </div>
      <div className="home_right">
        <img src={bodyImg} alt="Welcome Visual" className="home_image" />
      </div>
    </div>
  )
}

export default HomeBody
