import React, { useState } from 'react';
import Layout from '@components/layout/layout';
import PageHeroSection from '@components/ui/page-hero-section';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import SectionHeader from '@components/common/section-header';
import Heading from '@components/ui/heading';

export default function Packing() {
  return (
    <>
      <Seo title="دسته بندی" path="packing" />
      <PageHeroSection heroTitle="Packing" className="faq-banner-area" />
      <Container>
        <div className="flex flex-wrap gap-3 max-w-3xl py-12 mx-auto 2xl:max-w-5xl md:py-20">
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Saffron Packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (2)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (3)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (24)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Fig Packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (4)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (5)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (6)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (7)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Nuts packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (8)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (9)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (10)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Liquids packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (11)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (12)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (13)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Watermelon packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (14)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (15)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Pistachio packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (16)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (17)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (18)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (19)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (32)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (33)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (34)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (35)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (36)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Barbeery packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (20)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (21)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (22)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (23)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Olive Oil packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (25)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (26)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (27)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Flower packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (28)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (29)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (30)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (31)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Jewelry packing
            </Heading>
            <img
              src="https://server.wimehr.com/uploads/1 (37)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (38)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="https://server.wimehr.com/uploads/1 (39)-min.jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
        </div>
      </Container>
    </>
  );
}

Packing.Layout = Layout;

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
