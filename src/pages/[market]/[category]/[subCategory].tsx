import Layout from '@components/layout/layout';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ErrorInformation from '@components/404/error-information';
import Seo from '@components/seo/seo';
import { useRouter } from 'next/router';
import { httpReauest } from 'src/api/api';
import PageHeroSection from '@components/ui/page-hero-section';
import Link from 'next/link';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import ProductCard from '@components/product/product-cards/product-card';
import Alert from '@components/ui/alert';

export default function SubCategoryPage(props: any) {
  const { data } = props;
  const [t] = useTranslation('common');
  const router = useRouter();
  const { market, category, subCategory } = router.query;
  return (
    <>
      <Seo
        title={`${
          router.locale == 'en'
            ? data?.category.name_en
            : router.locale == 'ar'
            ? data?.category.name_ar
            : data?.category.name
        } | ${
          router.locale == 'en'
            ? data?.subCategorys.name_en
            : router.locale == 'ar'
            ? data?.subCategorys.name_ar
            : data?.subCategorys.name
        }`}
        path={`/${market}/${category}/${subCategory}`}
      />
      <div className='hidden lg:block'>
      <PageHeroSection
        heroTitle={
          router.locale == 'en'
            ? data?.subCategorys.name_en
            : router.locale == 'ar'
            ? data?.subCategorys.name_ar
            : data?.subCategorys.name
        }
      />
      </div>
      <div className="p-4 text-center text-[18px] text-black font-bold relative">
        {t('products')} {router.locale == 'en'
            ? data?.subCategorys.name_en
            : router.locale == 'ar'
            ? data?.subCategorys.name_ar
            : data?.subCategorys.name}
        {router.locale == 'en' ? (
          <FaAngleLeft
            size={25}
            onClick={() => router.back()}
            className="absolute top-1/2 left-4 -translate-y-1/2"
          />
        ) : (
          <FaAngleRight
            size={25}
            onClick={() => router.back()}
            className="absolute top-1/2 right-4 -translate-y-1/2"
          />
        )}
      </div>
      <div className="px-3">
        <div className="max-w-[1240px]  mx-auto mt-5">
          <h5 className="text-black mb-4 text-[18px] hidden lg:block">{t('products')}</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:flex lg:gap-4 flex-wrap">
            {data?.products?.length ? (
              data?.products?.map((item: any) => <ProductCard product={item} />)
            ) : (
              <Alert className='col-span-full' message={t('text-no-found')} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

SubCategoryPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const category = params?.category;
  const market = params?.market;
  const subCategory = params?.subCategory;

  const data = await httpReauest(
    'GET',
    `/categorys/${market}/${category}/${subCategory}`,
    {},
    {}
  );
  if (data.status == 200) {
    return {
      props: {
        data: data.data.data,
        ...(await serverSideTranslations(locale!, [
          'common',
          'forms',
          'menu',
          'footer',
        ])),
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
