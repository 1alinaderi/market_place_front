import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account-admin/account-layout';
import AccountDetailsAdmin from '@components/my-account-admin/account-details';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { httpReauest } from 'src/api/api';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';
import { GrResume } from 'react-icons/gr';
import { FiFile, FiFileText } from 'react-icons/fi';
import Button from '@components/ui/button';
import { toast } from 'react-toastify';

export default function AccountDetailsPage({ baseData }) {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!baseData.cookies?.admin?.id) {
      router.push(`${window.location.origin}`);
    } else {
      getuserData(baseData.cookies?.admin?.id);
    }
  }, [router.pathname]);

  async function getuserData(id: any) {
    const { data, status } = await httpReauest(
      'GET',
      '/admin/verifypay',
      {},
      {}
    );

    if (status !== 200) {
      router.push(`${window.location.origin}`);
    }

    // const data2 = await httpReauest('GET', '/order/' + id, {}, {});

    // setorders(data2.data.data);
    setData(data.data);
  }

  async function handleVerify(id: any) {
    await httpReauest(
      'POST',
      '/admin/verifypay',
      { sellerId: id },
      {
        'x-auth-token': baseData?.cookies?.admin?.token,
      }
    )
      .then((e) => {
        toast.success(e.data.message);
        router.reload();
      })
      .catch((e) => {
        toast.error(e.message);
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
        {/* <AccountDetailsAdmin baseData={baseData} /> */}
        <div className="grid grid-cols-12 gap-4">
          {data?.map((user) => {
            return (
              <div className="w-full md:col-span-6 col-span-12 flex-col  p-3 border-2 rounded flex justify-center ">
                <span className="flex gap-4 flex-wrap ">
                  <img
                    src={CDN_BASE_URL + user.logo}
                    className="w-[80px] h-[80px] my-1"
                  />
                  <span className="flex flex-col">
                    <span className="py-1 font-bold text-2xl">{user.name}</span>
                    <span className="py-1 text-sm">{user.email}</span>
                  </span>
                </span>
                {user?.refrealCode && (
                  <p className="bg-green-500 text-white p-2 mt-2 rounded">
                    Have Refreal Code price is $400
                  </p>
                )}
                <a
                  href={CDN_BASE_URL + user?.payMembershipDoc}
                  target="_blank"
                  className="my-3"
                >
                  <img
                    className="w-full p-2"
                    src={CDN_BASE_URL + user?.payMembershipDoc}
                  />
                </a>

                <Button
                  onClick={() => handleVerify(user._id)}
                  variant="primary"
                >
                  Submit
                </Button>
              </div>
            );
          })}
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
