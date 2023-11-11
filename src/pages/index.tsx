import Layout from '@components/layout/layout';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import Sound from 'react-sound';
import { FaMusic } from 'react-icons/fa';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <>
      <Particles
        style={{ zIndex: 1 }}
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: '#dfdfdf',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: false,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 1200,
                duration: 0.2,
              },
            },
          },
          particles: {
            color: {
              value: '#333',
            },
            links: {
              color: '#333',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1500,
              },
              value: 100,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      <div className="w-full  m-0 p-2 overflow-hidden relative md:h-[100vh]">
        <div className="w-full h-full p-0 m-0">
          <div className="w-full h-full overflow-hidden md:h-[30vh] grid grid-cols-1 md:grid-cols-12 gap-4 py-2 opacity-50">
            <span className="col-span-12 md:col-span-4 relative shadow-2xl flex justify-center items-center flex-col bg-white rounded-lg py-5 md:py-0">
              <img className="w-20 h-20" src="/icons/diamond.png" />
              <span
                style={{
                  textShadow:
                    '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
                }}
                className="  text-yellow-500  w-full text-center   text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold"
              >
                LUXURY RETAIL
              </span>
              {/* <img src="/assets/home/luxury (1).png" className="w-full h-full" /> */}
            </span>
            <span className="bg-white col-span-12 md:col-span-3 relative h-full rounded-lg py-5 md:py-0 flex flex-col justify-center items-center min-h-[120px] ">
              <img className="w-20 h-20" src="/icons/online-shopping.png" />
              <span
                style={{
                  textShadow:
                    '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
                }}
                className="mt-2 text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold w-full text-center"
              >
                FREE MARKET
              </span>
            </span>
            <span className=" col-span-12  md:col-span-5 relative h-full bg-white rounded-lg py-5 md:py-0 flex flex-col items-center justify-center">
              <img className="w-20 h-20" src="/icons/environmentalism.png" />
              <span
                style={{
                  textShadow:
                    '-2px 0 orange, 0 2px orange, 2px 0 orange, 0 -2px orange',
                }}
                className=" text-lime-600 pt-2  text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold w-full text-center"
              >
                ECO-FRIENDLY BRANDS
              </span>
            </span>
          </div>
          <div className="w-full h-full md:h-[39vh] grid grid-cols-1 gap-4 py-2 md:grid-cols-12">
            <span className=" col-span-12 md:col-span-3  relative h-full opacity-50 flex flex-col justify-center items-center bg-white rounded-lg py-5 md:py-0">
              <img className="w-20 h-20" src="/icons/offer.png" />
              <span
                style={{
                  textShadow:
                    '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
                }}
                className=" text-red-500  mt-2 text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold w-full text-center"
              >
                DISCOUNTED RETAIL
              </span>
            </span>
            <span className="col-span-12 md:col-span-5 h-full">
              <div className=" text-3xl sm:text-4xl md:py-0 py-2 md:text-3xl xl:text-4xl 2xl:text-5xl 2xl:text-6xl h-auto md:h-1/4  font-serif font-bold grid grid-cols-12  items-center justify-between">
                <span className=" col-span-9 text-center">
                  PROJECT I{' '}
                  <small className="text-[20px] font-sans whitespace-nowrap">
                    2020-2030
                  </small>
                </span>
                <span className="whitespace-nowrap col-span-3 flex justify-center pl-2">
                  <Link href={'/supplier/signup'}>
                    <div className="rounded-full relative col-span-2 has-tooltip cursor-pointer bg-blue-400  md:w-[70px] w-[70px] shadow-2xl md:h-[70px] h-[70px]  text-center flex justify-center items-center text-3xl font-serif">
                      M
                      <span className="tooltip bg-slate-700 px-3 text-white rounded absolute">
                        MEMBERSHIP
                      </span>
                    </div>
                  </Link>
                </span>
              </div>
              <div className=" grid  h-auto md:h-3/4   grid-cols-12 gap-3 ">
                <span className=" col-span-9 relative opacity-50 h-full flex flex-col items-center justify-center bg-white rounded-lg py-5 md:py-0">
                  <img className="w-20 h-20" src="/icons/brand-image.png" />

                  <span
                    style={{
                      textShadow:
                        '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
                    }}
                    className=" text-cyan-700 mt-1 text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center"
                  >
                    COMMERCIAL BRANDS
                  </span>
                </span>
                <span className="col-span-3 flex justify-center items-center flex-col gap-4">
                  <Link href={'/supplier/signup'}>
                    <div className="rounded-full relative has-tooltip cursor-pointer bg-blue-400  md:w-[70px] w-[70px] shadow-2xl md:h-[70px] h-[70px]  text-center flex justify-center items-center text-3xl font-serif">
                      P
                      <span className="tooltip bg-slate-700 px-3 text-white rounded absolute">
                        PREMIUM
                      </span>
                    </div>
                  </Link>
                  <Link href={'/supplier/signup'}>
                    <div className="rounded-full relative has-tooltip cursor-pointer bg-orange-500  md:w-[70px] w-[70px]  md:h-[70px] h-[70px]  text-center flex justify-center items-center text-3xl text-white font-serif ">
                      F
                      <span className="tooltip bg-slate-700 px-3 text-white rounded absolute">
                        FREEMIUM
                      </span>
                    </div>
                  </Link>
                </span>
              </div>
            </span>
            <Link href={'/marketplace'}>
              <span className="duration-200 bg-white  min-h-[200px] cursor-pointer flex items-center justify-center flex-col hover:scale-95 col-span-12 md:col-span-4  relative shadow-2xl rounded-lg py-5 md:py-0 h-full">
                <img className="w-20 h-20" src="/icons/design.png" />
                <span
                  style={{
                    textShadow:
                      '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                  }}
                  className=" px-3 mt-3 text-center text-amber-600 w-full drop-shadow-md  text-2xl md:text-2xl xl:text-3xl 2xl:text-4xl font-bold "
                >
                  SUSTAINABLE ART AND ARCHITECTURE
                </span>
                {/* <img src="/assets/home/sus (1).png" className="w-full h-full" /> */}
              </span>
            </Link>
          </div>
          <div className="w-full  h-full md:h-[30vh] grid grid-cols-1 md:grid-cols-12 gap-4 py-2">
            <span className="col-span-12 md:col-span-3  relative flex flex-col justify-center items-center opacity-50 bg-white rounded-lg py-5 md:py-0">
              <img className="w-20 h-20" src="/icons/reduce-cost.png" />

              <span className=" text-black   text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold ">
                LOW VALUE <br /> PRODUCTS
              </span>
            </span>
            <span className=" col-span-12 md:col-span-5 ">
              <div className=" grid grid-cols-12 gap-3 h-full ">
                <span className="col-span-9 relative h-full flex flex-col justify-center items-center bg-white rounded-lg py-5 md:py-0 opacity-50">
                  <img className="w-20 h-20" src="/icons/game-console.png" />

                  <span className=" text-black mt-2  text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold   ">
                    GAMING
                  </span>
                </span>
                <span className="col-span-3 flex justify-center items-center flex-col gap-4">
                  <Link href={'/'}>
                    <div className="rounded-full relative has-tooltip cursor-pointer bg-gray-400  md:w-[70px] w-[70px]  md:h-[70px] h-[70px]  text-center flex justify-center items-center text-3xl font-serif">
                      L
                      <span className="tooltip  bg-slate-700 px-3 text-white rounded absolute">
                        LOGISTICS
                      </span>
                    </div>
                  </Link>
                  <Link href={'/'}>
                    <div className="rounded-full relative has-tooltip cursor-pointer bg-slate-700  md:w-[70px] w-[70px]  md:h-[70px] h-[70px]  text-center flex justify-center items-center text-3xl text-white font-serif">
                      I
                      <span className="tooltip  bg-slate-700 px-3 text-white rounded absolute">
                        INSURANCE
                      </span>
                    </div>
                  </Link>
                </span>
              </div>
            </span>
            <span className=" col-span-12 md:col-span-4  relative  opacity-50 flex flex-col justify-center items-center bg-white rounded-lg py-5 md:py-0">
              <img className="w-20 h-20" src="/icons/diet.png" />

              <span className=" text-black mt-2  text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold w-full text-center">
                ORGANIC FOOD
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

Home.Layout = Layout;
