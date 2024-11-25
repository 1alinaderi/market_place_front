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
import { useTranslation } from 'next-i18next';
import Modal from '@components/common/modal/modal';
import Container from '@components/ui/container';
import { FaTimes } from 'react-icons/fa';
import ProductCardSelect from '@components/product/product-cards/product-card-select';
import { toast } from 'react-toastify';
import Loading from '@components/common/Loading';

export default function AccountDetailsPage({ baseData }) {
  const [data, setData] = useState(null);
  const [suggested, setsuggested] = useState([]);
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const { t } = useTranslation('common');

  async function getSellerData(id: any) {
    setloading(true);
    const { data } = await httpReauest(
      'GET',
      '/supplier/prouducts/' + id,
      {},
      {}
    );
    setData(data.data);
    const res = await httpReauest('GET', '/supplier/suggest/' + id, {}, {});
    setsuggested(res.data.data);
    setloading(false);
  }

  useEffect(() => {
    if (!baseData.cookies.seller?.id) {
      router.push(`${window.location.origin}/sign`);
    } else {
      getSellerData(baseData.cookies.seller?.id);
    }
  }, [router.pathname]);

  function handleAdd(product) {
    const isExist = suggested.find((item) => item._id == product._id);
    if (isExist) {
      return toast.error('این محصول قبلا اضافه شده');
    }
    setsuggested((cur) => [...cur, product]);
  }

  function handleDelete(product) {
    const isExist = suggested.filter((item) => item._id !== product._id);

    setsuggested(isExist);
  }

  async function handleSubmit() {
    if (suggested.length) {
      const offerProducts = [];
      suggested.map((item) => offerProducts.push(item?._id));

      await httpReauest(
        'POST',
        '/supplier/suggest',
        { offerProducts: offerProducts },
        { 'x-access-token': baseData?.cookies?.seller?.token }
      )
        .then((res) => {
          if (res.status === 201) {
            toast.success('موفقیت آمیز');
          }
        })
        .catch((err) => toast.error(err?.response?.data?.message));
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Seo
        title="تمام محصولات"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="my-account/all-product"
      />
      <Modal open={show} onClose={() => setshow(false)}>
        <div className="bg-slate-100 p-3 w-full rounded shadow lg:min-w-[70vw]">
          <FaTimes onClick={() => setshow(false)} />
          <div className="mt-2">
            <Heading>
              برای اضافه کردن محصول روی آن کلیک کنید (برای ثبت شدن حتما روی دکمه
              تایید کلیک کنید)
            </Heading>
            <div className="border rounded mt-2 p-3 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 md:gap-3 lg:gap-3 xl:gap-4">
              <Heading className="col-span-full" variant="title">
                محصولات انتخاب شده:
              </Heading>
              {suggested?.length == 0 ? (
                <Heading className="text-center">{t('t-dont-product')}</Heading>
              ) : (
                suggested?.map((item) => {
                  return (
                    <ProductCardSelect
                      key={item.id}
                      product={item}
                      handleAdd={handleAdd}
                      handleDelete={handleDelete}
                    />
                  );
                })
              )}
              <div className="col-span-full">
                <button
                  onClick={handleSubmit}
                  className=" bg-red-500 px-3 py-1 text-white text-[18px] font-bold rounded"
                >
                  تایید
                </button>
              </div>
            </div>
            <div
              className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 md:gap-3 lg:gap-3 xl:gap-4 pt-4`}
            >
              <Heading className="col-span-full" variant="title">
               {t("account-see-product")}
              </Heading>
              {data?.length == 0 ? (
                <Heading>{t('t-dont-product')}</Heading>
              ) : (
                data?.map((item) => {
                  return (
                    <ProductCardSelect
                      key={item.id}
                      product={item}
                      handleAdd={handleAdd}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </Modal>
      <AccountLayout
        isSeller={baseData?.cookies?.seller?.id ? true : false}
        baseData={baseData}
      >
        <div className="border-b pb-4">
          <Heading className="mb-2 flex justify-between" variant="titleMedium">
            {t('text-suggest-supplier')}
            <button
              onClick={() => setshow(true)}
              className="bg-green-500 px-3 py-1 text-white text-[14px] rounded"
            >
              اضافه کردن
            </button>
          </Heading>
          <div
            className={`grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3 xl:gap-4 pt-4`}
          >
            {suggested?.length == 0 ? (
              <Heading className="text-center">{t('t-dont-product')}</Heading>
            ) : (
              suggested?.map((item) => {
                return <ProductCard key={item.id} product={item} />;
              })
            )}
          </div>
        </div>
        <div
          className={`grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3 xl:gap-4 pt-4`}
        >
          <Heading className="mb-2 col-span-full" variant="titleMedium">
            {t('all-products')}
          </Heading>
          {data?.length == 0 ? (
            <Heading>{t('t-dont-product')}</Heading>
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
