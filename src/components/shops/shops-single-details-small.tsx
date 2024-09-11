import { useShopQuery } from '@framework/shop/get-shop';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUI } from '@contexts/ui.context';
import { getDirection } from '@utils/get-direction';
import { Element } from 'react-scroll';
import Container from '@components/ui/container';
import { Drawer } from '@components/common/drawer/drawer';
import ShopSidebar from '@components/shops/shop-sidebar';
import ShopSidebarDrawer from '@components/shops/shop-sidebar-drawer';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import { useTranslation } from 'next-i18next';
import useWindowSize from '@utils/use-window-size';
import { useSupplierQuery } from '@framework/product/get-supplier';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';
import { BsShieldFillCheck } from 'react-icons/bs';
import Seo from '@components/seo/seo';
import Text from '@components/ui/text';
import ProductsCarousel from '@components/product/products-carousel';
import { LIMITS } from '@framework/utils/limits';
import { useFreshVegetablesProductsQuery } from '@framework/product/get-all-fresh-vegetables-products';
import { ROUTES } from '@utils/routes';
import FreshVegetablesProductFeed from '@components/product/feeds/fresh-vegetables-product-feed';
import SupplierSugestProducts from '@components/product/feeds/supplier-suggest-products';

const ShopsSingleDetailsSmall: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();
  const { t } = useTranslation('common');
  const { data, isLoading } = useSupplierQuery(slug as string);
  const { openShop, displayShop, closeShop } = useUI();
  const { width } = useWindowSize();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };

  if (isLoading) return <p>Loading...</p>;

  const imageSrc = `${CDN_BASE_URL}${data?.logo}`;
  const myLoader = () => {
    return `${CDN_BASE_URL}${data?.logo}`;
  };


  return (
    <>
      <Seo
        title={data?.name}
        description={data?.desc}
        path={`suplliers/${data.name}`}
      />
      <div
        className="flex justify-center w-full h-56 bg-center bg-no-repeat bg-cover md:h-64 "
        style={{
          backgroundImage: `url(${
            width! <= 480
              ? data?.coverImage
                ? CDN_BASE_URL + data?.coverImage
                : '/assets/images/shop-page-hero-bg.jpg'
              : data?.coverImage
              ? CDN_BASE_URL + data?.coverImage
              : '/assets/images/shop-page-hero-bg.jpg'
          })`,
        }}
      />
      <div className="flex items-center px-4 py-4 border-b lg:hidden md:px-6 border-border-base  bg-slate-100">
      <ShopSidebar data={data} />

        {/* <div className="flex shrink-0">
          <Image
            loader={myLoader}
            src={imageSrc}
            alt={data?.name}
            width={80}
            height={80}
            className="rounded-full bg-slate-50 object-contain"
          />
        </div> */}
        {/* <div className="ltr:pl-4 rtl:pr-4">
          {data?.membership === 'Premium' && (
            <BsShieldFillCheck className="text-green-500 mr-2 " size={20} />
          )}
          <h2 className="font-semibold text-brand-dark text-15px">
            {data?.name}
          </h2>
          <button
            className="block text-sm font-medium transition-all text-brand hover:text-brand-muted"
            onClick={openShop}
          >
            {t('text-more-info')}
          </button>
        </div> */}
      </div>
      <Container className='bg-slate-100 pt-7 lg:pt-0'>
        <Element
          name="grid"
          className="flex flex-col pb-16 lg:pt-8 lg:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto gap-5"
        >
          <div className="shrink-0 hidden lg:block  lg:top-[80px] category-mobile-sidebar">
              <ShopSidebar data={data} />
          </div>
          <div >
           <SupplierSugestProducts name={data?._id}/>
          </div>
          <div className="w-full ">
            <AllProductFeed name={data?._id} small/>
          </div>
        </Element>
      </Container>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayShop}
        onClose={closeShop}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <ShopSidebarDrawer data={data} />
      </Drawer>
    </>
  );
};

export default ShopsSingleDetailsSmall;
