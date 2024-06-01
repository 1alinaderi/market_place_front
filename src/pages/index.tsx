import Layout from '@components/layout/layout';
import Reveal from '@components/motion/Reveal';
import RevealX from '@components/motion/RevealX';
import { ArrowRight2, Box, ClipboardText, ClipboardTick, Diamonds, Gift, Truck, TruckTime } from 'iconsax-react';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsHandIndex } from 'react-icons/bs';

export default function Home() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setMobile(true);
    }
  }, []);
  return (
    <>
      <div className="bg-[#11223a] overflow-hidden">
      <div className="lg:flex hidden justify-center items-center gap-[60px]  py-4 px-[150px] bg-[#08121f]">
          <Link href={'/supplier/signup'}>
            <button className="animation-text flex items-center gap-1  text-[#FFF] text-xl font-[100]">
              Membership<ArrowRight2 size={18}/>
            </button>
          </Link>
          <Link href={'/supplier'}>
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
        </div>
        <div className="">
          <Reveal head>
          <img
          style={{objectPosition:"0 80%"}}
            className="w-full h-[50vh] object-cover"
            src="/assets/images/home/header.png"
            alt=""
          />
          </Reveal>
         
        </div>
     
      
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 py-3 px-3 grid-flow-row  ">
          <RevealX head>
            <Link href={'/marketplace'}>
              <div style={{boxShadow:"0px 0px 15px 0px #ffffff70"}} className="relative cursor-pointer h-full w-full row-span-1 border-2 border-[#fff]/70 rounded-[14px] overflow-hidden ">
                <img
                  className="w-full h-full object-cover"
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
              <div style={{boxShadow:"0px 0px 15px 0px #ffffff70"}} className="relative cursor-pointer h-full w-full row-span-1 border-2 border-[#fff]/70 rounded-[14px] overflow-hidden ">
                <img
                  className="h-full w-full object-cover"
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
          
           <Link href={'/products/discount'}>
            <div style={{boxShadow:"0px 0px 15px 0px #ffffff70"}} className="cursor-pointer relative lg:h-full col-span-2 lg:col-span-1 border-2 border-[#fff]/70 rounded-[14px] overflow-hidden">
              <Reveal>
                <img
                  className=" w-full h-full object-cover"
                  src="/assets/images/home/2.png"
                  alt=""
                />
                <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                  discounted retail
                </p>
              </Reveal>
            </div>
          </Link>
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
              <Gift variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Donate</p>
        
          </div>
          </RevealX>
            </div>
          </span>
         
          

          <RevealX head>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover"
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
                className="h-full w-full object-cover"
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
                className="h-full w-full object-cover"
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
                className="h-full w-full object-cover"
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
                className="h-full w-full object-cover"
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
                className="h-full w-full object-cover"
                src="/assets/images/home/9.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-3 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                Gaming
              </p>
            </div>
          </RevealX>
        </div>          
      </div>
    </>
  );
}

Home.Layout = Layout;
