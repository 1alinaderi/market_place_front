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
      <Seo
        title="دسته بندی"
        path="packing"
      />
      <PageHeroSection heroTitle="Packing" className="faq-banner-area" />
      <Container>
        <div className="flex flex-wrap gap-3 max-w-3xl py-12 mx-auto 2xl:max-w-5xl md:py-20">
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Saffron Packing
            </Heading>
            <img
              src="/image/packing/1 (2).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (3).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (24).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Fig Packing
            </Heading>
            <img
              src="/image/packing/1 (4).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (5).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (6).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (7).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Nuts packing
            </Heading>
            <img
              src="/image/packing/1 (8).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (9).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (10).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Liquids packing
            </Heading>
            <img
              src="/image/packing/1 (11).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (12).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (13).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Watermelon packing
            </Heading>
            <img
              src="/image/packing/1 (14).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (15).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Pistachio packing
            </Heading>
            <img
              src="/image/packing/1 (16).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (17).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (18).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (19).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (32).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (33).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (34).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (35).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (36).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Barbeery packing
            </Heading>
            <img
              src="/image/packing/1 (20).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (21).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (22).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (23).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Olive Oil packing
            </Heading>
            <img
              src="/image/packing/1 (25).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (26).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (27).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Flower packing
            </Heading>
            <img
              src="/image/packing/1 (28).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (29).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (30).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (31).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            <Heading variant="heading" className="w-full py-3">
              Jewelry packing
            </Heading>
            <img
              src="/image/packing/1 (37).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (38).jpg"
              className="md:w-[32%] w-[100%] rounded-2xl"
            />
            <img
              src="/image/packing/1 (39).jpg"
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
