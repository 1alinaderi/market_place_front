import Layout from '@components/layout/layout';
import Reveal from '@components/motion/Reveal';
import RevealX from '@components/motion/RevealX';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setMobile(true);
    }
  }, []);
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
        <Reveal head>
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
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 py-3 px-3 grid-flow-row  ">
          {mobile ? (
            <RevealX head>
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
            </RevealX>
          ) : (
            <Reveal>
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
            </Reveal>
          )}

          {mobile ? (
            <RevealX>
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
            </RevealX>
          ) : (
            <Reveal>
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
            </Reveal>
          )}

          <Link href={'/products/discounted'}>
            <div className="relative h-[25vh] lg:h-full col-span-2 lg:col-span-1 ">
              <Reveal>
                <img
                  className=" w-full h-full "
                  src="/assets/images/home/2.png"
                  alt=""
                />
                <p className=" absolute bottom-1 lg:bottom-5 left-2 lg:left-8 text-[15px] lg:text-[30px] italic text-[#fff] z-20">
                  discounted retail
                </p>
              </Reveal>
            </div>
          </Link>

          {mobile ? (
            <RevealX head>
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
            </RevealX>
          ) : (
            <Reveal>
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
            </Reveal>
          )}
          {mobile ? (
            <RevealX>
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
            </RevealX>
          ) : (
            <Reveal>
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
            </Reveal>
          )}
          {mobile ? (
            <RevealX head>
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
            </RevealX>
          ) : (
            <Reveal>
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
            </Reveal>
          )}
          {mobile ? (
            <RevealX>
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
            </RevealX>
          ) : (
            <Reveal>
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
            </Reveal>
          )}
          {mobile ? (
            <RevealX head>
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
            </RevealX>
          ) : (
            <Reveal>
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
            </Reveal>
          )}
          {mobile ? (
            <RevealX >
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
            </RevealX>
          ) : (
            <Reveal>
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
            </Reveal>
          )}
        </div>
        <div className="grid lg:hidden grid-cols-3 justify-items-center text-white gap-4 ">
          <Link href={'/supplier/signup'}>
            <div className="flex flex-col items-center justify-center">
              <Reveal>
                <img
                  className=" w-16"
                  src="/assets/images/home/Pre-free Image.png"
                  alt=""
                />
                <p>
                  Premium <br /> Freemium
                </p>
              </Reveal>
            </div>
          </Link>
          <Link href={'/packing'}>
            <div className="flex flex-col items-center justify-center">
              <Reveal>
                <img
                  className=" w-16"
                  src="/assets/images/home/packing Image.png"
                  alt=""
                />
                <p>Packing</p>
              </Reveal>
            </div>
          </Link>
          <div className="flex flex-col items-center justify-center">
            <Reveal>
              <img
                className=" w-16"
                src="/assets/images/home/donate Image.png"
                alt=""
              />
              <p>Donate</p>
            </Reveal>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Reveal>
              <img
                className=" w-16"
                src="/assets/images/home/logistics Image.png"
                alt=""
              />
              <p>Logistics</p>
            </Reveal>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Reveal>
              <img
                className=" w-16"
                src="/assets/images/home/insurance Image.png"
                alt=""
              />
              <p>Insurance</p>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}

Home.Layout = Layout;
