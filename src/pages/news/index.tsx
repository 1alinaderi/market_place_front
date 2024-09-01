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
import { FaFilter, FaSign, FaSignInAlt, FaSquare } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@components/ui/button';
import { httpReauest } from 'src/api/api';
import { useRouter } from 'next/router';
import BlogCard from '@components/cards/blog-card';
import { Calendar } from 'iconsax-react';
import BlogImages from '@components/hero/BlogImages';
import BlogBestSection from '@components/hero/BlogBestSection';
import BlogOtherSection from '@components/hero/BlogOtherSection';

export default function NewsPage() {
  const { t } = useTranslation('common');
  const [productData , setProductData ] = useState([])
  const [loading, setLoading] = useState(false)
  const [show , setShow] = useState<boolean>(false)
  const [filter , setFilter] = useState(false)
  const router = useRouter()
  async function getIp() {
    const response = await fetch('https://geolocation-db.com/json/')
    const data = await response.json();
    if (data.country_code === "IR") {
      setShow(true)
    }
  }
  async function getAllProduct() {
    setLoading(true)
   const response = await httpReauest('GET', '/prouduct',{},{});
   setProductData(response.data.data);
   setLoading(false)
  } 

  useEffect(()=>{
    
    getIp();
    getAllProduct()
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
        title="News"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="news"
      />
      <Container>
        <div className='my-10'>
         <BlogImages />
        </div>
        <div className="my-10">
        <BlogBestSection/>
        </div>
        <div className="my-10">
        <BlogOtherSection/>
        </div>
     
      </Container>
      {/* <DownloadApps /> */}
      <div>
        <img src="/image/banner/product4.jpg" alt="" />
      </div>
    </>
  );
}
NewsPage.Layout = Layout;

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