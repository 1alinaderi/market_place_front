import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import ShopsPageContent from '@components/shops/shops-page-content';
import SupplierCard from '@components/product/product-cards/supllaier-card';
import { useRouter } from 'next/router';
import { httpReauest } from 'src/api/api';
import { useState, useEffect } from 'react';
import ProductCard from '@components/product/product-cards/product-card';
import Heading from '@components/ui/heading';

export default function AccountDetailsPage({ baseData }) {
  const [data, setData] = useState(null);

  const router = useRouter();

  async function getSellerData(id: any) {
    const { data } = await httpReauest(
      'GET',
      '/supplier/prouducts/' + id,
      {},
      {}
    );

    setData(data.data);
  }
  useEffect(() => {
    if (!baseData.cookies.seller?.id) {
      router.push(`${window.location.origin}/sign`);
    } else {
      getSellerData(baseData.cookies.seller?.id);
    }
  }, [router.pathname]);

  return (
    <>
      <Seo
        title="Account Settings"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/account-settings"
      />
      <AccountLayout
        isSeller={baseData?.cookies?.seller?.id ? true : false}
        baseData={baseData}
      >
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6`}
        >
          {data?.length == 0 ? (
            <Heading>You Don't Have Product</Heading>
          ) : (
            data?.map((item) => {
              return (
                <ProductCard
                  adminId={baseData?.cookies?.seller?.token}
                  key={item.id}
                  product={item}
                />
              );
            })
          )}
        </div>
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
