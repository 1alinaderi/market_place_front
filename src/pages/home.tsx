import Layout from '@components/layout/layout';
import Reveal from '@components/motion/Reveal';
import RevealX from '@components/motion/RevealX';
import { ArrowRight2, Box, ClipboardText, ClipboardTick, Diamonds, Gift, Truck, TruckTime } from 'iconsax-react';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BsHandIndex } from 'react-icons/bs';
import { FaNetworkWired, FaVirus } from 'react-icons/fa';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade } from 'swiper';

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLVideoElement>()

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setMobile(true);
    }
    if (ref.current) {
      ref.current.play()
    }
    
  }, []);



 
  return (
    <div className='relative'>
      <div className="bg-[#11223a] overflow-hidden">
      
      <div style={{background: "linear-gradient(90deg, rgba(38,47,69,1) 0%, rgba(81,150,206,1) 20%, rgba(254,132,146,1) 40%, rgba(164,37,39,1) 60%, rgba(118,29,33,1) 80%, rgba(34,22,32,1) 100%)"}} className="lg:flex hidden justify-center items-center gap-[60px] relative z-10 py-4 px-[150px] bg-[#08121f]">
          <Link href={'/supplier/signup'}>
            <button className="animation-text flex items-center gap-1  text-[#FFF] text-xl font-[100]">
              Membership<ArrowRight2 size={18}/>
            </button>
          </Link>
          <Link href={'/supplier/signup'}>
            <button className="animation-text flex items-center gap-1  text-[#FFF] text-xl italic ">
              Premium<ArrowRight2 size={18}/>
            </button>
          </Link>
          <Link href={'/packing'}>
            <button className="animation-text flex items-center gap-1  text-[#FFF] text-xl font-[100]">Packing <ArrowRight2 size={18}/></button>
          </Link>
          <button className="animation-text flex items-center gap-1  text-[#FFF] text-xl font-[100]">Donate<ArrowRight2 size={18}/></button>
          <button className="animation-text flex items-center gap-1  text-[#FFF] text-xl font-[100]">Logistics<ArrowRight2 size={18}/></button>
          <button className="animation-text flex items-center gap-1  text-[#FFF] text-xl font-[100]">Insurance<ArrowRight2 size={18}/></button>
          <button className="animation-text flex items-center gap-1  text-[#FFF] text-xl font-[100]">Referral<ArrowRight2 size={18}/></button>
        </div>
        <div className="relative z-10 ">
          <Swiper loop autoplay={{delay:4000}} modules={[Autoplay,EffectFade]} effect="fade" >
            <SwiperSlide>
            <img
              className="w-full  object-cover "
              src="/image/banner/product 4.jpg"
              alt=""
            />
            </SwiperSlide>
            <SwiperSlide>
            <img
              className="w-full  object-cover "
              src="/image/banner/product 4v2.jpg"
              alt=""
            />
            </SwiperSlide>
            <SwiperSlide>
            <img
              className="w-full  object-cover "
              src="/image/banner/product 1.jpg"
              alt=""
            />
            </SwiperSlide>
            <SwiperSlide>
            <img
              className="w-full  object-cover "
              src="/image/banner/product 1v2.jpg"
              alt=""
            />
            </SwiperSlide>
          </Swiper>
      
        
       
         
        </div>
     
      
        <div className="grid grid-cols-2 lg:grid-cols-4  gap-3 lg:gap-10 py-4 lg:py-8 px-3 grid-flow-row  relative">
        <video  ref={ref} loop muted src='/video/1 (1).mp4' className='absolute left-0 top-0 h-full w-full object-cover lg:opacity-90 opacity-60'/>

          <RevealX head>
            <Link  href={'/marketplace'}>
              <div style={{boxShadow:"0px 0px 15px 0px #ffffff70"}} className="motionBorder relative cursor-pointer h-full w-full row-span-1  rounded-[14px] overflow-hidden ">
                
                <img
                  className="w-full h-full object-cover relative p-1 rounded-[14px]"
                  src="/assets/images/home/1.png"
                  alt=""
                />
                <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                  Sustainable
                  <br />
                  arch and art
                </p>
              </div>
            </Link>
          </RevealX>

          <RevealX>
            <Link href={'/products'}>
              <div style={{boxShadow:"0px 0px 15px 0px #ffffff70"}} className="motionBorder relative cursor-pointer h-full w-full row-span-1  rounded-[14px] overflow-hidden ">
                <img
                  className="h-full w-full object-cover  relative p-1 rounded-[14px]"
                  src="/assets/images/home/3.png"
                  alt=""
                />
                <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                  Free market
                </p>
              </div>
            </Link>
          </RevealX>
          <span className='col-span-full lg:hidden flex justify-center'>
          <Reveal head={false}>
          <Link href={'/supplier/signup'}>
            <div className="flex  bg-red-600 w-fit uppercase items-center justify-center gap-3 lg:gap-6 px-10 lg:px-12 py-2 lg:py-4   rounded-[14px]">
              <h2 className="text-[#FFFFFF] text-[17px] lg:text-4xl font-sans font-[500]">Membership</h2>
            </div>
          </Link>
          </Reveal>
          </span>
          <span className='col-span-full text-white flex gap-3 text-[12px] lg:col-span-1'>
            <div className='flex flex-col gap-5 lg:hidden'>
             
              <RevealX head>
              <Link href={"/packing"}>
            <div className="flex flex-col items-center justify-center">
          
              <span className='rounded-full p-2 overflow-hidden bg-white'>
              <Box variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              
              <p className='text-center mt-1'>Packing</p>
          
          </div>
          </Link>
          </RevealX>
           
           
          <RevealX head>
          <div className="flex flex-col items-center justify-center">
          
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <TruckTime variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Logistics</p>
        
          </div>
          </RevealX>
          <RevealX head>
          <div className="flex flex-col items-center justify-center">
         
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <ClipboardText variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Insurance</p>
          
          </div>
          </RevealX>
            </div>
          <Reveal>
           <Link href={'/products/discount'}>

            <div style={{boxShadow:"0px 0px 15px 0px #ffffff70"}} className="motionBorder cursor-pointer relative lg:h-full col-span-2 lg:col-span-1  rounded-[14px] overflow-hidden">
              
                <img
                  className=" w-full h-full object-cover relative p-1 rounded-[14px]"
                  src="/assets/images/home/2.png"
                  alt=""
                />
                <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                  discounted retail
                </p>
              
            </div>
            
          </Link>
          </Reveal>
          <div className='flex flex-col gap-5 lg:hidden'>
          <RevealX>
            <div className="flex flex-col items-center justify-center">
            
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <Gift variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Donate</p>
        
          </div>
          </RevealX>
        
          <RevealX>
          <Link href={'/supplier/signup'}>
            <div className="flex flex-col items-center justify-center">
            
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <Diamonds variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Premium</p>
        
          </div>
          </Link>
          </RevealX>
 
          <RevealX>
            <div className="flex flex-col items-center justify-center">
            
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <FaNetworkWired  color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>referral</p>
        
          </div>
          </RevealX>
            </div>
          </span>
         
          

          <RevealX head>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/4.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                ECO <br />
                friendly brands
              </p>
            </div>
          </RevealX>
          <RevealX>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/5.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                Luxury Retail
              </p>
            </div>
          </RevealX>
          <RevealX head>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/6.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                Commercial brand
              </p>
            </div>
          </RevealX>
          <RevealX>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/7.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                Organic food
              </p>
            </div>
          </RevealX>
          <RevealX head>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/8.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                Low value product
              </p>
            </div>
          </RevealX>
          <RevealX>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/9.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                Gaming
              </p>
            </div>
          </RevealX>
          <RevealX>
            <Link href={"https://urameta.net"}>
            <div style={{boxShadow:"0px 0px 15px 0px #ffffff70"}} className="motionBorder relative h-full w-full  rounded-[14px] overflow-hidden cursor-pointer">
              <img
                className="h-full w-full object-cover  relative p-1 rounded-[14px]"
                src="/urametacover.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                Urameta
              </p>
            </div>
            </Link>
          
          </RevealX>
          <RevealX>
            <Link href={'https://sdgs.un.org/goals'}>

            <div style={{boxShadow:"0px 0px 15px 0px #ffffff70"}} className="motionBorder  cursor-pointer relative h-full w-full bg-black  rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-fill lg:max-h-[300px] xl:max-h-[340px]  md:max-h-[340px] sm:max-h-[150px] relative p-1 rounded-[14px]"
                src="/stgs.png.jpg"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                SDGS
              </p>
            </div>
            </Link>
          </RevealX>
       <span className='col-span-full lg:col-span-1'>
       <RevealX>
            <Link href={"/about-us"}>
            <div style={{boxShadow:"0px 0px 15px 0px #ffffff70"}} className="motionBorder  relative cursor-pointer h-full w-full  rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover  relative p-1 rounded-[14px]"
                src="/sus (1).png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
              About Us
              </p>
            </div>
            </Link>
          
          </RevealX>
       </span>
        
        </div>   
        <div className="relative z-10 col-span-full">
        <Swiper loop autoplay={{delay:4000}} modules={[Autoplay,EffectFade]} effect="fade" >
          
            <SwiperSlide>
            <img
              className="w-full  object-cover "
              src="/image/banner/product 2.jpg"
              alt=""
            />
            </SwiperSlide>
            <SwiperSlide>
            <img
              className="w-full  object-cover "
              src="/image/banner/product 2v2.jpg"
              alt=""
            />
            </SwiperSlide>
            <SwiperSlide>
            <img
              className="w-full  object-cover "
              src="/image/banner/product 3.jpg"
              alt=""
            />
            </SwiperSlide>
            <SwiperSlide>
            <img
              className="w-full  object-cover "
              src="/image/banner/product 3v2.jpg"
              alt=""
            />
            </SwiperSlide>
          </Swiper>
      
        
       
         
        </div>       
      </div>
    </div>
  );
}

Home.Layout = Layout;
