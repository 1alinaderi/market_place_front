import React from 'react';
import { httpReauest } from 'src/api/api';
import { useEffect, useState } from 'react';
import { PiHandWaving } from 'react-icons/pi';
import { AiOutlineQuestionCircle, AiOutlineShop } from 'react-icons/ai';
import { FaBoxes } from 'react-icons/fa';
import { MdVerifiedUser, MdCreditScore } from 'react-icons/md';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
const Iagree = ({ baseData, setAgree, mx }) => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [typeofsell, setTypeofsell] = useState('');
  const { t } = useTranslation('common');
  async function getuserData(id: any) {
    const { data } = await httpReauest('GET', '/supplier/' + id, {}, {});
    setData(data.data);
    console.log(data)
  }
  useEffect(() => {
    getuserData(baseData.cookies.seller?.id);
   
    
  }, []);
  console.log(baseData.cookies)
 async function handleAccept() {
    if (typeofsell === '') {
      return;
    } else {
      await httpReauest("POST","/supplier/type",{type: typeofsell,sellerId: baseData.cookies.seller?.id },{ 'x-access-token': baseData?.cookies?.seller?.token }).then(()=>{
        setAgree(true);
        
      })
      
    }
  }
  return (
    <div className="mx-2 lg:mx-0 ">
      <div
        className={`${
          mx ? 'mx-0' : 'lg:mx-[100px]'
        } flex justify-between items-center border border-border-base rounded py-3 lg:text-lg text-sm px-4 font-bold my-4 `}
      >
        <span className="flex items-center gap-2">
          {t('hi')} {data?.name} <PiHandWaving size={20} />
        </span>
        <span className="flex items-center lg:gap-10 gap-2">
          <div className="lg:text-[25px] text-[15px]">
            <AiOutlineQuestionCircle />
          </div>
          <button
            onClick={() => router.push('/')}
            className={`${
              mx ? 'hidden' : 'inline'
            } border px-2 border-[#111] rounded lg:py-2 lg:px-4 font-bold`}
          >
            {t('back-project')}
          </button>
        </span>
      </div>
      <div
        className={`${
          mx ? 'mx-0' : 'lg:mx-[100px]'
        } flex flex-col items-start border border-border-base rounded  px-4 py-3 gap-6`}
      >
        <h2 className="mb-3 font-bold text-lg">{t('active-steps')}</h2>
        <div className="flex items-center gap-3 lg:px-6">
          <div className="text-gray-500/80">
            <AiOutlineShop size={35} />
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="font-bold">{t('authentication')} </span>
            <span className="lg:text-[14px] text-[11px] text-gray-500/80">
              {t('authentication-desc')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:px-6">
          <div className="text-gray-500/80">
            <MdOutlineWorkspacePremium size={35} />
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="font-bold">{t('premium')} </span>
            <span className="lg:text-[14px] text-[11px] text-gray-500/80">
              {t('premium-desc')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:px-6">
          <div className="text-gray-500/80">
            <MdCreditScore size={35} />
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="font-bold">{t('referral')}</span>
            <span className="lg:text-[14px] text-[11px] text-gray-500/80">
              {t('referral-desc')}
            </span>
          </div>
        </div>
       

        <div className={`${mx ? 'hidden' : 'block'}`}>
          <h5 className="mb-3 font-bold text-lg">
            {t("type-of-sell")}
          </h5>
          <div className="flex items-center gap-5 px-8">
            <button
              onClick={() => setTypeofsell('whole')}
              className={`${typeofsell==="whole" ? "font-bold border-2 border-slate-600" : "border border-slate-300"}  px-8 py-6 rounded duration-100`}
            >
              {t("whole-saler")}
            </button>
            <button
              onClick={() => setTypeofsell('retail')}
              className={`${typeofsell==="retail" ? "font-bold border-2 border-slate-600" : "border border-slate-300"}  px-8 py-6 rounded duration-100`}
            >
              {t("retail-seller")}
            </button>
          </div>
        </div>

        <button
          onClick={handleAccept}
          className={`${
            mx
              ? 'hidden'
              : 'block' && typeofsell === ''
              ? 'bg-red-300'
              : 'bg-red-600'
          } w-[40%] py-2 text-lg  text-white rounded mx-8 mt-3`}
        >
          {t('continue')}
        </button>
      </div>
    </div>
  );
};

export default Iagree;
