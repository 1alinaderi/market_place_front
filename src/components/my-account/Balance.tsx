import React from 'react'
const Balance = ({data}) => {
  return (
    <div>
   
  
    <div className='flex items-center justify-center gap-5 border border-slate-200 rounded  w-fit py-2 px-4'>
      <span className='text-xl'>{data?.balance}</span>
      <img className='w-[35px]' src="/image/token.jpg" alt="" />
    </div>
    </div>
  )
}

export default Balance
