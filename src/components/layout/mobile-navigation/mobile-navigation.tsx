import Link from '@components/ui/link';
import SearchIcon from '@components/icons/search-icon';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import HomeIcon from '@components/icons/home-icon';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { Drawer } from '@components/common/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import { useModalAction } from '@components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';
import { FaStoreAlt } from 'react-icons/fa';
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});
const AuthMenu = dynamic(() => import('@components/layout/header/auth-menu'), {
  ssr: false,
});
const MobileMenu = dynamic(
  () => import('@components/layout/header/mobile-menu')
);

const BottomNavigation: React.FC = () => {
  const { t } = useTranslation('common');
  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
    toggleMobileSearch,
    isAuthorized,
  } = useUI();
  const { openModal } = useModalAction();
  const { locale , pathname} = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <>
      <div className="lg:hidden fixed z-30 -bottom-0.5 flex items-center justify-between shadow-bottomNavigation body-font bg-brand-light w-full h-14 px-4 md:px-6 lg:px-8 text-brand-muted pb-0.5">
        <button
          aria-label="Menu"
          onClick={handleMobileMenu}
          className="flex flex-col items-center justify-center outline-none shrink-0 focus:outline-none"
        >
          <MenuIcon />
        </button>
        <Link href={'/'} className="shrink-0 flex flex-col items-center justify-center">
          <HomeIcon color={pathname == "/"? "red" :'#666'}/>
        </Link>
        {/* <CartButton hideLabel={true} iconClassName="text-opacity-100" /> */}
        <Link href={'/signin'}>
          <AuthMenu
            isAuthorized={isAuthorized}
            href={'/signin'}
            btnProps={{
              className: 'shrink-0 focus:outline-none',
              children: <UserIcon color={pathname == "/signin" || pathname == "/signup" || pathname == "/my-account" ? "red" :'#666'}/>,
            }}
          >
            <UserIcon />
          </AuthMenu>
        </Link>
      </div>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displaySidebar}
        onClose={closeSidebar}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default BottomNavigation;
