import { useContext, useEffect, useState, type FC } from 'react';
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
import InfiniteScroll from 'react-infinite-scroll-component';
import { httpReauest } from 'src/api/api';
import { useInView } from 'react-intersection-observer';
import { SearchContext } from '@contexts/searchContext';

interface ProductGridProps {
  className?: string;
  category?: string;
  discount?: boolean;
  productData?: any;
  setProductData?: any;
  setloading?: any;
  loading?: boolean;
  count?: number;
}

export const ProductGrid: FC<ProductGridProps> = ({
  className = '',
  discount,
  productData,
  setProductData,
  count,
  setloading,
  loading,
}) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();
  const error = { message: 'product not found' };
  const [hasmore, sethasmore] = useState<boolean>(true);
  const { ref, inView } = useInView();

  const { category: filter_category, subCategory } = useContext(SearchContext);

  async function fetchData() {
    setloading(true);
    const limit = 10;
    const page = productData.length / limit + 1;
    await httpReauest(
      'GET',
      `/prouduct/free?page=${page}&limit=${limit}${
        filter_category ? '&category=' + filter_category : ''
      }${subCategory ? '&subCategory=' + subCategory : ''}`,
      {},
      {}
    ).then(({ data }) => {
      setProductData((cur) => [...cur, ...data.data.allProduct]);
      if (data?.data?.allProduct?.length < limit) {
        setloading(false);
      }
    });
  }

  useEffect(() => {
    if (inView) {
      if (productData.length) {
        fetchData();
      }
    }
  }, [inView]);

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
        {count} {t('text-items-found')}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflow: 'auto',
        }}
      >
        <div
          className={cn(
            'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5 h-fit',
            className
          )}
        >
          {productData?.length
            ? productData?.map((product: Product) => (
                <ProductCard
                  key={`product--key-${product._id}`}
                  product={product}
                />
              ))
            : null}
          {loading && <div ref={ref}>Loading...</div>}
        </div>
      </div>
      {!productData?.length && (
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
