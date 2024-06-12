import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout'
import Seo from '@components/seo/seo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Balance from '@components/my-account/Balance';
export default function wallet ({baseData}) {
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
        title="Wallet"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/wallet"
      />
      
        <AccountLayout isSeller={isSeller} >
          <Balance/>
        </AccountLayout>
      
    </>
  )
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
