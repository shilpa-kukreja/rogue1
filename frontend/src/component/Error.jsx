
import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='px-10 w-[100vw] h-[100vh] '>
        <h2 className='text-white'>Page Not Found    </h2>
        <Link className='text-white' to="/">
         go to home page
        </Link>
    </div>
  )
}

export default Error
