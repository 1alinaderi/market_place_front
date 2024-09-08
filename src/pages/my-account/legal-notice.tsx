import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Legal from '@components/my-account/notice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LegalNotice({ baseData }) {
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
        title="توجه قانونی"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="legal-notice"
      />
      <AccountLayout isSeller={isSeller} baseData={baseData}>
        <Legal />
      </AccountLayout>
    </>
  );
}

LegalNotice.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'legal',
        'footer',
      ])),
    },
  };
};
