import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product';
import DownloadApps from '@components/common/download-apps';
import PopcornJerkyProductFeed from '@components/product/feeds/popcorn-jerky-product-feed';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import Breadcrumb from '@components/ui/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Divider from '@components/ui/divider';
import FreshVegetablesProductFeed from '@components/product/feeds/fresh-vegetables-product-feed';
import Simillarproducts from '@components/product/feeds/simillarproducts';

export default function ProductPage({ baseData }) {
  return (
    <>
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb />
          <ProductSingleDetails baseData={baseData} />
        </Container>
      </div>

      {/* <Simillarproducts category='' /> */}
      {/* <DownloadApps /> */}
      <div>
        <img src="/image/banner/product4.jpg" alt="" />
      </div>
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
