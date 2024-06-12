import React from 'react'
import { MdOutlineGeneratingTokens } from "react-icons/md";
const Balance = () => {
  return (
    <div className='flex items-center justify-center gap-5 border border-slate-200 rounded  w-fit py-2 px-4'>
      <span className='text-xl'>0</span>
      <img className='w-[35px]' src="/image/token.jpg" alt="" />
    </div>
  )
}

export default Balance
