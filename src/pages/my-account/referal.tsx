import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Help from '@components/my-account/help';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import { useTranslation } from 'next-i18next';
import { httpReauest } from 'src/api/api';
export default function referal({ baseData }) {
  const [isSeller, setIsSeller] = useState(false);
  
  const [copy, setCopy] = useState(false);
  const [data , setData] = useState([])
  const router = useRouter();
  const { t } = useTranslation('common');
  async function getuserData(id: any) {
    const { data } = await httpReauest('GET', '/supplier/' + id, {}, {});
    setData(data.data);
    console.log(data)
  }
  useEffect(() => {
    getuserData(baseData.cookies.seller?.id);
    
  }, []);
  const inputText = data?.refCode
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
  const handleCopyText = () => {
    navigator.clipboard.writeText(inputText);
    setCopy(true);
  };
  return (
    <>
      <Seo
        title="Help Center"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/referal"
      />
      <AccountLayout isSeller={isSeller} baseData={baseData}>
        <div>
          <h2 className="text-xl font-bold">{t('t-referal')}</h2>
          <p className="mx-5 mt-5">{t('p-referal')}</p>
          <div className="flex flex-col lg:flex-row items-center my-10 mx-5">
            <span className="font-bold mb-5 lg:mb-0">{t('l-referal')} :</span>
            <div className="flex items-center">
              <input
                className="lg:ml-5 shadow h-[42px] appearance-none border border-slate-300 rounded  py-2 px-3 text-gray-700  leading-tight rounded-r-none w-[200px] lg:w-[250px]"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onClick={handleCopyText}
                disabled
              />
              <div
                onClick={handleCopyText}
                className="text-xl border-r border-t border-b rounded  p-[10px] border-slate-300 rounded-l-none shadow"
              >
                {copy ? <LuCopyCheck /> : <LuCopy />}
              </div>
            </div>
          </div>
        </div>
      </AccountLayout>
    </>
  );
}

referal.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'help',
        'footer',
      ])),
    },
  };
};
