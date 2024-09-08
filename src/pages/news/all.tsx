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
import { FaFilter, FaSign, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@components/ui/button';
import { httpReauest } from 'src/api/api';
import { useRouter } from 'next/router';
import { CategoryFilterNews } from '@components/search/category-filter-news';
import { NewsGrid } from '@components/product/news-grid';

export default function AllNewsPage() {
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
   const response = await httpReauest('GET', '/news',{},{});
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
        title="همه اخبار"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="news/all"
      />
      <PageHeroSection backgroundThumbnail={"/18309537_SL-112119-25250-40.jpg"} mobileBackgroundThumbnail={"/18309537_SL-112119-25250-40.jpg"} heroTitle={t('text-all-news')} />
      <Container>
        <Element name="grid" className="flex pb-16 pt-7 lg:pt-11 lg:pb-20">
        <div  className={`absolute lg:static shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 w-full xl:rtl:pl-16 h-fit pb-[100px] lg:pb-0 bg-white overflow-y-auto lg:overflow-y-hidden lg:bg-transparent lg:block duration-300 top-[0px] pt-5 right-0 rtl:left-0 pl-6 rtl:pr-6 lg:w-64 xl:w-96 z-20 lg:z-0 ${filter ? "left-[0%] rtl:right-0" : "left-[-100%] rtl:right-[-100%]"}`}>
            <CategoryFilterNews setProductData={setProductData}  setFilter={setFilter}/>
          </div>
          <div className="w-full lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
          <button
              onClick={() => setFilter(true)}
              className="bg-red-600 rounded py-2 px-5 mb-4 text-white flex items-center gap-1 lg:hidden"
            >
              <p>{t("filters")}</p> <FaFilter />
            </button>
            <NewsGrid productData={productData} loading={loading}/>
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

AllNewsPage.Layout = Layout;

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