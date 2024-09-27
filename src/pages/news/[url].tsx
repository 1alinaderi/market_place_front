import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { ShopFilters } from '@components/search/filters';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import { GetServerSideProps, GetStaticProps } from 'next';
import PageHeroSection from '@components/ui/page-hero-section';
import { useTranslation } from 'next-i18next';
import SearchTopBar from '@components/search/search-top-bar';
import { Element } from 'react-scroll';
import Seo from '@components/seo/seo';
import { useEffect, useState } from 'react';
import { FaCheck, FaFilter, FaSign, FaSignInAlt, FaSquare } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@components/ui/button';
import { httpReauest } from 'src/api/api';
import { useRouter } from 'next/router';
import BlogCard from '@components/cards/blog-card';
import { Calendar, CopySuccess } from 'iconsax-react';
import BlogImages from '@components/hero/BlogImages';
import BlogBestSection from '@components/hero/BlogBestSection';
import BlogOtherSection from '@components/hero/BlogOtherSection';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';
import BlogMayIntersted from '@components/hero/BlogMayIntersted';
import BlogComments from '@components/hero/BlogComments';
import copy from "clipboard-copy";
import BlogSmallCard from '@components/cards/BlogSmallCard';

export default function NewsDetailPage(props : any) {

  const {data , baseData} = props
  
  const { t } = useTranslation('common');
  const [productData , setProductData ] = useState([])
  const [loading, setLoading] = useState(false)
  const [show , setShow] = useState<boolean>(false)
  const [filter , setFilter] = useState(false)
  const [user, setuser] = useState();
  const [comments, setcomments] = useState([]);
  const [blogs, setblogs] = useState([]);
  const [copy1, setcopy1] = useState(false);
  const router = useRouter()
  const text = `https://wimehr.com/news/${data.url}`;

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

  async function getData() {

    if (baseData.cookies.user?.id) {
      setuser(baseData.cookies.user);
    }

    await httpReauest("GET", "/news?page=1&limit=12&category=" + data?.category, {}, {}).then((res) => {
      const newData = res.data.data.data.filter((e) => e._id !== data?._id);
      setblogs(newData);
    });

    await httpReauest("GET", "/news/comment/" + data?._id, {}, {}).then(
      (res) => {
        setcomments(res.data.data);
      }
    );
  }

  useEffect(()=>{
    getIp();
    getAllProduct()
    getData()
  },[])

  return (
    <> 
      <Seo
        title={data?.name}
        description={data?.desc}
        path={"/news/" + data?.url}
        article={ {
          publishedTime: data?.createdAt,
          modifiedTime: data?.updatedAt,
          authors: [
            data?.author,
          ],
          tags: data?.meta_keywords.split(", "),
        }}
      />
      <Container>
      <div className="lg:px-[50px] grid grid-cols-3 gap-5 my-8">
        <span className="col-span-3 lg:col-span-2">
          <div>
            <img src={CDN_BASE_URL + data?.cover} className='w-full rounded-[15px] max-h-[480px] object-cover'/>
          </div>
          <div className="mb-4 lg:mb-8">
            <h2 className="lg:text-3xl text-xl font-bold mt-[2rem]">{data?.name}</h2>
            <p className="mt-2">{data?.desc}</p>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: data?.content }}
            className="col-span-2 font-[Inter] lg:mt-10 mt-6 lg:text-lg text-[14px] content-blog"
          />
            <div  dir="ltr" className="mt-10 border-t border-b border-[#73818D57] py-3">
                 
                  <div className=" lg:gap-0 flex flex-wrap justify-start px-2 lg:px-0 lg:my-4">
                  
                    <span className="flex lg:hidden justify-start lg:justify-end lg:w-fit w-full gap-3 items-center text-[14px] text-[#1A1B1D]">
                 
                      <div  className="w-full">
                        <div className="flex items-center relative my-2">
                          <div className="relative w-full">
                            <input
                              id="website-url"
                              type="text"
                              aria-describedby="helper-text-explanation"
                              className="border bg-white rounded-l-lg border-r-0 h-[45px] border-gray-300 text-gray-500  text-[14px]  focus:ring-red-500 focus:border-red-500 block w-full p-3 py-4"
                              value={text}
                              disabled
                            />
                          </div>
                          <button
                            data-tooltip-target="tooltip-website-url"
                            data-copy-to-clipboard-target="website-url"
                            className="flex-shrink-0 z-10 inline-flex items-center py-3 px-3 h-[45px] text-[14px] font-medium text-center text-white bg-[#ff4343] rounded-r-lg  outline-none  "
                            type="button"
                            onClick={() => {
                              setcopy1(true);
                              copy(text);
                            }}
                          >
                            {!copy1 ? (
                              <span id="default-icon">
                                <CopySuccess />
                              </span>
                            ) : (
                              <span
                                id="success-icon"
                                className="inline-flex items-center"
                              >
                                <FaCheck size={22} color="#fff" />
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </span>
                    <span dir="ltr" className="flex gap-5 items-center justify-start w-full ">
                      <div  className="hidden lg:block">
                        <div className="flex items-center relative">
                          <div className="relative w-full">
                            <input
                              id="website-url"
                              type="text"
                              aria-describedby="helper-text-explanation"
                              className="border rounded-l-lg border-r-0 border-gray-300 text-gray-500  text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-3 "
                              value={text}
                              disabled
                            />
                          </div>
                          <button
                            data-tooltip-target="tooltip-website-url"
                            data-copy-to-clipboard-target="website-url"
                            className="flex-shrink-0 z-10 inline-flex items-center py-3 px-3 text-sm font-medium text-center text-white bg-[#ff4343] rounded-r-lg  outline-none  "
                            type="button"
                            onClick={() => {
                              setcopy1(true);
                              copy(text);
                            }}
                          >
                            {!copy1 ? (
                              <span id="default-icon">
                                <CopySuccess />
                              </span>
                            ) : (
                              <span
                                id="success-icon"
                                className="inline-flex items-center"
                              >
                                <FaCheck size={22} color="#fff" />
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
            <BlogComments comments={comments} user={user} blog={data._id} />
        </span>
        <span className="hidden lg:inline">
          <div className="border rounded-[15px] p-5 flex flex-col gap-3 bg-[#f7f7f7]">
            <h2 className="text-[20px] flex items-center gap-2">
              <FaSquare size={16} className="mt-1" color="#F37324" /> {t("realated-news")}
            </h2>
            {blogs?.map((item)=><BlogSmallCard data={item}/>)}
          </div>
        </span>
      </div>
      <BlogMayIntersted/>
      </Container>
      {/* <DownloadApps /> */}
      <div>
        <img src="/image/banner/product4.jpg" alt="" />
      </div>
    </>
  );
}
NewsDetailPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale  , params}) => {
  const url = params?.url;
  const data = await httpReauest("GET", "/news/" + url, {}, {});


  if (data.status === 200 || data.status === 201) {
    return { props: { data: data.data.data ,
        ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ]))} };
  } else {
    return {
      notFound: true,
    };
  }
};