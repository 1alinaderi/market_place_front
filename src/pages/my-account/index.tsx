import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import AccountDetails from '@components/my-account/account-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Iagree from '@components/my-account/Iagree';

export default function AccountDetailsPage({ baseData }) {
  const [isSeller, setIsSeller] = useState(false);
  const router = useRouter();
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const hasAcceptedContract = localStorage.getItem('hasAcceptedContract');
    if (baseData.cookies.user?.id) {
      setIsSeller(false);
      setAgree(true);
    }
    if (baseData.cookies.seller?.id) {
      setIsSeller(true);
      if (hasAcceptedContract) {
        setAgree(true);
      } else {
        setAgree(false);
      }
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
      {agree ? (
        <AccountLayout isSeller={isSeller} baseData={baseData}>
          <AccountDetails isSeller={isSeller} baseData={baseData} />
        </AccountLayout>
      ) : (
        <Iagree baseData={baseData} setAgree={setAgree} />
      )}
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
