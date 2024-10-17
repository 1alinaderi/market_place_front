import Container from '@components/ui/container';
import AccountNav from '@components/my-account/account-nav';
import AccountNavMobile from './account-nav-mobile';
import { ROUTES } from '@utils/routes';
import SettingsIcon from '@components/icons/account-settings';
import HelpIcon from '@components/icons/account-help';
import NoticeIcon from '@components/icons/account-notice';
import { RiVipCrown2Line } from 'react-icons/ri';
import { FaBoxes, FaPlus } from 'react-icons/fa';
import AccountOrderIcon from '@components/icons/account-order';
import { AiOutlineQuestionCircle, AiOutlineShop } from 'react-icons/ai';
import { MdCreditScore, MdVerifiedUser } from 'react-icons/md';
import { LuWallet } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';

const accountMenuSeller = [
  {
    slug: ROUTES.ACCOUNT_SETTING,
    name: 'account-information',
    icon: <SettingsIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: '/my-account/create-product',
    name: 'account-add-product',
    icon: <FaPlus className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />,
  },
  {
    slug: '/my-account/all-product',
    name: 'account-see-product',
    icon: (
      <FaBoxes className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  {
    slug: '/my-account/learn',
    name: 'account-learn-product',
    icon: (
      <AiOutlineQuestionCircle className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  // {
  //   slug: ROUTES.ORDERS,
  //   name: 'text-orders',
  //   icon: <OrdersIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  // {
  //   slug: ROUTES.WISHLIST,
  //   name: 'text-wishlist',
  //   icon: <WishlistIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  // {
  //   slug: ROUTES.ADDRESS,
  //   name: 'text-address',
  //   icon: <MapIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  // {
  //   slug: ROUTES.NOTIFICATION,
  //   name: 'text-notifications',
  //   icon: <NotificationIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  {
    slug: '/my-account/referal',
    name: 'earn',
    icon: (
      <MdCreditScore className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  {
    slug: '/my-account/wallet',
    name: 'wallet',
    icon: (
      <LuWallet className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  {
    slug: '/my-account/setting',
    name: 'settings',
    icon: (
      <IoSettingsOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  {
    slug: ROUTES.LEGAL_NOTICE,
    name: 'text-account-details-notice',
    icon: <NoticeIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.HELP_CENTER,
    name: 'text-account-details-help',
    icon: <HelpIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
];

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT_SETTING,
    name: 'account-information',
    icon: <SettingsIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: '/my-account/myorders',
    name: 'My Orders',
    icon: (
      <AccountOrderIcon className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  {
    slug: '/my-account/setting',
    name: 'setting',
    icon: (
      <IoSettingsOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },

  // {
  //   slug: ROUTES.ORDERS,
  //   name: 'text-orders',
  //   icon: <OrdersIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  // {
  //   slug: ROUTES.WISHLIST,
  //   name: 'text-wishlist',
  //   icon: <WishlistIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  // {
  //   slug: ROUTES.ADDRESS,
  //   name: 'text-address',
  //   icon: <MapIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  // {
  //   slug: ROUTES.NOTIFICATION,
  //   name: 'text-notifications',
  //   icon: <NotificationIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  {
    slug: ROUTES.LEGAL_NOTICE,
    name: 'text-account-details-notice',
    icon: <NoticeIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.HELP_CENTER,
    name: 'text-account-details-help',
    icon: <HelpIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
];

const AccountLayout: React.FunctionComponent<{
  baseData: any;
  isSeller: boolean;
}> = ({ children, baseData, isSeller }) => {
  return (
    <div className="border-t border-b border-border-base bg-slate-100">
      <Container>
        <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
          <div className="flex flex-col w-full lg:flex-row ">
            <div className="lg:hidden">
              <AccountNavMobile
                baseData={baseData}
                options={isSeller ? accountMenuSeller : accountMenu}
              />
            </div>
            <div className="hidden lg:block shrink-0 w-72 xl:w-[385px] ltr:mr-7 rtl:ml-7 xl:ltr:mr-8 xl:rtl:ml-8">
              <AccountNav
                baseData={baseData}
                options={isSeller ? accountMenuSeller : accountMenu}
              />
            </div>

            <div className="w-full p-4 mt-4 border rounded-md lg:mt-0 border-border-base bg-white shadow sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountLayout;
