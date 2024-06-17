import React from 'react'
import Countdown from 'react-countdown'

const HomePagePage = () => {
  return (
    <div style={{backgroundImage:"url(/assets/images/home/header.png)"}} className="bg-center bg-cover bg-no-repeat w-full h-[100vh] text-[40px]  flex justify-center items-center flex-col">
        <div className='bg-red-600 text-white p-5 rounded-[15px] flex justify-center items-center flex-col gap-2'>
        <h1 className='font-bold'>Project I</h1>
        <Countdown date={"2024-8-22"}/>
        </div>

    </div>
  )
}

export default HomePagePage