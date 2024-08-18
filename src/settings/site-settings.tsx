import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';
import { httpReauest } from 'src/api/api';
import { useEffect } from 'react';


export const siteSettings = {

  
  name: 'Wimehr',
  description:
    'Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life.',
  author: {
    name: '',
    websiteUrl: '',
    address: '',
  },
  logo: {
    url: '/logo-black.png',
    alt: 'Wimehr',
    href: '/',
    width: 160,
    height: 90,
  },
  defaultLanguage: 'en',
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
        id: 6,
        path: '/membership',
        label: 'menu-membership',
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
