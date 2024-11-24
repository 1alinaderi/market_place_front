import Loading from '@components/common/Loading';
import ProductCard from '@components/product/product-cards/product-card';
import { Box, Category, Category2, UserSearch } from 'iconsax-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { httpReauest } from 'src/api/api';

const DiscountedMobile = () => {
  const [t] = useTranslation('common');
  const [newProducts, setNewProducts] = useState<any>();
  const [popularProducts, setpopularProducts] = useState<any>();

  async function getData() {
    const res2 = await httpReauest('GET', '/prouduct/discount', {}, {});
    setpopularProducts(res2.data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {popularProducts?.length ? (
          popularProducts.map((item: any) => <ProductCard product={item} />)
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default DiscountedMobile;
