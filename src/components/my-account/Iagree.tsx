import React from 'react';
import { httpReauest } from 'src/api/api';
import { useEffect, useState } from 'react';
import { PiHandWaving } from 'react-icons/pi';
import { AiOutlineQuestionCircle, AiOutlineShop } from 'react-icons/ai';
import { FaBoxes } from 'react-icons/fa';
import { MdVerifiedUser, MdCreditScore } from 'react-icons/md';
const Iagree = ({ baseData,setAgree,mx }) => {
  const [data, setData] = useState([]);
  async function getuserData(id: any) {
    const { data } = await httpReauest('GET', '/user/' + id, {}, {});
    setData(data.data);
  }
  useEffect(() => {
    getuserData(baseData.cookies.user?.id);
    console.log(data);
  }, []);
  return (
    <div className='mx-2 lg:mx-0 '>
      <div className={`${mx ? "mx-0":"lg:mx-[100px]" } flex justify-between items-center border border-border-base rounded py-3 lg:text-lg text-sm px-4 font-bold my-4 `}>
        <span className="flex items-center gap-2">
          Hi Dear {data?.name} <PiHandWaving size={20} />
        </span>
        <span className="flex items-center lg:gap-10 gap-2">
          <button className='lg:text-[25px] text-[15px]'>
            <AiOutlineQuestionCircle  />
          </button>
          <button className="border px-2 border-[#111] rounded lg:py-2 lg:px-4 font-bold">
            Back to Project I
          </button>
        </span>
      </div>
        <div className={`${mx ? "mx-0" : "lg:mx-[100px]"} flex flex-col items-start border border-border-base rounded  px-4 py-3 gap-6`}>
          <h2 className="mb-3 font-bold text-lg">Activation steps</h2>
          <div className="flex items-center gap-3 px-6">
            <div className="text-gray-500/80">
              <AiOutlineShop size={35} />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-bold">Lorem ipsum, dolor sit </span>
              <span className="lg:text-[14px] text-[11px] text-gray-500/80">
                consectetur adipisicing elit. Laboriosam incidunt nesciunt vero
                est accusamus. Rerum animi
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6">
            <div className="text-gray-500/80">
              <FaBoxes size={35} />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-bold">Lorem ipsum, dolor sit </span>
              <span className="lg:text-[14px] text-[11px] text-gray-500/80">
                consectetur adipisicing elit. Laboriosam incidunt nesciunt vero
                est accusamus. Rerum animi
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6">
            <div className="text-gray-500/80">
              <MdVerifiedUser size={35} />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-bold">Lorem ipsum, dolor sit </span>
              <span className="lg:text-[14px] text-[11px] text-gray-500/80">
                consectetur adipisicing elit. Laboriosam incidunt nesciunt vero
                est accusamus. Rerum animi
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6">
            <div className="text-gray-500/80">
              <MdCreditScore size={35} />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-bold">Lorem ipsum, dolor sit </span>
              <span className="lg:text-[14px] text-[11px] text-gray-500/80">
                consectetur adipisicing elit. Laboriosam incidunt nesciunt vero
                est accusamus. Rerum animi
              </span>
            </div>
          </div>
          <button
            onClick={() => setAgree(true)}
            className={`${mx ? "hidden" : "block"} w-[40%] py-2 text-lg bg-red-600 text-white rounded mx-8 mt-3`}
          >
            Continue
          </button>
        </div>
    </div>
  );
};

export default Iagree;
