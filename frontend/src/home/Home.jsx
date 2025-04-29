import React, {useState} from 'react'
import './Home.css'
import Footer from './footer'

function Home() {
    const [count, setCount] = useState(0)

  return (
    <div className='home_ctr'>
      <div className='home_head'></div>
      {/* <h1>Welcome to the Home Page</h1>
      <p>This is a simple React application.</p>
      <p>Current count: {count}</p> */}
       <Footer></Footer>
  
    </div>
  )
}

export default Home
