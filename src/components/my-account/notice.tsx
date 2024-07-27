import Layout from '@components/layout/layout';
import { legalSetting } from '@settings/legal-setting';
import Heading from '@components/ui/heading';
import { Element } from 'react-scroll';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}

export default function LegalPage() {
  const { t } = useTranslation('legal');
  return (
    <>
      <div className="lg:max-h-[575px] lg:overflow-scroll scrollbar">
        <Heading variant="titleLarge">
          {t('common:text-account-details-notice')}
        </Heading>
        <table  className="flex flex-col mt-5 lg:text-sm text-xs w-full">
          <tr>
            <th>{t('th-1')}</th>
            <td>{t('td-1')}</td>
          </tr>
          <tr>
            <th>{t('th-2')}</th>
            <td>{t('td-2')}</td>
          </tr>
          <tr>
            <th>{t('th-3')}</th>
            <td>{t('td-3')}</td>
          </tr>
          <tr>
            <th>{t('th-4')}</th>
            <td>{t('td-4')}</td>
          </tr>
          <tr>
            <th>{t('th-5')}</th>
            <td>{t('td-5')}</td>
          </tr>
        </table>
        <div className="pt-6">
          <div className="w-full">
            {legalSetting?.map((item) => (
              // @ts-ignore
              <Element
                key={item.title}
                id={makeTitleToDOMId(item.title)}
                className="mb-5 lg:mb-10"
              >
                <h2 className="text-base  md:text-[17px] 2xl:text-lg text-brand-dark font-medium mb-4">
                  {t(`${item.title}`)}
                </h2>
                <div
                  className="text-brand-dark opacity-70 text-sm leading-7 lg:text-14px lg:leading-loose"
                  dangerouslySetInnerHTML={{
                    __html: t(`${item.description}`),
                  }}
                />
              </Element>
            ))}
            <div className="mb-5 lg:mb-10">
              <h2 className="text-base  md:text-[17px] 2xl:text-lg text-brand-dark font-medium mb-4">
                {t('legal-six-title')}
              </h2>
              <div className="text-brand-dark  text-sm leading-7 lg:text-14px lg:leading-loose">
                <p className='opacity-70'>{t('legal-six-content')}</p>
                <a className='underline' >
                  <Link href={'/privacy'}>{t('privacy')}</Link>
                </a>
              </div>
            </div>
            <div className="mb-5 lg:mb-10">
              <h2 className="text-base  md:text-[17px] 2xl:text-lg text-brand-dark font-medium mb-4">
                {t('legal-seven-title')}
              </h2>
              <div className="text-brand-dark opacity-70 text-sm leading-7 lg:text-14px lg:leading-loose">
                <p>{t('legal-seven-content')}</p>
                <table>
                  <tr>
                    <th>{t('email')}:</th>
                    <td>
                      <Link href={'mailto:WIMEHR@GMAIL.COM'}>WIMEHR@GMAIL.COM</Link>
                    </td>
                  </tr>
                  <tr>
                    <th>{t('phone')}:</th>
                    <td>
                      <Link href={'tel:0096893548433'}>0096893548433</Link>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          {/* End of content */}
        </div>
      </div>
    </>
  );
}

LegalPage.Layout = Layout;
