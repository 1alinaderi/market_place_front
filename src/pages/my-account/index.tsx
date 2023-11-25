import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import AccountDetails from '@components/my-account/account-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AccountDetailsPage({ baseData }) {
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
        title="Account Settings"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/account-settings"
      />
      <AccountLayout isSeller={isSeller} baseData={baseData}>
        <AccountDetails isSeller={isSeller} baseData={baseData} />
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = Layout;

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
