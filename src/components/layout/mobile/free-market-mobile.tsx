import Loading from '@components/common/Loading';
import ProductCard from '@components/product/product-cards/product-card';
import { getRandomSort } from '@utils/getRandomSort';
import { Box, Category, Category2, UserSearch } from 'iconsax-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { httpReauest } from 'src/api/api';

const FreeMarketMobile = () => {
  const [t] = useTranslation('common');
  const [newProducts, setNewProducts] = useState<any>();
  const [popularProducts, setpopularProducts] = useState<any>();
  const [productData, setproductData] = useState<any>([]);
  const [loading, setloading] = useState<any>(true);
  const { ref, inView } = useInView();
  const random = getRandomSort()

  async function fetchData() {
    setloading(true);
    const limit = 10;
    const page = productData.length / limit + 1;
    await httpReauest(
      'GET',
      `/prouduct/free?page=${page}&limit=${limit}&sort=${random}`,
      {},
      {}
    ).then(({ data }) => {
      setproductData((cur: any) => [...cur, ...data.data.allProduct]);
      if (data?.data?.allProduct?.length < limit) {
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
      '/prouduct/free?limit=7&sort=-createdAt',
      {},
      {}
    );
    const res2 = await httpReauest(
      'GET',
      '/prouduct/free?limit=7&sort=-visit',
      {},
      {}
    );
    setNewProducts(res.data.data.allProduct);
    setpopularProducts(res2.data.data.allProduct);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <h3>{t('for-your-business')}</h3>
        <div className="flex gap-3 mt-3 overflow-x-scroll">
          <Link href={'/category/free-market'}>
            <span className="bg-red-500 text-[14px] p-3 gap-3 rounded-[8px] flex items-center justify-between min-w-[154px] text-white">
              {t('text-all-categories')}
              <Category2 size={32} />
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
      <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3 ">
        {productData?.map((item: any) => (
          <ProductCard product={item} />
        ))}
        {loading && <div ref={ref}>Loading...</div>}
      </div>
    </div>
  );
};

export default FreeMarketMobile;
