import React, { useEffect, useState } from 'react';
import Layout from '@components/layout/layout';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Heading from '@components/ui/heading';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';

const DonatePage = () => {
  const [t] = useTranslation('common');

  const url = 'https://api.cryptocloud.plus/v2/invoice/create';
  const headers = new Headers({
    Authorization:
      'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTWpNek9UTT0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiJjMjk0OTYzZmIxNGJjOTIzMjEyZWViN2YxM2VlMDY2Y2IwNDZjMTVmYThhYzllNDc4ZTgyMzc1ZGI5ZjI3NGFmIiwiZXhwIjo4ODEyMDY4MzM5Mn0.oUrG2q4Ta7eIPaNCb-nCOVaXxE1BjAcsC9x-u-A7uP0',
    'Content-Type': 'application/json',
  });

  const router = useRouter();
  const bodyfirst = {
    shop_id: '2Gt7Ur32pAyo7bgQ',
    amount: 10,
  };

  const [previewPay, setpreviewPay] = useState(null);
  const [imagePay, setimagePay] = useState(null);

  function setPreviwImagePay() {
    const reader = new FileReader();
    reader.onloadend = function () {
      setpreviewPay(reader.result);
    };
    reader.readAsDataURL(imagePay);
  }

  useEffect(() => {
    if (imagePay) {
      if (imagePay.size > 1031517) {
        toast.error('The file size is more than 1mb');
        setimagePay(null);
      } else {
        setPreviwImagePay();
      }
    }
  }, [imagePay]);

  function getAuth() {
    fetch(url, { method: 'POST', headers, body: JSON.stringify(bodyfirst) })
      .then(async (response) => {
        if (response.ok) {
          const res = await response.json();
          if (res.status == 'success') {
            router.push(res.result.link);
          }
        } else {
          return Promise.reject('Auth error');
        }
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Fail:', error);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData();
    if (imagePay) {
      formdata.append('file', imagePay, imagePay.name);
      const res = await fetch(CDN_BASE_URL + '/news/upload', {
        method: 'POST',
        body: formdata,
      }).then(() => {
        toast.success('موفقیت آمیز');
      });
    } else {
      toast.error('عکسی آپلود نشده');
    }
  }

  return (
    <>
      <Seo title="اهدا" path="donate" />
      <div className="bg-slate-100 py-8">
        <div className="lg:mx-[100px] lg:px-20 gap-3 lg:gap-5 mx-4 px-3 border border-slate-200 bg-white rounded-lg grid lg:grid-cols-2 shadow pb-5 ">
          <h2 className="col-span-full text-center mt-8 font-bold text-xl text-black">
            {' '}
            {t('type-pay')}
          </h2>{' '}
          <div className="mt-[25px]">
            <p className="text-black font-bold">{t('crypto-pay')}:</p>
            <div className="flex justify-center items-center mt-2 h-[20vh] lg:h-[55%] border rounded ">
              <button
                className="bg-blue-500 rounded-2xl px-4 py-2 text-white "
                onClick={getAuth}
                type="button"
              >
                {t('crypto-pay')}
              </button>
            </div>
          </div>
          <form>
            {' '}
            <span className="  px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                {t('pay-membership')} *:
              </Heading>
              <label className="cursor-pointer relative" htmlFor="payment">
                {previewPay ? (
                  <img
                    src={previewPay ? previewPay : null}
                    className="w-full h-[160px] rounded object-contain"
                  />
                ) : (
                  <div className="w-full h-[160px] rounded relative border ">
                    <FaPlus size={25} className="inset-0 absolute m-auto" />
                  </div>
                )}
              </label>
              <input
                dir="ltr"
                value={'5022-2910-1917-7474'}
                disabled
                className="shadow border rounded p-2 mt-3 w-full"
              />
              <span>مهیار بابازاده</span>
              <input
                onChange={(e) => {
                  setimagePay(e.target.files[0]);
                }}
                id="payment"
                name="payment"
                className="hidden"
                type={'file'}
                accept="image/png, image/jpg, image/jpeg"
              />
            </span>
            <div className="col-span-full flex justify-center items-center">
              <button
                onClick={handleSubmit}
                className="bg-red-500 rounded-2xl px-5 py-2 text-white mb-7 mt-2"
              >
                {t('t-submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

DonatePage.Layout = Layout;

export default DonatePage;
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
