import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';
import { httpReauest } from 'src/api/api';
import { useEffect } from 'react';

export const siteSettings = {
  name: 'ویمهر',
  description:
    'خوش آمدید به هاب تجاری آینده، مقصد نهایی شما برای درک بهتر مسیرهای شغلی و رشد حرفه‌ای در بخش توسعه صادرات. در پلتفرم ویمهر، ما به ارائه دانش و ابزارهایی که برای رسیدن به موفقیت در حیات حرفه‌ای و شخصی لازم دارید، متعهد هستیم.',
  author: {
    name: 'Mahyar babazadeh',
    websiteUrl: 'https://mbabz.com/',
    address: '',
  },
  logo: {
    url: '/logo-black.png',
    alt: 'ویمهر',
    href: '/',
    width: 160,
    height: 90,
  },
  defaultLanguage: 'fa',
  currencyCode: 'USD',
  site_header: {
    menu: [
      {
        id: 2,
        path: '/suppliers/',
        label: 'suppliers',
        subMenu: [
          {
            id: 1,
            path: '/suppliers/',
            label: 'all-suppliers',
          },
          {
            id: 2,
            path: '/supplier/signin',
            label: 'menu-sign-in',
          },
        ],
      },

      {
        id: 3,
        path: '/about-us',
        label: 'about',
        subMenu: [
          {
            id: 1,
            path: '/about-us',
            label: 'about-us',
          },

          {
            id: 2,
            path: '/contact-us',
            label: 'menu-contact-us',
          },
        ],
      },
      {
        id: 4,
        path: '/terms',
        label: 'menu-terms-condition',
      },
      {
        id: 5,
        path: '/privacy',
        label: 'menu-privacy-policy',
      },
      {
        id: 6,
        path: '/faq',
        label: 'menu-faq',
      },
      {
        id: 7,
        path: '/membership',
        label: 'menu-membership',
      },
      {
        id: 8,
        path: '/news',
        label: 'common:news',
      },
    ],
    languageMenu: [
      {
        id: 'ar',
        name: 'عربى - AR',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'zh',
        name: '中国人 - ZH',
        value: 'zh',
        icon: <CNFlag />,
      },
      {
        id: 'en',
        name: 'English - EN',
        value: 'en',
        icon: <USFlag />,
      },
      {
        id: 'de',
        name: 'Deutsch - DE',
        value: 'de',
        icon: <DEFlag />,
      },
      {
        id: 'he',
        name: 'rעברית - HE',
        value: 'he',
        icon: <ILFlag />,
      },
      {
        id: 'es',
        name: 'Español - ES',
        value: 'es',
        icon: <ESFlag />,
      },
    ],
    languageMenu2: [
      {
        id: 'fa',
        name: 'فارسی - FA',
        value: 'fa',
        icon: (
          <img
            className="w-full h-full"
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg"
          />
        ),
      },
      {
        id: 'en',
        name: 'English - EN',
        value: 'en',
        icon: <USFlag />,
      },
      {
        id: 'ar',
        name: 'عربى - AR',
        value: 'ar',
        icon: <SAFlag />,
      },
    ],
  },
};
