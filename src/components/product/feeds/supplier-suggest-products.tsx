import { useFreshVegetablesProductsQuery } from '@framework/product/get-all-fresh-vegetables-products';
import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';
import { useEffect, useState } from 'react';
import { httpReauest } from 'src/api/api';

export default function SupplierSugestProducts({ name }: { name?: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setdata] = useState<any>();
  const [error, seterror] = useState<any>();

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
    <ProductsCarousel
      sectionHeading="text-suggest-supplier"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.FRESH_VEGETABLES_PRODUCTS_LIMITS}
      uniqueKey="fresh-vegetable"
      type={true}
    />
  );
}
