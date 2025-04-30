import React from 'react'
import HomeHead from '../home/HomeHead'
import BlogBody from './BlogBody'

function Blogs() {
  return (
    <div className='blogs_ctr'>
        <HomeHead isAuthenticated={true} />
        <BlogBody />
    </div>
  )
}

export default Blogs
