import { useState, useEffect } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { useProductQuery } from '@framework/product/get-product';
import { getVariations } from '@framework/utils/get-variations';
import usePrice, { formatPrice } from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import ProductDetailsTab from '@components/product/product-details/product-tab';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { API_ENDPOINTS, CDN_BASE_URL } from '@framework/utils/api-endpoints';
import StarIcon from '@components/icons/star-icon';
import { BsStarHalf } from 'react-icons/bs';
import Modal from '@components/common/modal/modal';
import ShopSidebar from '@components/shops/shop-sidebar';
import RelatedProductFeed from './feeds/related-product-feed';
import Seo from '@components/seo/seo';
import ShopSidebarSmall from '@components/shops/shops-sidebar-small';

const ProductSingleDetails:React.FC<{baseData : any , data : any}> = ({ baseData , data }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const { width } = useWindowSize();

 


  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [show, setshow] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${router.query.slug}`;
  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.sale_price ? data.sale_price : data.price,
      baseAmount: data.price,
      currencyCode: 'USD',
    }
  );

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  
  const variations = getVariations(data?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    const dataVaiOption: any = data?.variation_options;
    selectedVariation = dataVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const imageSrc = `${CDN_BASE_URL}${data?.image}`;
  const myLoader = () => {
    return `${CDN_BASE_URL}${data?.image}`;
  };

  function showSupplierDetails() {
    setshow(true);
  }

  return (
    <>
      <Seo
        title={data?.name}
        description={data?.desc}
        path={`products/${data?._id}`}
      />
      <div className="mt-10 pb-2 md:pt-7">
        <Modal open={show} onClose={() => setshow(false)}>
          <div className="w-full bg-white p-2 max-w-[400px]">
            <ShopSidebarSmall data={data?.owner} />
          </div>
        </Modal>
        <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
          <div className="col-span-5 mb-6 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
            {data?.images?.length ? (
              <ThumbnailCarousel
                gallery={[...data?.images, data?.image]}
                thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
                galleryClassName="xl:w-[150px] 2xl:w-[170px]"
              />
            ) : (
              <div className="flex items-center justify-center w-auto">
                <Image
                  loader={myLoader}
                  src={imageSrc ?? '/product-placeholder.svg'}
                  alt={data?.name}
                  width={900}
                  height={450}
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2">
            <div className="pb-3 lg:pb-5">
              <div className="md:mb-2.5 block -mt-1.5">
                <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                  {router.locale === 'fa' && data?.name}
                  {router.locale === 'ar' && data?.name_ar}
                  {router.locale === 'en' && data?.name_en}
                </h2>
              </div>
              <div className="pt-2">
                {t('t-owner')} : {data?.owner?.name}
              </div>
              {data?.rate ? (
                // <StarRatingComponent
                //   name="app"
                //   starCount={5}
                //   value={data?.rate}
                //   starColor="#F3B81F"
                //   emptyStarColor="#DFE6ED"
                //   renderStarIconHalf={() => (
                //     <BsStarHalf
                //       color="#F3B81F"
                //       className="w-4.5 lg:w-5 h-4.5 lg:h-5 mt-3"
                //     />
                //   )}
                //   renderStarIcon={() => (
                //     <StarIcon className="w-4.5 lg:w-5 h-4.5 lg:h-5 mt-3" />
                //   )}
                // />
                <></>
              ) : (
                <div className="pt-2">{t('no-rate')}</div>
              )}

              {/* {data?.reviews?.length == 0 ? (
              <div className="pt-2">No Reviews yet</div>
            ) : (
              <div className="pt-2">{data?.reviews?.length} Reviews</div>
            )} */}

              {isEmpty(variations) && (
                <div className="flex items-center mt-4">
                  {data?.specialPrice ? (
                    <>
                      <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                        {formatPrice({
                          amount: data?.specialPrice,
                          currencyCode: 'USD',
                          locale: 'en',
                        })}
                      </div>
                      <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                        {price}
                      </del>
                    </>
                  ) : (
                    <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                      {price}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={`popup-attribute-key${variation}`}
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            );
          })} */}

            {/* <div className="pb-2">
           

             <>
              {data?.balance > 0 ? (
                <span className="text-lg font-medium text-yellow">
                  {data?.balance + ' ' + t('text-left-item')}
                </span>
              ) : (
                <div className="text-base text-red-500 whitespace-nowrap">
                  {t('text-out-stock')}
                </div>
              )}
            </> 
          </div> */}

            <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
              {/* <Counter
              variant="single"
              value={selectedQuantity}
              onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              disabled={selectedQuantity >= data?.balance}
            /> */}
              <Button
                onClick={showSupplierDetails}
                className="w-full px-1.5"
                disabled={!isSelected}
                loading={addToCartLoader}
              >
                <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
                {t('text-add-to-cart')}
              </Button>
            </div>
            {data?.tag && (
              <ul className="pt-5 xl:pt-6">
                <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                  <LabelIcon className="ltr:mr-2 rtl:ml-2" /> {t('text-tags')}:
                </li>
                {data?.tag?.map((item: any) => (
                  <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                    <TagLabel data={item} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <ProductDetailsTab baseData={baseData} data={data} />
      </div>
      <RelatedProductFeed
        freeMarket={data?.freeMarket}
        category={data?.category?._id}
        uniqueKey="related-products"
      />
    </>
  );
};

export default ProductSingleDetails;
