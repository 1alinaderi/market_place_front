import Layout from '@components/layout/layout';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="bg-black">
        <div className="">
          <img
       
            className="w-full  object-cover "
            src="/assets/images/home/header.png"
            alt=""
          />
        </div>
        <div className="lg:flex hidden justify-center items-center gap-[60px]  py-3 px-[150px] ">
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
        <Link href={'/supplier/signup'}>
        <div className="flex  lg:hidden items-center justify-center gap-3 lg:gap-6 mx-3 px-2 lg:px-12 py-2 lg:py-4 border border-white mt-3">
          <img
            className="h-[30px] lg:h-[50px]"
            src="/assets/images/home/membership.png"
            alt=""
          />
          <h2 className="text-[#FFFFFF] text-xl lg:text-4xl">Membership</h2>
        </div>
        </Link>
     
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 py-3 px-3 grid-flow-row  ">
          <Link href={'/marketplace'}>
            <div className="relative h-full w-full">
              <img
                className=" w-full h-full"
                src="/assets/images/home/1.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                Sustainable
                <br />
                arch and art
              </p>
            </div>
          </Link>

          <Link href={'/products'}>
            <div className="relative h-full w-full row-span-1">
              <img
                className="h-full w-full"
                src="/assets/images/home/3.png"
                alt=""
              />
              <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                Free market
              </p>
            </div>
          </Link>
          <Link href={'/products/discounted'}>
            <div className="relative h-[25vh] lg:h-full col-span-2 lg:col-span-1 ">
              <img className=" w-full h-full " src="/assets/images/home/2.png" alt="" />
              <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                discounted retail
              </p>
            </div>
          </Link>
          <div className="relative h-full w-full">
            <img
              className="h-full w-full"
              src="/assets/images/home/4.png"
              alt=""
            />
            <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
              ECO <br />
              friendly brands
            </p>
          </div>
          <div className="relative h-full w-full">
            <img
              className="h-full w-full"
              src="/assets/images/home/5.png"
              alt=""
            />
            <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
              Luxury Retail
            </p>
          </div>
          <div className="relative h-full w-full">
            <img
              className="h-full w-full"
              src="/assets/images/home/6.png"
              alt=""
            />
            <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
              Commercial brand
            </p>
          </div>
          <div className="relative h-full w-full">
            <img
              className="h-full w-full"
              src="/assets/images/home/7.png"
              alt=""
            />
            <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
              Organic food
            </p>
          </div>
          <div className="relative h-full w-full">
            <img
              className="h-full w-full"
              src="/assets/images/home/8.png"
              alt=""
            />
            <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
              Low value product
            </p>
          </div>
          <div className="relative h-full w-full">
            <img
              className="h-full w-full"
              src="/assets/images/home/9.png"
              alt=""
            />
            <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
              Gaming
            </p>
          </div>
        </div>
        <div className="grid lg:hidden grid-cols-3 justify-items-center text-white gap-4 ">
          <Link href={'/supplier/signup'}>
          <div  className="flex flex-col items-center justify-center">
            <img
              className=" w-16"
              src="/assets/images/home/Pre-free Image.png"
              alt=""
            />
            <p>
              Premium <br /> Freemium
            </p>
          </div>
          </Link>
          <Link href={"/packing"} >
            <div className="flex flex-col items-center justify-center">
            <img
              className=" w-16"
              src="/assets/images/home/packing Image.png"
              alt=""
            />
            <p>Packing</p>
            </div>
        
          </Link>
          <div className="flex flex-col items-center justify-center">
            <img
              className=" w-16"
              src="/assets/images/home/donate Image.png"
              alt=""
            />
            <p>Donate</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              className=" w-16"
              src="/assets/images/home/logistics Image.png"
              alt=""
            />
            <p>Logistics</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              className=" w-16"
              src="/assets/images/home/insurance Image.png"
              alt=""
            />
            <p>Insurance</p>
          </div>
          
        </div>
      </div>
    </>
  );
}

Home.Layout = Layout;
