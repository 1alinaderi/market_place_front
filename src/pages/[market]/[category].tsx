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

export default function CategoryPage(props: any) {
  const { data } = props;
  const [t] = useTranslation('common');
  const router = useRouter();
  const { market, category } = router.query;
  return (
    <>
      <Seo
        title={
          router.locale == 'en'
            ? data?.category.name_en
            : router.locale == 'ar'
            ? data?.category.name_ar
            : data?.category.name
        }
        path={`/${market}/${category}`}
      />
      <PageHeroSection
        heroTitle={
          router.locale == 'en'
            ? data?.category.name_en
            : router.locale == 'ar'
            ? data?.category.name_ar
            : data?.category.name
        }
      />
      <div className="px-3">
        <div className="max-w-[1240px] -top-[70px] mx-auto bg-white relative p-5 rounded-[12px] shadow ">
          <h5 className="text-black mb-4">
            {t('t-category-in')}{' '}
            {router.locale == 'en'
              ? data?.category.name_en
              : router.locale == 'ar'
              ? data?.category.name_ar
              : data?.category.name}
          </h5>
          <div className="flex gap-3 items-start flex-wrap">
            {data?.subCategorys?.map((item: any) => (
              <Link href={`/${market}/${category}/${item.url}`}>
                <span className="bg-slate-100 px-4 py-3 shadow rounded-md flex items-center gap-1 cursor-pointer hover:text-red-500">
                  {router.locale == 'en'
                    ? item.name_en
                    : router.locale == 'ar'
                    ? item.name_ar
                    : item.name}
                  {router.locale == 'en' ? <FaAngleRight /> : <FaAngleLeft />}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="max-w-[1240px]  mx-auto">
          <h5 className="text-black mb-4 text-[18px]">{t('products')}</h5>
          <div className="flex gap-4 flex-wrap">
            {data?.products?.length ? (
              data?.products?.map((item: any) => <ProductCard product={item} />)
            ) : (
              <Alert message={t('text-no-found')} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

CategoryPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const category = params?.category;
  const market = params?.market;

  const data = await httpReauest(
    'GET',
    `/categorys/${market}/${category}`,
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
