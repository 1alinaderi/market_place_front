import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { siteSettings } from '@settings/site-settings';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import HeaderMenu from '@components/layout/header/header-menu';
import Search from '@components/common/search';
import LanguageSwitcher from '@components/ui/language-switcher';
import UserIcon from '@components/icons/user-icon';
import SearchIcon from '@components/icons/search-icon';
import { useModalAction } from '@components/common/modal/modal.context';
import useOnClickOutside from '@utils/use-click-outside';
import Delivery from '@components/layout/header/delivery';
import { useUI } from '@contexts/ui.context';
import MenuIcon from '@components/icons/menu-icon';

import Link from 'next/link';
import LanguageSwitcherHeader from '@components/ui/LanguageSwitcherHeader';
import { httpReauest } from 'src/api/api';
import { useStateList } from 'react-use';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const {
    displaySearch,
    displayMobileSearch,
    openSearch,
    closeSearch,
    isAuthorized,
  } = useUI();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }

  const { openSidebar, closeSidebar, displaySidebar, toggleMobileSearch } =
    useUI();

  function handleMobileMenu() {
    return openSidebar();
  }
  const [menuData, setMenuData] = useState([]);
  async function getcategory() {
    const response = await httpReauest('GET', '/categorys', {}, {});
    const category = response.data.data.categorys;
    setMenuData(category);
  }
  function handleMobile() {
    if (window.innerWidth >= 1024) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  }
  useEffect(() => {
    getcategory();
    handleMobile();
  }, []);

  const [activeSearch, setActiveSearch] = useState(false);
  const [mobile, setMobile] = useState(true);

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-two sticky-header sticky top-0 z-30 lg:relative w-full h-20 lg:h-auto ',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div
        dir="ltr"
        className="z-20 bg-1d3557 w-screen transition-all duration-200 ease-in-out innerSticky lg:w-full body-font bg-fill-secondary"
      >
        <Search
          searchId="mobile-search"
          className="top-bar-search  lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1"
        />
        {/* End of Mobile search */}
        <Container className="flex items-center  justify-center md:justify-between h-20 py-3 top-bar lg:h-auto">
          <Link href={'/'}>
            <div className="flex items-baseline cursor-pointer">
              <img
                src="/logo.png"
                className="p-2 lg:p-0 max-w-[7rem] lg:w-[7rem] object-contain"
              />
            </div>
          </Link>
          {/* End of logo */}

          {!activeSearch && (
            <>
              <div className="lg:hidden mx-2">
                <LanguageSwitcherHeader justFa={true} />
              </div>
            </>
          )}

          <Search
            mobile={mobile}
            activeSearch={activeSearch}
            setActiveSearch={setActiveSearch}
            searchId="top-bar-search"
            className=" lg:flex lg:max-w-[650px] px-1 md:px-6 2xl:max-w-[800px] lg:ltr:ml-7 lg:rtl:mr-7 lg:ltr:mr-5 lg:rtl:ml-5"
          />

          {!activeSearch && (
            <button
              aria-label="Menu"
              onClick={handleMobileMenu}
              className="flex text-white flex-col items-center justify-center outline-none shrink-0 focus:outline-none lg:hidden"
            >
              <MenuIcon />
            </button>
          )}
          <div></div>
          {/* End of search */}

          <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
            <div className="xl:mx-3.5 mx-2.5"></div>
            {/* <CartButton className="hidden lg:flex mx-2.5 xl:mx-3.5" /> */}
            <Link href={'/signin'}>
              <div className="items-center hidden lg:flex shrink-0 mx-2.5 xl:mx-3.5">
                <UserIcon className="text-brand-light text-opacity-80" />

                <AuthMenu
                  isAuthorized={isAuthorized}
                  href={ROUTES.ACCOUNT}
                  btnProps={{
                    children: t('text-sign-in'),
                  }}
                >
                  {t('text-account')}
                </AuthMenu>
              </div>
            </Link>
          </div>
          {/* End of auth & lang */}
        </Container>
        {/* End of top part */}

        <div className="hidden navbar bg-1d3557 lg:block">
          <Container className="flex items-center justify-between lg:px-6 2xl:px-10">
            {/* <Logo className="w-[0] transition-all duration-200 ease-in-out opacity-0 navbar-logo  p-3" /> */}
            <div className="w-[0] cursor-pointer lg:ml-3 transition-all duration-200 ease-in-out opacity-0 navbar-logo">
              <Link href={'/'}>
                <div className="flex items-baseline cursor-pointer">
                  <h1 className="text-yellow-600  lg:text-[30px] text-[20px] font-bold">
                    W
                  </h1>
                  <span className="text-[#fff] lg:text-2xl font-bold   ">
                    IMEHR
                  </span>
                </div>
              </Link>
            </div>
            {/* End of logo */}

            <HeaderMenu
              data={site_header.menu}
              categorys={menuData}
              row={true}
              className="flex transition-all duration-200 ease-in-out xl:gap-3 gap-2"
            />
            <LanguageSwitcherHeader justFa={true} />
            {/* End of main menu */}

            {displaySearch && (
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-4 sticky-search">
                <Search
                  ref={siteSearchRef}
                  className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                />
              </div>
            )}
            {/* End of conditional search  */}

            <div className="flex items-center ltr:ml-auto rtl:mr-auto shrink-0">
              {/* <Delivery /> */}
              <div className="flex items-center w-0 py-4 overflow-hidden transition-all duration-200 ease-in-out opacity-0 navbar-right">
                {/* <button
                  type="button"
                  aria-label="Search Toggle"
                  onClick={() => openSearch()}
                  title="Search toggle"
                  className="flex items-center justify-center w-12 h-full transition duration-200 ease-in-out outline-none ltr:mr-0 rtl:ml-6 md:w-14 hover:text-heading focus:outline-none"
                >
                  <SearchIcon className="w-[22px] h-[22px] text-white " />
                </button> */}

                {/* 
                <CartButton /> */}

                <Link href={'/signin'}>
                  <div className="flex items-center shrink-0 mx-0 xl:mx-1">
                    <UserIcon className="text-white" />
                    <AuthMenu
                      isAuthorized={isAuthorized}
                      href={ROUTES.ACCOUNT}
                      btnProps={{
                        children: t('text-sign-in'),
                        // onClick: handleLogin,
                      }}
                    >
                      {t('text-account')}
                    </AuthMenu>
                  </div>
                </Link>
              </div>
            </div>
          </Container>
        </div>
        {/* End of menu part */}
      </div>
    </header>
  );
};

export default Header;
