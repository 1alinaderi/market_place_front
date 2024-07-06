import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import { aboutSetting } from '@settings/about-setting';
import Image from '@components/ui/image';
import Seo from '@components/seo/seo';
import Heading from '@components/ui/heading';

const backgroundThumbnail = '/assets/images/about-us.png';

export default function Membership() {
  const { t } = useTranslation('about');
  return (
    <>
      <Seo
        title="Membership"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="membership"
      />
     
    </>
  );
}

Membership.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'about',
        'footer',
      ])),
    },
  };
};