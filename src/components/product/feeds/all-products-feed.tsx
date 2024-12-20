import { Fragment } from 'react';
import ProductCard from '@components/product/product-cards/product-card';
import type { FC } from 'react';
import { useProductsQuery } from '@framework/product/get-all-products';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import SectionHeader from '@components/common/section-header';
import { useModalAction } from '@components/common/modal/modal.context';
import slice from 'lodash/slice';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';
import { useProductQuery } from '@framework/product/get-supplier-product';
interface ProductFeedProps {
  element?: any;
  className?: string;
  name?: any;
  small?: boolean;
}
const AllProductFeed: FC<ProductFeedProps> = ({
  element,
  className = '',
  name,
  small,
}) => {
  const { t } = useTranslation('common');

  const { data, error, isLoading } = useProductQuery(name);

  const { openModal } = useModalAction();

  function handleCategoryPopup() {
    openModal('CATEGORY_VIEW');
  }

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between pb-0.5 mb-4 lg:mb-5 xl:mb-6">
        <SectionHeader sectionHeading="all-products" className="mb-0" />
        
      </div>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div
          className={
            small
              ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 md:gap-3 2xl:gap-3'
              : 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 md:gap-3 2xl:gap-3'
          }
        >
          {isLoading && !data?.length ? (
            Array.from({ length: LIMITS.PRODUCTS_LIMITS }).map((_, idx) => (
              <ProductCardLoader
                key={`product--key-${idx}`}
                uniqueKey={`product--key-${idx}`}
              />
            ))
          ) : (
            <>
              {data?.map((product: any, index) => {
                return (
                  <Fragment key={index}>
                    <ProductCard
                      key={`product--key${product.id}`}
                      product={product}
                    />
                    {element && <div className="col-span-full">{element}</div>}
                  </Fragment>
                );
              })}
            </>
          )}
        </div>
      )}
      {/* {data?.map((product) => {
        return (
          <ProductCard key={`product--key${product.id}`} product={product} />
        );
      })} */}
    </div>
  );
};

export default AllProductFeed;
