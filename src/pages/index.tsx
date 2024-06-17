import React from 'react'
import Countdown from 'react-countdown'

const HomePagePage = () => {
  return (
    <div className="w-full h-[100vh] text-[40px]  flex justify-center items-center flex-col">
        <h1 className='text-black'>Project I</h1>
        <Countdown date={"2024-8-22"}/>
    </div>
  )
}

export default HomePagePage