import React, {useState} from 'react'
import './Home.css'
import HomeHead from './HomeHead'
import HomeBody from './HomeBody'

function Home() {
    const [count, setCount] = useState(0)

  return (
    <div className='home_ctr'>
      <HomeHead />
      <HomeBody />
      
    </div>
  )
}

export default Home
