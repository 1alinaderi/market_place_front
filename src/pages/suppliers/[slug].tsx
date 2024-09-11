import Layout from '@components/layout/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import ShopsSingleDetailsSmall from '@components/shops/shops-single-details-small';

export default function ShopDetailsPage() {
  return (
    <>
      <ShopsSingleDetailsSmall />
      <div>
        <img src="/image/banner/product4.jpg" alt="" />
      </div>
    </>
  );
}

ShopDetailsPage.Layout = Layout;

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
