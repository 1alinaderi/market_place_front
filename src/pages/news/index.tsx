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
      <Seo
        title="اخبار"
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
        <img src="/assets/images/home/header.png" alt="" />
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