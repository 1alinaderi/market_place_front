import Loading from '@components/common/Loading';
import ProductCard from '@components/product/product-cards/product-card';
import Button from '@components/ui/button';
import { Box, Category, Category2, Crown, UserSearch } from 'iconsax-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiNews } from 'react-icons/bi';
import { BsShieldFillCheck } from 'react-icons/bs';
import { useInView } from 'react-intersection-observer';
import { httpReauest } from 'src/api/api';

const SustainableMobile = () => {
  const [t] = useTranslation('common');
  const [newProducts, setNewProducts] = useState<any>();
  const [popularProducts, setpopularProducts] = useState<any>();
  const [productData, setproductData] = useState<any>([]);
  const [loading, setloading] = useState<any>(true);
  const { ref, inView } = useInView();

  async function fetchData() {
    setloading(true);
    const limit = 10;
    const page = productData.length / limit + 1;
    await httpReauest(
      'GET',
      `/prouduct?page=${page}&limit=${limit}`,
      {},
      {}
    ).then(({ data }) => {
      setproductData((cur: any) => [...cur, ...data.data]);
      if (data?.data?.length < limit) {
        setloading(false);
      }
    });
  }

  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView]);

  async function getData() {
    const res = await httpReauest(
      'GET',
      '/prouduct?limit=7&sort=-createdAt',
      {},
      {}
    );
    const res2 = await httpReauest(
      'GET',
      '/prouduct?limit=7&sort=-visit',
      {},
      {}
    );
    setNewProducts(res.data.data);
    setpopularProducts(res2.data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <h3>{t('for-your-business')}</h3>
        <div className="flex gap-3 mt-3 overflow-x-scroll">
          <Link href={'/category/sustainable-arch'}>
            <span className="bg-red-500 text-[14px] p-3 gap-3 rounded-[8px] flex items-center justify-between min-w-[154px] text-white">
              {t('text-all-categories')}
              <Category2 size={32} />
            </span>
          </Link>
          <Link href={'/membership'}>
            <span className="bg-emerald-500 text-[14px] p-3 gap-3 rounded-[8px] flex items-center justify-between min-w-[154px] text-white">
              {t('common:account-membership')}
              <Crown size={32} />
            </span>
          </Link>
          <Link href={'/news'}>
            <span className="bg-orange-600 text-[14px] p-3 gap-3 rounded-[8px] flex items-center justify-between min-w-[154px] text-white">
              {t('common:news')}
              <BiNews size={32} />
            </span>
          </Link>
          <Link href={'/packing'}>
            <span className="bg-blue-800 text-[14px] p-3 gap-3 rounded-[8px] flex items-center justify-between min-w-[154px] text-white">
              {t('packing')}
              <Box size={32} />
            </span>
          </Link>
          <Link href={'/suppliers'}>
            <span className="bg-green-800 text-[14px] p-3 gap-3 rounded-[8px] flex items-center justify-between min-w-[154px] text-white">
              {t('suppliers')}
              <UserSearch size={32} />
            </span>
          </Link>
        </div>
      </div>
    
      <div className="mt-7">
        <h3>{t('text-new-arrival')}</h3>
        <div className="flex gap-3 mt-3 overflow-x-scroll">
          {newProducts?.length ? (
            newProducts.map((item: any) => <ProductCard product={item} />)
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div className="blur_bg2 mt-7 ">
        <div className="py-6 z-10 relative flex justify-center items-center flex-col rounded-lg">
          <span className="p-8 relative  text-white  flex flex-col items-center justify-center gap-5">
            <h3 className="text-[30px] text-white   text-center">
              {t('text-ready-get-started')}
            </h3>
            <Link href={'/supplier/signup'}>
              <Button className="w-fit">{t('menu:menu-sign-in')}</Button>
            </Link>
          </span>
        </div>
      </div>
      <div className="mt-3">
        <h3>{t('text-cookies-cakes')}</h3>
        <div className="flex gap-3 mt-3 overflow-x-scroll">
          {popularProducts?.length ? (
            popularProducts.map((item: any) => <ProductCard product={item} />)
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {productData?.slice(0,4)?.map((item: any) => (
          <ProductCard product={item} />
        ))}
      <div className="blur_bg col-span-full rounded">
        <div className="py-6 px-4 z-10 relative flex justify-center items-center flex-col">
          <h3 className="text-[20px] text-white w-[60%]  text-center">
            {t('trade-with-confedince')}
          </h3>
          <span className="p-3 text-[14px] relative bg-white/10 text-white backdrop-blur-3xl rounded-[12px] mt-10 flex flex-col gap-5 w-[100%]">
            {t('enscure-production')}
            <span className="flex items-end gap-1">
              <BsShieldFillCheck className="text-green-600" size={30} />
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
      {productData?.slice(4)?.map((item: any) => (
          <ProductCard product={item} />
        ))}
        {loading && <div ref={ref}>Loading...</div>}
      </div>
    </div>
  );
};

export default SustainableMobile;
