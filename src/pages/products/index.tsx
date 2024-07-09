import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { ShopFilters } from '@components/search/filters';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import { GetStaticProps } from 'next';
import PageHeroSection from '@components/ui/page-hero-section';
import { useTranslation } from 'next-i18next';
import SearchTopBar from '@components/search/search-top-bar';
import { Element } from 'react-scroll';
import Seo from '@components/seo/seo';
import { useEffect, useState } from 'react';
import { FaSign, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@components/ui/button';

export default function Products() {
  const { t } = useTranslation('common');

  
  const [show , setShow] = useState<boolean>(false)

  async function getIp() {
    const response = await fetch('https://geolocation-db.com/json/')
    const data = await response.json();
    if (data.country_code === "IR") {
      setShow(true)
    }
  }

  useEffect(()=>{
    getIp()
  },[])
  return (
    <>
      <div className={`fixed top-1/2 ${show ? "right-0" : "-right-[280px] lg:-right-[380px]"}  duration-300  flex items-center z-50 -translate-y-1/2`}>
        <span onClick={()=>setShow(!show)} className='p-2 h-fit bg-brand-light shadow-md  cursor-pointer'>
        <FaSignInAlt/>
        </span>
        <span>
          <div
            className={
              'w-full  relative '
            }
          >
            <div className="mx-auto overflow-hidden rounded-lg text-center shadow-md w-[280px] lg:w-[380px] bg-brand-light md:px-8 py-6 px-3">
            <h4 className="w-full text-md lg:text-xl   text-black font-semibold">
            اگه تولید کننده هستی یا کالای صادراتی داری حتی با حجم کم تو فری مارکت مشتری صادراتی پیدا کن
            </h4>
            <Link href="/supplier/signin">
            <Button className='mt-3 font-[900] scale-90'>
           الان ثبت نام کن
            </Button>
            </Link>
            </div>
        </div>
        </span>
      </div>
      
      <Seo
        title="Products"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="products"
      />
      <PageHeroSection heroTitle={t('text-all-grocery-items')} />
      <Container>
        <Element name="grid" className="flex pb-16 pt-7 lg:pt-11 lg:pb-20">
          <div className="sticky hidden h-full shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-80 xl:w-96 top-16">
            <ShopFilters />
          </div>
          <div className="w-full lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
            {/* <SearchTopBar /> */}
            <ProductGrid />
          </div>
        </Element>
      </Container>
      {/* <DownloadApps /> */}
      <div>
        <img src="/image/banner/product4.jpg" alt="" />
      </div>
    </>
  );
}

Products.Layout = Layout;

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
