import Layout from '@components/layout/layout';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import LandingDesktop from '@components/layout/landing';
import LandingMobile from '@components/layout/mobile/landing-mobile';

export default function LandingPage() {
  const { t } = useTranslation('common');
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  }, []);

  return (
    <>
      <Seo title="هاب تجاری آینده" path="" />
      {mobile ? <LandingMobile /> : <LandingDesktop />}
    </>
  );
}

LandingPage.Layout = Layout;

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
