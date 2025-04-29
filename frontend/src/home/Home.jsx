import React, {useState} from 'react'
import './Home.css'
import HomeHead from './HomeHead'

function Home() {
    const [count, setCount] = useState(0)

  return (
    <div className='home_ctr'>
      <HomeHead />
      
    </div>
  )
}

export default Home
