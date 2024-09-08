import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import { termsAndServices } from '@settings/terms-settings';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import Heading from '@components/ui/heading';
import Seo from '@components/seo/seo';
import Link from 'next/link';

export default function TermsPage() {
  const { t } = useTranslation('terms');
  return (
    <>
      <Seo
        title="شرایط و ظوابط"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="terms"
      />
      <PageHeroSection heroTitle="text-page-terms-condition" />
      <div className="py-12 lg:py-16 2xl:py-20">
        <Container>
          <div className="w-full xl:max-w-[1200px] mx-auto">
            <div className="text-brand-muted text-sm lg:text-15px leading-7 space-y-5 mb-4 lg:mb-6">
               {t("terms-title")}
            </div>
            {termsAndServices?.map((item) => (
              // @ts-ignore
              <div
                key={item.title}
                className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
              >
                <Heading className="mb-4 lg:mb-6 font-body" variant="title">
                  {t(item.title)}
                </Heading>
                <div
                  className="text-brand-muted text-sm lg:text-15px leading-7 space-y-5"
                  dangerouslySetInnerHTML={{
                    __html: t(item.description),
                  }}
                />
              </div>
            ))}
            <div>
              <span className='flex justify-start items-center gap-2 '>
                <p className='font-bold'>{t("email")}:</p>
                <Link href='mailto:wimehr@gmail.com'>
                wimehr@gmail.com
                </Link>
              </span>
              <span className='flex justify-start items-center gap-2 '>
              <p className='font-bold'>{t("phone")}:</p>
                <Link href='tel:0096893548433'>
                0096893548433
                </Link>
              </span>
            </div>
          </div>
        </Container>
      </div>
      <div>
        <img src="/image/banner/product4.jpg" alt="" />
      </div>
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'terms',
        'footer',
      ])),
    },
  };
};
