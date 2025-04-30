import React from 'react'
import './Home.css'
import Footer from './footer'
import HomeHead from './HomeHead'
import HomeBody from './HomeBody'

function Home() {
  return (
    <div className='home_ctr'>
      <HomeHead isAuthenticated={false} />
      <HomeBody />
      <Footer />
    </div>
  )
}

export default Home