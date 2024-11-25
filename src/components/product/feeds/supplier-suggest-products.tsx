import { useFreshVegetablesProductsQuery } from '@framework/product/get-all-fresh-vegetables-products';
import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';
import { useEffect, useState } from 'react';
import { httpReauest } from 'src/api/api';
import ProductCard from '../product-cards/product-card';
import Heading from '@components/ui/heading';
import { useTranslation } from 'next-i18next';
import SectionHeader from '@components/common/section-header';

export default function SupplierSugestProducts({ name }: { name?: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setdata] = useState<any>();
  const [error, seterror] = useState<any>();
  const [t] = useTranslation("common")

  async function getData() {
    setIsLoading(true);
    const res = await httpReauest('GET', '/supplier/suggest/' + name, {}, {});
    setdata(res.data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [name]);

  return (
    <>
    <SectionHeader sectionHeading="text-suggest-supplier" className="mb-6 text-center" />
    <div className='flex gap-5 overflow-x-scroll'>
       {data?.map((item:any)=><ProductCard product={item}/>)}
    </div>
    </>
    
  );
}
