import React from 'react'
import loader2 from '../../public/loader2.gif'
function Loading() {
  return (
    <div className='h-screen w-screen flex  flex-col bg-black items-center'>
        <img className='w-1/2 object-cover'  src={loader2} alt="" />
        <h1 className='text-7xl font-semibold text-white'>Loading...</h1>
    </div>
  )
}

export default Loading