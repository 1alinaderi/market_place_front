import Link from 'next/link';
import React from 'react';

const MembershipCard = ({ free, onClose, gotovip }) => {
  return (
    <div
      onClick={() => {
        free ? onClose() : gotovip()
      }}
      className="cursor-pointer relative justify-between flex w-full max-w-[24rem] flex-col rounded-xl bg-gradient-to-tr from-yellow-500 via-orange-500 to-brand-danger bg-clip-border p-5 text-white shadow-cardHover shadow-black"
    >
      <div className="relative pb-5 m-0 mb-5 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none border-white/10 bg-clip-border">
        <p className="block font-sans text-xl antialiased font-normal leading-normal text-white uppercase">
          {free ? 'Freemium' : 'Premium'}
        </p>
        <h1 className="flex justify-center gap-1 mt-3 font-sans antialiased font-normal tracking-normal text-white text-5xl">
          {free ? (
            'Free'
          ) : (
            <>
              <span className="mt-2 text-4xl">$</span>800
            </>
          )}
        </h1>
      </div>
      <div className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-4">
            <span className="p-1 border rounded-full border-white/20 bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </span>
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
              visiting and introducing the services of suppliers for free
            </p>
          </li>
          <li className="flex items-center gap-4">
            <span className="p-1 border rounded-full border-white/20 bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </span>
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
              Possibility of paying with PayPal
            </p>
          </li>
          <li className="flex items-center gap-4">
            <span className="p-1 border rounded-full border-white/20 bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </span>
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
              15% discount on Middle East exhibition tours
            </p>
          </li>
          <li className="flex items-center gap-4">
            <span className="p-1 border rounded-full border-white/20 bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </span>
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
              15% discount on RADAR content production and business development
              services
            </p>
          </li>
          <li className="flex items-center gap-4">
            <span className="p-1 border rounded-full border-white/20 bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </span>
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
              15% discount for SECRET STRATEGY sales campaigns
            </p>
          </li>
          {!free && (
            <li className="flex items-center gap-4">
              <span className="p-1 border rounded-full border-white/20 bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                And many more options to read click on buy
              </p>
            </li>
          )}
        </ul>
      </div>
      <div className="p-0 mt-12">
        {free ? (
          <button
            className="block w-full select-none rounded-lg bg-white py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-pink-500 shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-dark="true"
            disabled
          >
            Selected
          </button>
        ) : (
          <>
            <Link href={'/my-account/vip'}>
              <button
                className="block w-full select-none rounded-lg bg-white py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-pink-500 shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-dark="true"
              >
                Buy Now
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MembershipCard;
