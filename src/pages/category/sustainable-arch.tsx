import Loading from '@components/common/Loading';
import ProductCard from '@components/product/product-cards/product-card';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';
import { httpReauest } from 'src/api/api';

const SustainableArchCategoryPage = () => {
  const [t] = useTranslation('common');
  const router = useRouter();
  const [selected, setSelected] = useState<any>();
  const [categorys, setcategorys] = useState<any>([]);
  const [selctedSub, setselctedSub] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [loading2, setloading2] = useState<boolean>(true);
  const [productData, setproductData] = useState<any>([]);
  const { ref, inView } = useInView();

  async function fetchData(_id ?: string) {
    setloading2(true);
    const limit = 10;
    const page = productData.length / limit + 1;
    await httpReauest(
      'GET',
      `/prouduct?page=${page}&limit=${limit}&category=${_id ? _id : selected._id }&sort=-createdAt`,
      {},
      {}
    ).then(({ data }) => {
      setproductData((cur: any) => [...cur, ...data.data]);
      if (data?.data?.length < limit) {
        setloading2(false);
      }
    });
  }

  useEffect(() => {
    if (inView && selected) {
      fetchData();
    }
  }, [inView]);


  async function getData() {
    setloading(true)
    const res = await httpReauest(
      'GET',
      '/categorys',
      {},
      {}
    );
    setcategorys(res.data.data)
    setSelected(res.data.data.categorys[0])
    setloading(false)
    fetchData(res.data.data.categorys[0]._id)
  }

  useEffect(()=>{
    if (selected) {
      const finded = categorys.subCategorys.filter((item:any)=>item.category === selected._id)
      setselctedSub(finded)
      setproductData([])
      fetchData(selected._id)
    }
  },[selected])

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="p-4 text-center text-[18px] text-black font-bold relative">
        {t('text-all-categories')}
        {router.locale == 'en' ? (
          <FaAngleLeft
            size={25}
            onClick={() => router.back()}
            className="absolute top-1/2 left-4 -translate-y-1/2"
          />
        ) : (
          <FaAngleRight
            size={25}
            onClick={() => router.back()}
            className="absolute top-1/2 right-4 -translate-y-1/2"
          />
        )}
      </div>
      <div className="border-b flex gap-5 overflow-x-scroll text-black px-4">
      {loading ? <div className='flex justify-center w-full p-4'><Loading/></div> : categorys.categorys?.map((item:any)=>(
        <span
          onClick={() => setSelected(item)}
          className={`${
            selected._id === item._id && 'border-b-2 border-black font-bold'
          } py-4 whitespace-nowrap`}
        >
         {router.locale == "en" ? item?.name_en : router.locale == "ar" ? item.name_ar : item.name}
        </span>
      ))}
      </div>
      <div className="flex gap-2 flex-wrap items-start justify-center text-black px-4 py-5">
         {selctedSub?.map((item: any) => (
            <Link href={`/sustainable-arch/${selected?.url}/${item.url}`}>
              <span className="bg-slate-100 px-2 py-2 text-[12px] shadow rounded-md flex items-center gap-1 cursor-pointer hover:text-red-500">
                {router.locale == 'en'
                  ? item.name_en
                  : router.locale == 'ar'
                  ? item.name_ar
                  : item.name}
                {router.locale == 'en' ? <FaAngleRight /> : <FaAngleLeft />}
              </span>
            </Link>
          ))}
      </div>
      <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3 px-3">
        {productData?.map((item: any) => (
          <ProductCard product={item} />
        ))}
        {loading2 && <div ref={ref}><Loading/></div>}
      </div>
    </div>
  );
};

export default SustainableArchCategoryPage;

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