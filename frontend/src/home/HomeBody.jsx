import React from 'react'
import bodyImg from '../assets/HomeJpg.jpg'

function HomeBody() {
  return (
    <div className="home_body">
      <div className="home_left">
        <h1 className="home_title"> Discover. Share. Grow with InnoMinds.</h1>
        <p className="home_subtitle">InnoMinds is a space where entrepreneurs share their stories, struggles, and lessons.</p>
      </div>
      <div className="home_right">
        <img src={bodyImg} alt="Welcome Visual" className="home_image" />
      </div>
    </div>
  )
}

export default HomeBody