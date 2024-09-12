import React, { useState } from 'react';
import Layout from '@components/layout/layout';
import PageHeroSection from '@components/ui/page-hero-section';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import SectionHeader from '@components/common/section-header';
import Heading from '@components/ui/heading';

export default function GuidePage() {
  return (
    <>
      <Seo
        title="راهنما"
        path="guide"
      />
      <PageHeroSection heroTitle="راهنما" className="faq-banner-area" />
      <Container>
        <div className="flex flex-wrap gap-3 max-w-3xl py-12 mx-auto 2xl:max-w-5xl md:py-20">
          <div className="flex flex-wrap justify-start gap-4 w-full">
            <Heading variant="heading" className="w-full py-3">
             نحوه ثبت نام در بازار آزاد   
            </Heading>
            <video  src="/free-market-how-sign.mp4" className='w-full lg:w-2/3 mx-auto rounded' controls/>
          </div>
          <div className="flex flex-wrap justify-start gap-4 w-full">
            <Heading variant="heading" className="w-full py-3">
          نحوه دریافت ممبرشیپ  
            </Heading>
            <video  src="/membership-how-sign.mp4" className='w-full lg:w-2/3 mx-auto rounded' controls/>
          </div>
       </div>
      </Container>
    </>
  );
}

GuidePage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'faq',
        'footer',
      ])),
    },
  };
};
