import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Help from '@components/my-account/help';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Iagree from '@components/my-account/Iagree';

export default function learn({ baseData }) {
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
        title="Help Center"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/help-center"
      />
      <AccountLayout isSeller={isSeller} baseData={baseData}>
        <Iagree baseData={baseData} mx />
      </AccountLayout>
    </>
  );
}

learn.Layout = Layout;

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