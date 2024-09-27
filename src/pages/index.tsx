import Layout from '@components/layout/layout';
import Reveal from '@components/motion/Reveal';
import RevealX from '@components/motion/RevealX';
import {
  ArrowRight2,
  Box,
  ClipboardText,
  ClipboardTick,
  Diamonds,
  Gift,
  Truck,
  TruckTime,
  Translate,
  Note,
  RecoveryConvert,
} from 'iconsax-react';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BsHandIndex } from 'react-icons/bs';
import { FaNetworkWired, FaVirus } from 'react-icons/fa';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade } from 'swiper';
import LanguageSwitcherHeader from '@components/ui/LanguageSwitcherHeader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import Seo from '@components/seo/seo';

export default function Home() {
  const { t } = useTranslation('common');


  return (
    <div className="relative">
      <Seo
        title="هاب تجاری آینده"
        path=""
      />
      <div className="bg-[#11223a] overflow-hidden">
        <div
        dir='ltr'
          style={{
            background:
              'linear-gradient(90deg, rgba(38,47,69,1) 0%, rgba(81,150,206,1) 20%, rgba(254,132,146,1) 40%, rgba(164,37,39,1) 60%, rgba(118,29,33,1) 80%, rgba(34,22,32,1) 100%)',
          }}
          className="lg:grid grid-cols-10 hidden justify-center items-center gap-4  relative  py-4  pr-20 pl-6 2xl:pl-20 2xl:pr-32 bg-[#08121f]"
        >
          <Link href={'/membership'}>
            <button dir='ltr' className="animation-text flex items-center gap-1  text-[#FFF] md:text-[13px]  xl:text-[17px] font-[100]">
              {t('account-membership')}
              <span>
                <ArrowRight2 size={16} />
              </span>
            </button>
          </Link>
          <Link href={'/supplier/signup'}>
            <button dir='ltr' className="animation-text ml-3 flex items-center gap-1  text-[#FFF] md:text-[13px]  xl:text-[17px] italic ">
              {t('premium-home')}
              <span>
                <ArrowRight2 size={16} />
              </span>
            </button>
          </Link>
          <Link href={'/packing'}>
            <button dir='ltr' className="animation-text flex items-center gap-1  text-[#FFF] md:text-[13px]  xl:text-[17px] font-[100]">
              {t('packing')}{' '}
              <span>
                <ArrowRight2 size={16} />
              </span>
            </button>
          </Link>
          <Link href={'/donate'}>
          <button dir='ltr' className="animation-text flex items-center gap-1  text-[#FFF] md:text-[13px]  xl:text-[17px] font-[100]">
            {t('donate')}
            <span>
              <ArrowRight2 size={16} />
            </span>
          </button>
          </Link>
          <button dir='ltr' className="animation-text flex items-center gap-1  text-[#FFF] md:text-[13px]  xl:text-[17px] font-[100]">
            {t('logistics')}
            <span>
              <ArrowRight2 size={16} />
            </span>
          </button>
          <button dir='ltr' className="animation-text flex items-center gap-1  text-[#FFF] md:text-[13px]  xl:text-[17px] font-[100]">
            {t('insurance')}
            <span>
              <ArrowRight2 size={16} />
            </span>
          </button>
          <Link href={"/news"}>
          <button dir='ltr' className="animation-text flex items-center gap-1  text-[#FFF] md:text-[13px]  xl:text-[17px] font-[100]">
            {t('news')}
            <span>
              <ArrowRight2 size={16} />
            </span>
          </button>
          </Link>
          <button dir='ltr' className="animation-text flex items-center gap-1  text-[#FFF] md:text-[13px]  xl:text-[17px] font-[100]">
            {t('translate')}

            <span>
              <ArrowRight2 size={16} />
            </span>
          </button>
          <button dir='ltr' className="animation-text flex items-center gap-1  text-[#FFF] md:text-[13px]  xl:text-[17px] font-[100]">
            {t('contract')}
            <span>
              <ArrowRight2 size={16} />
            </span>
          </button>
          <div className=" w-fit relative z-30 mx-2">
            <LanguageSwitcherHeader
              justFa={true}
              mobile={false}
              small={false}
            />
          </div>
        </div>
        <div dir="ltr" className="relative z-10 ">
          <Swiper loop autoplay={{ delay: 4000 }} modules={[Autoplay]}>
            <SwiperSlide>
              <img
                className="w-full  object-cover lg:h-[450px] h-[200px] "
                src="/assets/images/home/header.png"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full  object-cover lg:h-[450px] h-[200px]"
                src="/assets/images/slider2.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full  object-cover lg:h-[450px] h-[200px]"
                src="/assets/images/slider3.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4  gap-3 lg:gap-10 py-4 lg:py-8 px-3 grid-flow-row  relative">
          <video
            loop
            muted
            autoPlay
            playsInline
            webkit-playsinline
            src="/video/1 (1).mp4"
            className="absolute left-0 top-0 h-full w-full object-cover lg:opacity-90 opacity-60"
          />

          <RevealX head>
            <Link href={'/sustainable-arch'}>
              <div
                style={{ boxShadow: '0px 0px 18px 0px #ffffff70' }}
                className="motionBorder relative cursor-pointer h-full w-full row-span-1  rounded-[14px] overflow-hidden "
              >
                <img
                  className="w-full h-full object-cover relative p-[2px] rounded-[14px]"
                  src="/assets/images/home/1.png"
                  alt=""
                />
                <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                  {t('sustainable')}
                  <br />
                  {t('arch-and-art')}
                </p>
              </div>
            </Link>
          </RevealX>

          <RevealX>
            <Link href={'/free-market'}>
              <div
                style={{ boxShadow: '0px 0px 18px 0px #ffffff70' }}
                className="motionBorder relative cursor-pointer h-full w-full row-span-1  rounded-[14px] overflow-hidden "
              >
                <img
                  className="h-full w-full object-cover  relative p-[2px] rounded-[14px]"
                  src="/assets/images/home/3.png"
                  alt=""
                />
                <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                  {t('free-market')}
                </p>
              </div>
            </Link>
          </RevealX>
          <div className="relative z-30 flex justify-center col-span-full lg:hidden">
            <LanguageSwitcherHeader
              justFa={true}
              mobile={false}
              small={false}
            />
          </div>
          <span className="col-span-full lg:hidden flex justify-between items-center text-white text-[12px]">
            <RevealX>
              <Link href="/donate">
              <div className="flex flex-col items-center justify-center">
                <span className="rounded-full p-2 overflow-hidden bg-white duration_hover  ">
                  <Gift variant="Bulk" color="#ff8a65" size={30} />
                </span>
                <p className="text-center mt-1">{t('donate')}</p>
              </div>
              </Link>

            </RevealX>

            <div>
              <Reveal head={false}>
                <Link href={'/membership'}>
                  <div className="flex  bg-red-600 w-fit uppercase  items-center justify-center gap-3 lg:gap-6 px-10 lg:px-12 py-2 lg:py-4   rounded-[14px]">
                    <h2 className="text-[#FFFFFF] text-[17px] lg:text-4xl font-sans font-[500]">
                      {t('account-membership')}
                    </h2>
                  </div>
                </Link>
              </Reveal>
            </div>

            <RevealX head>
              <Link href={'/packing'}>
                <div className="flex flex-col items-center justify-center">
                  <span className="rounded-full p-2 overflow-hidden bg-white duration_hover  ">
                    <Box variant="Bulk" color="#ff8a65" size={30} />
                  </span>

                  <p className="text-center mt-1">{t('packing')}</p>
                </div>
              </Link>
            </RevealX>
          </span>
          <span className="col-span-full text-white flex gap-3 text-[12px] lg:col-span-1">
            <div className="flex flex-col gap-5 lg:hidden">
              <RevealX head>
                <div className="flex flex-col items-center justify-center">
                  <span className="rounded-full p-2 overflow-hidden bg-white duration_hover  ">
                    <TruckTime variant="Bulk" color="#ff8a65" size={30} />
                  </span>
                  <p className="text-center mt-1">{t('logistics')}</p>
                </div>
              </RevealX>
              <RevealX head>
                <div className="flex flex-col items-center justify-center">
                  <span className="rounded-full p-2 overflow-hidden bg-white duration_hover  ">
                    <ClipboardText variant="Bulk" color="#ff8a65" size={30} />
                  </span>
                  <p className="text-center mt-1">{t('insurance')}</p>
                </div>
              </RevealX>
              <RevealX head>
                <div className="flex flex-col items-center justify-center">
                  <span className="rounded-full p-2 overflow-hidden bg-white duration_hover  ">
                    <Translate variant="Bulk" color="#ff8a65" size={30} />
                  </span>
                  <p className="text-center mt-1">{t('translate')}</p>
                </div>
              </RevealX>
            </div>
            <Reveal>
              <Link href={'/products/discount'}>
                <div
                  style={{ boxShadow: '0px 0px 18px 0px #ffffff70' }}
                  className="motionBorder cursor-pointer relative lg:h-full col-span-2 lg:col-span-1 h-full rounded-[14px] overflow-hidden"
                >
                  <img
                    className=" w-full h-full  object-cover relative p-[2px] rounded-[14px]"
                    src="/assets/images/home/2.png"
                    alt=""
                  />
                  <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                    {t('discount')}
                  </p>
                </div>
              </Link>
            </Reveal>
            <div className="flex flex-col gap-5 lg:hidden">
              <RevealX>
                <Link href={'/supplier/signup'}>
                  <div className="flex flex-col items-center justify-center">
                    <span className="rounded-full p-2 overflow-hidden bg-white duration_hover  ">
                      <Diamonds variant="Bulk" color="#ff8a65" size={30} />
                    </span>
                    <p className="text-center mt-1">{t('premium-home')}</p>
                  </div>
                </Link>
              </RevealX>

              <RevealX>
                <Link href={"/news"}>
                <div className="flex flex-col items-center justify-center">
                  <span className="rounded-full p-2 overflow-hidden bg-white duration_hover  ">
                    <FaNetworkWired color="#ff8a65" size={30} />
                  </span>
                  <p className="text-center mt-1">{t('news')}</p>
                </div>
                </Link>
              </RevealX>
              <RevealX>
                <div className="flex flex-col items-center justify-center">
                  <span className="rounded-full p-2 overflow-hidden bg-white duration_hover  ">
                    <RecoveryConvert color="#ff8a65" size={30} />
                  </span>
                  <p className="text-center mt-1">{t('contract')}</p>
                </div>
              </RevealX>
            </div>
          </span>

          <RevealX head>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/4.png"
                alt=""
              />
              <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[22px] xl:text-[28px] italic text-[#fff] z-20">
                
                {t('friendly-brands')}
              </p>
            </div>
          </RevealX>
          <RevealX>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/5.png"
                alt=""
              />
              <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                {t('l-retail')}
              </p>
            </div>
          </RevealX>
          <RevealX head>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/6.png"
                alt=""
              />
              <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                {t('c-brands')}
              </p>
            </div>
          </RevealX>
          <RevealX>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/7.png"
                alt=""
              />
              <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                {t('organic-food')}
              </p>
            </div>
          </RevealX>
          <RevealX head>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/8.png"
                alt=""
              />
              <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                {t('l-v-product')}
              </p>
            </div>
          </RevealX>
          <RevealX>
            <div className="relative h-full w-full border-2 border-[#0e1a2b] rounded-[14px] overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src="/assets/images/home/9.png"
                alt=""
              />
              <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                {t('gaming')}
              </p>
            </div>
          </RevealX>
          <RevealX>
            <a
              target="_blank"
              href={'https://urameta.net'}
              rel="noopener noreferrer"
            >
              <div
                style={{ boxShadow: '0px 0px 18px 0px #ffffff70' }}
                className="motionBorder relative h-full w-full  rounded-[14px] overflow-hidden cursor-pointer"
              >
                <img
                  className="h-full w-full object-cover  relative p-[2px] rounded-[14px]"
                  src="/urametacover.png"
                  alt=""
                />
                <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                  {t('urameta')}
                </p>
              </div>
            </a>
          </RevealX>
          <RevealX>
            <a
              target="_blank"
              href={'https://sdgs.un.org/goals'}
              rel="noopener noreferrer"
            >
              <div
                style={{ boxShadow: '0px 0px 18px 0px #ffffff70' }}
                className="motionBorder  cursor-pointer relative h-full w-full bg-black  rounded-[14px] overflow-hidden"
              >
                <img
                  className="h-full w-full object-fill lg:max-h-[300px] xl:max-h-[340px]  md:max-h-[340px] sm:max-h-[150px] relative p-[2px] rounded-[14px]"
                  src="/stgs.png.jpg"
                  alt=""
                />
                <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                  SDGS
                </p>
              </div>
            </a>
          </RevealX>
          <span className="col-span-full lg:col-span-1">
            <RevealX>
              <Link href={'/about-us'}>
                <div
                  style={{ boxShadow: '0px 0px 18px 0px #ffffff70' }}
                  className="motionBorder  relative cursor-pointer h-full w-full  rounded-[14px] overflow-hidden"
                >
                  <img
                    className="h-full w-full object-cover  relative p-[2px] rounded-[14px]"
                    src="/sus (1).png"
                    alt=""
                  />
                  <p className=" absolute bottom-2 lg:bottom-5 ltr:left-3 rtl:right-3 ltr:lg:left-8 rtl:lg:right-6 text-[18px] lg:text-[26px] xl:text-[30px] italic text-[#fff] z-20">
                    {t('about')}
                  </p>
                </div>
              </Link>
            </RevealX>
          </span>
        </div>
        <div dir="ltr" className="relative z-10 col-span-full">
          <Swiper loop autoplay={{ delay: 4000 }} modules={[Autoplay]}>
            <SwiperSlide>
              <img
                className="w-full  object-cover lg:h-[450px] h-[200px] "
                src="/assets/images/home/header.png"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full  object-cover lg:h-[450px] h-[200px]"
                src="/assets/images/slider2.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full  object-cover lg:h-[450px] h-[200px]"
                src="/assets/images/slider3.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
