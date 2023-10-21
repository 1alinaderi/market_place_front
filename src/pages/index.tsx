import Layout from '@components/layout/layout';
import Link from 'next/link';
import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

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
      <div className="w-full p-0 m-0 p-3 md:overflow-hidden relative">
        <div className="w-full h-full p-0 m-0">
          <div className="w-full h-2/4 overflow-hidden md:h-1/4 grid grid-cols-1 md:grid-cols-12 gap-4 py-2 opacity-20">
            <span className="  col-span-12 md:col-span-4 relative ">
              <span className="absolute text-yellow-500 right-1/2 bottom-1/2 text-center translate-x-2/4 translate-y-2/4 text-3xl font-bold">
                LUXURY RETAIL
              </span>
              <img src="/assets/home/luxury.png" className="w-full h-full" />
            </span>
            <span className="bg-red-500 col-span-12 md:col-span-3 relative h-full rounded min-h-[120px] ">
              <span className="absolute text-white right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                FREE MARKET
              </span>
            </span>
            <span className=" col-span-12 md:col-span-5 relative h-full">
              <span className="absolute text-slate-700 right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                ECO-FRIENDLY BRANDS
              </span>
              <img src="/assets/home/eco.png" className="w-full h-full" />
            </span>
          </div>
          <div className="w-full h-full md:h-2/4 grid grid-cols-1 gap-4 py-2 md:grid-cols-12">
            <span className=" col-span-12 md:col-span-3  relative h-full opacity-20 ">
              <span className="absolute text-red-500 right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                DISCOUNTED RETAIL
              </span>
              <img src="/assets/home/discount.png" className="w-full h-full" />
            </span>
            <span className="col-span-12 md:col-span-5 ">
              <div className="text-6xl font-serif text-center font-bold tracking-wider py-4">
                PROJECT I
              </div>
              <div className=" grid h-52 mt-7 grid-cols-12 gap-3 ">
                <span className="bg-yellow-400 col-span-9 relative opacity-20">
                  <span className="absolute text-white right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold text-center">
                    COMMERCIAL BRANDS
                  </span>
                  <img
                    src="/assets/home/commerial.png"
                    className="w-full h-full"
                  />
                </span>
                <span className="col-span-3 flex justify-center items-center flex-col gap-4">
                  <Link href={'/'}>
                    <div className="rounded-full relative has-tooltip cursor-pointer bg-blue-400  md:w-[90px] w-[80px] shadow-2xl md:h-[90px] h-[80px]  text-center flex justify-center items-center text-3xl font-serif">
                      M<span className="tooltip bg-slate-700 px-3 text-white rounded">MEMBERSHIP</span>
                    </div>
                  </Link>

                  <div className="rounded-full cursor-pointer bg-orange-500  md:w-[90px] w-[80px]  md:h-[90px] h-[80px]  text-center flex justify-center items-center text-3xl text-white font-serif opacity-20">
                    F
                  </div>
                </span>
              </div>
            </span>
            <Link href={'/marketplace'}>
              <span className="duration-200 cursor-pointer hover:scale-95 col-span-12 md:col-span-4  relative shadow-2xl rounded-md">
                <span
                  style={{
                    textShadow:
                      '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                  }}
                  className="absolute  text-center text-amber-600  drop-shadow-md px-12 right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-2xl md:text-3xl font-bold "
                >
                  SUSTAINABLE ART AND ARCHITECTURE
                </span>
                <img src="/assets/home/sus.png" className="w-full h-full" />
              </span>
            </Link>
          </div>
          <div className="w-full  h-3/4 md:h-1/4 grid grid-cols-1 md:grid-cols-12 gap-4 py-2 opacity-20">
            <span className="col-span-12 md:col-span-3  relative">
              <span className="absolute text-white right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-2xl font-bold whitespace-nowrap">
                LOW VALUE PRODUCTS
              </span>
              <img src="/assets/home/low.png" className="w-full h-full" />
            </span>
            <span className=" col-span-12 md:col-span-5 ">
              <div className=" grid grid-cols-12 gap-3">
                <span className="col-span-9 relative">
                  <span className="absolute text-white right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                    GAMING
                  </span>
                  <img
                    src="/assets/home/gaming.png"
                    className="w-full h-full"
                  />
                </span>
                <span className="col-span-3 flex justify-center items-center flex-col gap-2">
                  <div className="rounded-full cursor-pointer bg-gray-400  md:w-[90px] w-[80px]  md:h-[90px] h-[80px]  text-center flex justify-center items-center text-3xl font-serif">
                    L
                  </div>
                  <div className="rounded-full cursor-pointer bg-slate-700  md:w-[90px] w-[80px]  md:h-[90px] h-[80px]  text-center flex justify-center items-center text-3xl text-white font-serif">
                    I
                  </div>
                </span>
              </div>
            </span>
            <span className=" col-span-12 md:col-span-4  relative">
              <span className="absolute text-white right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 text-3xl font-bold whitespace-nowrap">
                ORGANIC FOOD
              </span>
              <img src="/assets/home/food.png" className="w-full h-full" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

Home.Layout = Layout;
