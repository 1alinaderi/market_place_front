import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Seo from '@components/seo/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Balance from '@components/my-account/Balance';
import { httpReauest } from 'src/api/api';
export default function wallet({ baseData }) {
  const [isSeller, setIsSeller] = useState(false);
  const router = useRouter();
  const [data, setData] = useState([]);
  async function getuserData(id: any) {
    const { data } = await httpReauest('GET', '/supplier/' + id, {}, {});
    setData(data.data);
    console.log(data);
  }
  useEffect(() => {
    getuserData(baseData.cookies.seller?.id);
  }, []);
  useEffect(() => {
    if (baseData.cookies.user?.id) {
      setIsSeller(false);
    }
    if (baseData.cookies.seller?.id) {
      setIsSeller(true);
    }
  }, [router.pathname]);
  useEffect(() => {
    if (router.locale == 'fa') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [router.locale]);
  return (
    <>
      <Seo
        title="کیف پول"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="my-account/wallet"
      />

      <AccountLayout isSeller={isSeller}>
        <Balance data={data} />
      </AccountLayout>
    </>
  );
}

wallet.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
