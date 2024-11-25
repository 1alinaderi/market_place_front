import Layout from '@components/layout/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import ShopsSingleDetailsSmall from '@components/shops/shops-single-details-small';
import { httpReauest } from 'src/api/api';

export default function ShopDetailsPage({data}) {
  return (
    <>
      <ShopsSingleDetailsSmall data={data}/>
      <div>
        <img src="/image/banner/product4.jpg" alt="" />
      </div>
    </>
  );
}

ShopDetailsPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale ,params}) => {
  const url = params?.slug 
  const encodedSlug = encodeURIComponent(url);
  const res = await httpReauest("GET" , `/supplier/${encodedSlug}` , {} , {})
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
