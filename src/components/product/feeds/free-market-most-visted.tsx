import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';
import { useMostVistedFreeMarketProductsQuery } from '@framework/product/get-all-most-visted-free-market';

export default function FreeMarketMostVisted() {
  const { data, isLoading, error } = useMostVistedFreeMarketProductsQuery({
    limit: LIMITS.FRESH_VEGETABLES_PRODUCTS_LIMITS,
    sort: '-visted',
  });

  console.log(data);
  return (
    <ProductsCarousel
      sectionHeading="text-free-market-most-visted"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.FRESH_VEGETABLES_PRODUCTS_LIMITS}
      uniqueKey="most-visted-free-market"
      type={false}
    />
  );
}
