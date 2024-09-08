import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Help from '@components/my-account/help';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HelpCenter({ baseData }) {
  const [isSeller, setIsSeller] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (baseData.cookies.user?.id) {
      setIsSeller(false);
    }
    if (baseData.cookies.seller?.id) {
      setIsSeller(true);
    }
  }, [router.pathname]);
  return (
    <>
      <Seo
        title="مرکز کمک"
        path="my-account/help-center"
      />
      <AccountLayout isSeller={isSeller} baseData={baseData}>
        <Help />
      </AccountLayout>
    </>
  );
}

HelpCenter.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'help',
        'footer',
      ])),
    },
  };
};
