import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';

import Heading from '@components/ui/heading';
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '@components/ui/button';
import { httpReauest } from 'src/api/api';
import { toast } from 'react-toastify';
import { getCategories } from '@utils/get-categories';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useAllSupplierQuery } from '@framework/product/get-all-supplier';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Formik } from 'formik';
import CreateProductForm from '@components/forms/create-product';
import CreateProductFreeForm from '@components/forms/create-product-free';

export default function AccountDetailsPage({ baseData }) {
  const [data, setData] = useState(null);
  const [productType, setproductType] = useState();
  const router = useRouter();

  async function getSellerData(id: any) {
    const { data } = await httpReauest('GET', '/supplier/' + id, {}, {});

    setData(data.data);
  }

  useEffect(() => {
    if (!baseData.cookies.seller?.id) {
      router.push(`${window.location.origin}/sign`);
    } else {
      getSellerData(baseData.cookies.seller?.id);
    }
  }, [router.pathname]);

  console.log(data?.membership == 'Premium');

  const { t } = useTranslation('common');

  return (
    <>
      <Seo title="ایجاد محصول" path="my-account/create-product" />
      <AccountLayout
        isSeller={baseData?.cookies?.seller?.id ? true : false}
        baseData={baseData}
      >
        {data?.completeProfile ? (
          <>
            {data?.membership == 'Premium' ? (
              <>
                {!productType ? (
                  <>
                    <h5 className="w-full mb-2">Product type?</h5>
                    <select onChange={(e) => setproductType(e.target.value)}>
                      <option></option>
                      <option value={1}>{t('free-market')}</option>
                      <option value={2}>
                        {t('sustainable')} {t('arch-and-art')}
                      </option>
                    </select>
                  </>
                ) : productType == 1 ? (
                  <>
                    <CreateProductFreeForm baseData={baseData} />
                  </>
                ) : productType == 2 ? (
                  <>
                    <CreateProductForm baseData={baseData} />
                  </>
                ) : null}
              </>
            ) : (
              <CreateProductFreeForm baseData={baseData} />
            )}
          </>
        ) : (
          <Link href={'/my-account'}>{t('t-must-complete-profile')}</Link>
        )}
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
