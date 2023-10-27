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
import { FaPlus } from 'react-icons/fa';
import Button from '@components/ui/button';

export default function AccountDetailsPage({ baseData }) {
  const [data, setData] = useState([]);
  const [image, setimage] = useState(null);
  const [preview, setpreview] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (image) {
      if (image.size > 1031517) {
        toast.error('The file size is more than 1mb');
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

  async function handleApprove(id: any) {
    await httpReauest(
      'POST',
      '/user/VIP',
      { userId: baseData.cookies.user.id },
      { 'x-access-token': baseData.cookies.user.token }
    )
      .then((dataaaa) => {
        toast.success(dataaaa.data.message);
      })
      .catch((error) => {
        toast.success(error.message);
      });
  }
  return (
    <>
      <Seo
        title="Account Settings"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/account-settings"
      />
      <AccountLayout baseData={baseData}>
        {data?.completeProfile ? (
          <>
            <Heading variant="title" className="pb-8">
              You can get all these things by buying membership
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
            <Heading
              variant="title"
              className="pt-8 flex justify-between flex-wrap items-center gap-4"
            >
              <span>Membership Price : $800</span>
              <span>
                Refreal code :{' '}
                <input
                  type={'text'}
                  className="rounded-md border-slate-400 w-[170px] h-[32px]"
                />
              </span>
            </Heading>
            <p className="mt-4">
              Send 111,111,111 IRR To This card And Upload photo: <br />
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
            <Button variant="formButton">Submit</Button>
          </>
        ) : (
          <Heading variant="title" className="pb-8">
            You must first complete your profile
          </Heading>
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
