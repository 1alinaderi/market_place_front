import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout'
import Seo from '@components/seo/seo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Balance from '@components/my-account/Balance';
import { httpReauest } from 'src/api/api';
import { useTranslation } from 'next-i18next';
export default function setting ({baseData}) {
    const [isSeller, setIsSeller] = useState(false);
    const router = useRouter();
    const { t } = useTranslation('common');
    const [data,setData] = useState([])
    const [newPassword,setNewPassword] = useState("")
    async function getuserData(id: any) {
      const { data } = await httpReauest('GET', '/supplier/' + id, {}, {});
      setData(data.data);
      console.log(data)
    }
    useEffect(() => {
      getuserData(baseData.cookies.seller?.id);
      
    }, []);
    useEffect(() => {
      if (baseData.cookies.user?.id) {
        setIsSeller(false);
      }
      if (baseData.cookies.seller?.id) {
        setIsSeller(true);
      }
    }, [router.pathname]);
    useEffect(() => {
      if (router.locale == 'fa') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }, [router.locale]);
  return (
    <>
      <Seo
        title="setting"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="my-account/setting"
      />
      
        <AccountLayout isSeller={isSeller} >
        <div>
        <h2 className="text-xl font-bold">{t('t-setting')}</h2>
        <div className="flex flex-col lg:flex-row items-center my-10 mx-5">
            <span className="font-bold mb-5 lg:mb-0">{t("change-password")} :</span>
            <div className="flex items-center gap-3">
              <input
                className="lg:ml-5 shadow h-[42px] appearance-none border border-slate-300 rounded  py-2 px-3 text-gray-700  leading-tight rounded-r-none w-[200px] lg:w-[250px]"
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                
                
              />
             <button className='bg-red-500 text-white rounded-md px-6 py-2'>Submit</button>
            </div>
          </div>
        </div>
        </AccountLayout>
      
    </>
  )
}

setting.Layout = Layout;

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