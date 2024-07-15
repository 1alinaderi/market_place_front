import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import AccountDetails from '@components/my-account/account-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { httpReauest } from 'src/api/api';
import Heading from '@components/ui/heading';
import PaypalCheckouButton from '@components/paypal/paypalButton';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { FaCheck, FaCheckCircle, FaPlus } from 'react-icons/fa';
import Button from '@components/ui/button';
import { RiLoader3Line } from 'react-icons/ri';
import { GrFormClock } from 'react-icons/gr';
import { useTranslation } from 'next-i18next';

export default function AccountDetailsPage({ baseData }) {
  const [data, setData] = useState([]);
  const [image, setimage] = useState(null);
  const [preview, setpreview] = useState(null);
  const [refralcode, setrefralcode] = useState(null);
  const [discount, setdiscount] = useState(null);

  const router = useRouter();

  const { t } = useTranslation('common');

  useEffect(() => {
    if (image) {
      if (image.size > 1031517) {
        toast.error(t('t-size-more-1mb'));
        setimage(null);
      } else {
        setPreviwImage();
      }
    }
  }, [image]);

  function setPreviwImage() {
    const reader = new FileReader();
    reader.onloadend = function () {
      setpreview(reader.result);
    };
    reader.readAsDataURL(image);
  }

  useEffect(() => {
    if (!baseData.cookies.user?.id && !baseData.cookies.seller?.id) {
      router.push(`${window.location.origin}/sign`);
    } else {
      if (baseData.cookies.user?.id) {
        getuserData(baseData.cookies.user?.id);
      }
      if (baseData.cookies.seller?.id) {
        getSellerData(baseData.cookies.seller?.id);
      }
    }
  }, [router.pathname]);

  async function getuserData(id: any) {
    const { data } = await httpReauest('GET', '/user/' + id, {}, {});
    setData(data.data);
  }

  async function getSellerData(id: any) {
    const { data } = await httpReauest('GET', '/supplier/' + id, {}, {});

    setData(data.data);
  }

  async function checkCode() {
    await httpReauest(
      'POST',
      '/supplier/refreal',
      { code: refralcode },
      {
        'x-access-token': baseData.cookies.seller.token,
      }
    )
      .then(() => {
        toast.success(t('t-price-update'));
        setdiscount(true);
      })
      .catch(() => {
        toast.error(t('t-refreal-code-wrong'));
      });
  }

  async function handleApprove(id: any) {
    const formdata = new FormData();
    if (image) {
      formdata.append('payMembershipDoc', image);
      await httpReauest('POST', '/supplier/membership', formdata, {
        'x-access-token': baseData.cookies.seller.token,
      })
        .then((dataaaa) => {
          toast.success(dataaaa.data.message);
          router.reload();
        })
        .catch((error) => {
          toast.success(error.message);
        });
    } else {
      toast.success(t('t-upload-photo'));
    }
  }

  const [isSeller, setIsSeller] = useState(false);
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
        title="Account Settings"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="my-account/account-settings"
      />
      <AccountLayout isSeller={isSeller} baseData={baseData}>
        <>
          <Heading variant="title" className="pb-8">
            {t('t-get-all-things')}
          </Heading>
          <ul className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-3 gap-3 list-disc">
            <li>Soem Test TExt </li>
            <li>Soem Test TExt </li>
            <li>Soem Test TExt </li>
            <li>Soem Test TExt </li>
            <li>Soem Test TExt </li>
            <li>Soem Test TExt </li>
            <li>Soem Test TExt </li>
            <li>Soem Test TExt </li>
            <li>Soem Test TExt </li>
          </ul>
          {data?.membership === 'Premium' ? (
            <>
              <Heading variant="titleLarge" className="pt-8 flex items-center">
                <FaCheckCircle className="text-green-600 mx-2 text-3xl" />
                {t('text-congratulations-membership')}
              </Heading>
            </>
          ) : data?.checkPay ? (
            <>
              <Heading variant="title" className="pt-8 flex items-center">
                <GrFormClock className="text-green-600 mx-2 text-4xl" />
                {t('t-check-uploaded-photo')}
              </Heading>
            </>
          ) : (
            <>
              <Heading
                variant="title"
                className="pt-8 flex justify-between flex-wrap items-center gap-4"
              >
                <span>
                  {t('t-membership-price')} : {discount ? '$400' : '$800'}
                </span>
                <span>
                  {t('t-refreal-code')} :{' '}
                  <input
                    onChange={(e) => {
                      setrefralcode(e.target.value);
                    }}
                    type={'text'}
                    className="rounded-md border-slate-400 w-[170px] h-[32px]"
                  />
                  {refralcode && (
                    <button
                      onClick={checkCode}
                      className="bg-red-500 text-[12px] px-2 mb-1 ml-1 rounded text-white"
                    >
                      {t('t-check')}
                    </button>
                  )}
                </span>
              </Heading>
              <p className="mt-4">
                {t('t-send-money-and-upload')}: <br />
                <span>IR-1111111122222222222444444</span>{' '}
              </p>
              <div className=" sm:w-1/2 my-7">
                <label className="cursor-pointer relative" htmlFor="addImage">
                  {preview ? (
                    <img
                      src={preview ? preview : null}
                      className="w-full h-[160px] rounded object-contain"
                    />
                  ) : (
                    <div className="w-full h-[160px] rounded relative border">
                      <FaPlus size={25} className="inset-0 absolute m-auto" />
                    </div>
                  )}
                </label>
                <input
                  onChange={(e) => {
                    setimage(e.target.files[0]);
                  }}
                  id="addImage"
                  className="hidden"
                  type={'file'}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
              <Button onClick={handleApprove} variant="formButton">
                {t('t-submit')}
              </Button>
            </>
          )}
        </>
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
