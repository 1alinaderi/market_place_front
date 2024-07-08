import React from 'react';
import Countdown from 'react-countdown';

const HomePagePage = () => {
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className=" grid grid-cols-4 gap-8 px-10 lg:px-5 py-2 lg:text-lg text-sm ">
          <span className="flex flex-col justify-center items-center ">
            <p className='lg:text-xl text-lg mb-1'>{days}</p>
            <p>Days </p>
          </span>
          <span className="flex flex-col justify-center items-center ">
            <p className='lg:text-xl text-lg mb-1'>{hours}</p>
            <p>Hours </p>
          </span>
          <span className="flex flex-col justify-center items-center ">
            <p className='lg:text-xl text-lg mb-1'>{minutes}</p>
            <p>Minutes </p>
          </span>
          <span className="flex flex-col justify-center items-center ">
            <p className='lg:text-xl text-lg mb-1'>{seconds}</p>
            <p>Seconds </p>
          </span>
          
        </span>
      );
    }
  };
  return (
    <div
      
      className=" w-full h-[100vh] text-[40px] lg:relative bg-[#111]"
    >
      <img className='w-full lg:h-full lg:object-cover lg:absolute top-0 bottom-0 left-0 right-0' src="/assets/images/home/header.png" alt="" />
      <div className="bg-red-600/20 lg:absolute  z-10  lg:bottom-1 lg:left-[33%] left-0 right-0  w-full lg:w-fit  text-white text-lg m-1 rounded-[15px] flex justify-center items-center flex-col gap-2">
        <h1 className="font-bold text-2xl bg-white py-1 text-black w-full text-center rounded-t-xl">Project I</h1>
        <Countdown date={'2024-8-2'} renderer={renderer} />
      </div>
    </div>
  );
};

export default HomePagePage;
