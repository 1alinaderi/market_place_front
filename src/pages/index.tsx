import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Countdown from 'react-countdown';

const HomePagePage = () => {
  const router = useRouter()
  const [animated, setanimated] = useState(false);

  const Completionist = () =>  <div className='fixed left-1/2 top-1/2 -translate-y-1/2 text-[40px] lg:text-[80px] font-bold -translate-x-1/2 text-white bg-balck z-20 bg-black/50 p-2 rounded-sm'>WELCOME</div>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setanimated(true)
      setTimeout(() => {
        router.push("/home")
      }, 5000);
      return <Completionist />;
    } else {
      if (days === 0 && hours === 0 && minutes === 0) {
        return (
          <div className='fixed left-1/2 top-1/2 -translate-y-1/2 text-[40px] lg:text-[80px] font-bold -translate-x-1/2 text-white bg-black/50 p-2 px-5 rounded-sm z-20'>{seconds}</div>
        )
      }
      // Render a countdown
      return (
        <div className="bg-red-600/20 lg:absolute  z-10  lg:bottom-1 lg:left-1/2 lg:-translate-x-1/2 left-0 right-0  w-full lg:w-fit  text-white text-lg m-1 rounded-[15px] flex justify-center items-center flex-col gap-2">
        <h1 className="font-bold text-2xl bg-white py-1 text-black w-full text-center rounded-t-xl">Project I</h1>
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
        </div>
      );
    }
  };
  return (
    <div
      
      className="w-full h-[100vh] max-h-[100vh] overflow-hidden text-[40px] relative bg-[#111]"
    >
    
          {animated && (
        <>
          <iframe
            className="absolute top-0 z-10 right-[-10rem] rounded-full hidden lg:block"
            width={"1000px"}
            height={"1000px"}
            src="https://lottie.host/embed/8c0bbba9-75ee-4d90-abb5-85c0d18e49ed/MufBl3o8TH.json"
          ></iframe>
          <iframe
            className="absolute top-[25rem] md:top-0 right-[0rem] z-10 md:right-[35vw] rounded-full hidden lg:block"
            width={"1000px"}
            height={"1000px"}
            src="https://lottie.host/embed/8c0bbba9-75ee-4d90-abb5-85c0d18e49ed/MufBl3o8TH.json"
          ></iframe>
       <iframe
            className="absolute  top-0 right-[0rem] z-10 rounded-full lg:hidden"
            width={"400px"}
            height={"400px"}
            src="https://lottie.host/embed/8c0bbba9-75ee-4d90-abb5-85c0d18e49ed/MufBl3o8TH.json"
          ></iframe>
        </>
      )}
      <img className='w-full lg:h-full lg:object-cover lg:absolute top-0 bottom-0 left-0 right-0' src="/assets/images/home/header.png" alt="" />
     
        <Countdown date={'2024-8-15'} renderer={renderer} />
    </div>
  );
};

export default HomePagePage;
