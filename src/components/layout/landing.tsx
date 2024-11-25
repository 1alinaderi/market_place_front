import FreeMarketMostVisted from '@components/product/feeds/free-market-most-visted';
import FreshVegetablesProductFeed from '@components/product/feeds/fresh-vegetables-product-feed';
import Button from '@components/ui/button';
import { Box, Crown, DiscountShape, Gift } from 'iconsax-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { BiNews } from 'react-icons/bi';
import { BsShieldFillCheck } from 'react-icons/bs';
import { RiCustomerService2Line } from 'react-icons/ri';

const LandingDesktop = () => {
  const [t] = useTranslation('common');

  return (
    <>
      <div className="w-full h-[70vh] slider_bg relative">
        <div className="absolute ltr:left-[6%] rtl:right-[6%] top-[35%] -translate-y-1/2 z-10 w-[50%]">
          <h2 className="text-[45px] text-white">{t('welcome-text')}</h2>
          <div className="flex gap-2 mt-3">
            <Button>
              <Link href={'/supplier/signup'}>{t('menu:menu-sign-in')}</Link>
            </Button>
            <Button variant="border">
              <Link href={'/free-market'}>{t('free-market')}</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[#1d3557] py-16 md:px-6 lg:px-16 2xl:px-24 grid grid-cols-4 gap-8">
        <Link href={'/news'}>
          <span className="rounded-[12px] flex flex-col gap-3 bg-white/10 py-6 px-6 items-start text-white/70 hover:bg-red-500/40  cursor-pointer hover:text-red-500 duration-200">
            <span className="rounded-full p-3 bg-white/20">
              <BiNews size={35} />
            </span>
            <h4 className="text-[20px] text-white">{t('common:news')}</h4>
            <p className="text-white">{t('common:news-desc')}</p>
          </span>
        </Link>
        <Link href={'/products/discount'}>
          <span className="rounded-[12px] flex flex-col gap-3 bg-white/10 py-6 px-6 items-start text-white/70 hover:bg-red-500/40  cursor-pointer hover:text-red-500 duration-200">
            <span className="rounded-full p-3 bg-white/20">
              <DiscountShape size={35} />
            </span>
            <h4 className="text-[20px] text-white">{t('common:discount')}</h4>
            <p className="text-white">{t('common:discount-desc')}</p>
          </span>
        </Link>
        <Link href={'/membership'}>
          <span className="rounded-[12px] flex flex-col gap-3 bg-white/10 py-6 px-6 items-start text-white/70 hover:bg-red-500/40  cursor-pointer hover:text-red-500 duration-200">
            <span className="rounded-full p-3 bg-white/20">
              <Crown size={35} />
            </span>
            <h4 className="text-[20px] text-white">
              {t('common:account-membership')}
            </h4>
            <p className="text-white">{t('common:news-desc')}</p>
          </span>
        </Link>
        <Link href={'/packing'}>
          <span className="rounded-[12px] flex flex-col gap-3 bg-white/10 py-6 px-6 items-start text-white/70 hover:bg-red-500/40  cursor-pointer hover:text-red-500 duration-200">
            <span className="rounded-full p-3 bg-white/20">
              <Box size={35} />
            </span>
            <h4 className="text-[20px] text-white">{t('common:packing')}</h4>
            <p className="text-white">{t('common:news-desc')}</p>
          </span>
        </Link>
      </div>
      <div className="py-20 md:px-6 lg:px-16 2xl:px-24 ">
        <div className="grid grid-cols-3 gap-5 items-center">
          <h3 className="text-[45px] text-black col-span-2">
            {t('explore-bussiness')}
          </h3>
          <div className="grid gap-5 grid-cols-2 ">
            <span className="ltr:border-l-4 rtl:border-r-4 flex flex-col p-2">
              <span className="text-red-500 text-[35px] font-bold">+200k</span>
              <span>{t('products')}</span>
            </span>
            <span className="ltr:border-l-4 rtl:border-r-4 flex flex-col p-2">
              <span className="text-red-500 text-[35px] font-bold">+500</span>
              <span>{t('suppliers')}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-8">
          <Link href={'/packing'}>
            <span className="border-2 cursor-pointer p-2 rounded-full gap-1 flex flex-col items-center justify-center text-center w-[140px] h-[140px] hover:border-red-500 ">
              <Box size={32} />
              <span>{t('packing')}</span>
            </span>
          </Link>
          <Link href={'/news'}>
            <span className="border-2 cursor-pointer p-2 rounded-full gap-1 flex flex-col items-center justify-center text-center w-[140px] h-[140px] hover:border-red-500 ">
              <BiNews size={32} />
              <span>{t('news')}</span>
            </span>
          </Link>
          <Link href={'/contact-us'}>
            <span className="border-2 cursor-pointer p-2 rounded-full gap-1 flex flex-col items-center justify-center text-center w-[140px] h-[140px] hover:border-red-500 ">
              <RiCustomerService2Line size={32} />
              <span>{t('footer:link-contact-us')}</span>
            </span>
          </Link>
          <Link href={'/donate'}>
            <span className="border-2 cursor-pointer p-2 rounded-full gap-1 flex flex-col items-center justify-center text-center w-[140px] h-[140px] hover:border-red-500 ">
              <Gift size={32} />
              <span>{t('donate')}</span>
            </span>
          </Link>
          <a target="_blank" href={'https://sdgs.un.org/goals'}>
            <span className="border-2 cursor-pointer p-2 rounded-full gap-1 flex flex-col items-center justify-center text-center w-[140px] h-[140px] hover:border-red-500 ">
              <span className="text-slate-800 text-[32px]">S</span>
              <span>SDGS</span>
            </span>
          </a>
          <Link href={'/membership'}>
            <span className="border-2 cursor-pointer p-2 rounded-full gap-1 flex flex-col items-center justify-center text-center w-[140px] h-[140px] hover:border-red-500 ">
              <Crown size={32} />
              <span>{t('account-membership')}</span>
            </span>
          </Link>
          <a target="_blank" href={'https://urameta.net'}>
            <span className="border-2 cursor-pointer p-2 rounded-full gap-1 flex flex-col items-center justify-center text-center w-[140px] h-[140px] hover:border-red-500 ">
              <img src='https://urameta.net/logo.png' className='w-12'/>
              <span>Urameta</span>
            </span>
          </a>
        </div>
      </div>
   
      <div className="blur_bg2 mb-10">
        <div className="py-32  md:px-6 lg:px-16 2xl:px-24 z-10 relative flex justify-center items-center flex-col">
          <span className="p-8 relative  text-white  flex flex-col items-center justify-center gap-5 w-[50%]">
            <h3 className="text-[45px] text-white   text-center">
              {t('text-ready-get-started')}
            </h3>
            <Link href={'/signup'}>
              <Button className="w-fit">{t('menu:menu-sign-up')}</Button>
            </Link>
          </span>
        </div>
      </div>
      <FreshVegetablesProductFeed />
      <FreeMarketMostVisted />
      <div className="blur_bg mb-10">
        <div className="py-24  md:px-6 lg:px-16 2xl:px-24 z-10 relative flex justify-center items-center flex-col">
          <h3 className="text-[45px] text-white w-[60%]  text-center">
            {t('trade-with-confedince')}
          </h3>
          <span className="p-8 relative bg-white/10 text-white backdrop-blur-3xl rounded-[12px] mt-10 flex flex-col gap-5 w-[40%]">
            {t('enscure-production')}
            <span className="flex items-end gap-1">
              <BsShieldFillCheck className="text-green-600" size={45} />
              <span className="text-green-200">Verifyed</span>
            </span>
            <p>{t('verifyed-desc')}</p>
            <Link href={'/membership'}>
              <Button className="w-fit" variant="border">
                {t('text-learn-more')}
              </Button>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default LandingDesktop;
