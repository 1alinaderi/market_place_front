import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import {
  useProductsDiscountQuery,
  useProductsQuery,
} from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';
import BlogCard from '@components/cards/blog-card';

interface NewsGridProps {
  className?: string;
  discount?: boolean;
  productData?:any;
  loading?:boolean
}

export const NewsGrid: FC<NewsGridProps> = ({
  className = '',
  discount,
  productData,
  loading
}) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();
  const error = {message: "product not found"}
  

  // const {
  //   isFetching: isLoading,
  //   isFetchingNextPage: loadingMore,
  //   fetchNextPage,
  //   hasNextPage,
  //   data,
  //   error,
  // } = discount
  //   ? useProductsDiscountQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query })
  //   : useProductsQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query });

  // const productData = data?.pages[0]?.data;
  return (
    <>
      <div className="shrink-0 text-brand-dark font-medium text-15px leading-4 md:ltr:mr-6 md:rtl:ml-6 hidden lg:block mt-0.5 pb-7">
        {productData?.length} {t('text-items-found')}
      </div>
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 gap-3 md:gap-4 2xl:gap-5',
          className
        )}
      >
        {loading && (<ProductCardLoader/>)}
        {  productData?.length  ? (
          productData?.map((product: Product) => (
            <BlogCard
              key={`product--key-${product._id}`}
              data={product}
            />
          ))
        ) : null}
        
        {/* end of error state */}
      </div>
      {!productData?.length &&  (
        <div className="text-center w-full text-3xl text-black font-bold">
          No Item Founded
        </div>
      )}
      {/* {hasNextPage && (
        <div className="text-center pt-8 xl:pt-10">
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
          >
            {t('button-load-more')}
          </Button>
        </div>
      )} */}
    </>
  );
};
