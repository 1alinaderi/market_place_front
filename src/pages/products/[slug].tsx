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
import { httpReauest } from 'src/api/api';

export default function ProductPage({ baseData , data}) {

  return (
    <>
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb />
          <ProductSingleDetails data={data} baseData={baseData} />
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

export const getServerSideProps: GetServerSideProps = async ({ locale , params }) => {
  const url = params?.slug

  const res = await httpReauest("GET" , "/prouduct/" + url , {} , {})
  if (res.status === 200 || res.status === 201) {
    return {
      props: {
        data: res.data.data,
        ...(await serverSideTranslations(locale!, [
          'common',
          'forms',
          'menu',
          'footer',
        ])),
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
