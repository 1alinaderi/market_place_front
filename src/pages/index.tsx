import Layout from '@components/layout/layout';
import Reveal from '@components/motion/Reveal';
import { Box, ClipboardText, Diamonds, Gift, Truck, TruckTime } from 'iconsax-react';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="bg-[#11223a]">
        <div className="">
          <img
            className="w-full  object-cover "
            src="/assets/images/home/header.png"
            alt=""
          />
        </div>
        <div className="lg:flex hidden justify-center items-center gap-[60px]  py-4 px-[150px] bg-[#08121f]">
          <Link href={'/supplier/signup'}>
            <button className="text-[#FFF] text-xl font-[100]">
              Membership
            </button>
          </Link>
          <Link href={'/supplier'}>
            <button className="text-[#FFF] text-xl italic ">
              Premium and Freemium
            </button>
          </Link>
          <Link href={'/packing'}>
            <button className="text-[#FFF] text-xl font-[100]">Packing</button>
          </Link>
          <button className="text-[#FFF] text-xl font-[100]">Donate</button>
          <button className="text-[#FFF] text-xl font-[100]">Logistics</button>
          <button className="text-[#FFF] text-xl font-[100]">Insurance</button>
        </div>
      
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 py-3 px-3 grid-flow-row  ">
          <Reveal>
            <Link href={'/marketplace'}>
              <div className="relative h-full w-full row-span-1 border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden ">
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
          </Reveal>

          <Reveal>
            <Link href={'/products'}>
              <div className="relative h-full w-full row-span-1 border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
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
          </Reveal>
          <span className='col-span-full lg:hidden'>
          <Reveal head={false}>
          <Link href={'/supplier/signup'}>
            <div className="flex   items-center justify-center gap-3 lg:gap-6 px-2 lg:px-12 py-3 lg:py-4 border-2 border-[#0e1a2b] bg-[#fff]/10 rounded-[14px] col-span-full">
              <img
                className="h-[30px] lg:h-[50px]"
                src="/assets/images/home/membership.png"
                alt=""
              />
              <h2 className="text-[#FFFFFF] text-xl lg:text-4xl">Membership</h2>
            </div>
          </Link>
          </Reveal>
          </span>
          <span className='col-span-full text-white flex gap-3 text-[12px] lg:col-span-1'>
            <div className='flex flex-col gap-4 lg:hidden'>
             
              <Reveal>
              <Link href={"/packing"}>
            <div className="flex flex-col items-center justify-center">
          
              <span className='rounded-full p-2 overflow-hidden bg-white'>
              <Box variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              
              <p className='text-center mt-1'>Packing</p>
          
          </div>
          </Link>
          </Reveal>
           
           
          <Reveal>
          <div className="flex flex-col items-center justify-center">
          
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <TruckTime variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Logistics</p>
        
          </div>
          </Reveal>
          <Reveal>
          <div className="flex flex-col items-center justify-center">
         
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <ClipboardText variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Insurance</p>
          
          </div>
          </Reveal>
            </div>
          
           <Link href={'/products/discounted'}>
            <div className="relative lg:h-full col-span-2 lg:col-span-1 border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
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
          <div className='flex flex-col gap-4 lg:hidden'>
          <Reveal>
            <div className="flex flex-col items-center justify-center">
            
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <Gift variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Donate</p>
        
          </div>
          </Reveal>
        
          <Reveal>
          <Link href={'/supplier/signup'}>
            <div className="flex flex-col items-center justify-center">
            
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <Diamonds variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Premium & Freemium</p>
        
          </div>
          </Link>
          </Reveal>
 
          <Reveal>
            <div className="flex flex-col items-center justify-center">
            
            <span className='rounded-full p-2 overflow-hidden bg-white'>
              <Gift variant='Bulk' color='#ff8a65' size={30}/>
              </span>
              <p className='text-center mt-1'>Donate</p>
        
          </div>
          </Reveal>
            </div>
          </span>
         
          

          <Reveal>
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
          </Reveal>
          <Reveal>
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
          </Reveal>
          <Reveal>
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
          </Reveal>
          <Reveal>
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
          </Reveal>
          <Reveal>
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
          </Reveal>
          <Reveal>
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
          </Reveal>
        </div>          
      </div>
    </>
  );
}

Home.Layout = Layout;
