import React, {useState} from 'react'
import './Home.css'

function Home() {
    const [count, setCount] = useState(0)

  return (
    <div className='home_ctr'>
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple React application.</p>
      <p>Current count: {count}</p>
    </div>
  )
}

export default Home
