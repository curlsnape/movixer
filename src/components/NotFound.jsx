import React from 'react'
import notfound from '../../public/notfound.gif'
function NotFound() {
  return (
    <div className='h-screen w-screen flex  flex-col bg-[#0c0c0d] items-center'>
        <img className='object-cover'  src={notfound} alt="" />
        
    </div>
  )
}

export default NotFound