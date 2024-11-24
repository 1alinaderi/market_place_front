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
import Button from '@components/ui/button';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
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
  addActiveScroll(siteHeaderRef, 40, setIsScrolled);
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
  const [freeCategory, setfreeCategory] = useState([]);
  async function getcategory() {
    const response = await httpReauest('GET', '/categorys', {}, {});
    const response2 = await httpReauest('GET', '/categorys/free', {}, {});
    const category = response.data.data;
    const category2 = response2.data.data;
    setMenuData(category);
    setfreeCategory(category2);
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

  const [activeSearch, setActiveSearch] = useState<boolean>(false);
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
      <div className="z-20 bg-1d3557 w-screen transition-all duration-200 ease-in-out innerSticky lg:w-full body-font bg-fill-secondary">
        <Search
          searchId="mobile-search"
          className="top-bar-search  lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1"
        />
        {/* End of Mobile search */}
        <Container className="flex items-center  justify-center md:justify-between h-20 py-3  top-bar lg:h-auto">
          <Link href={'/'}>
            <div className="flex items-baseline cursor-pointer">
              <img
                src="/logo.png"
                className=" lg:p-0 max-w-[6rem] lg:w-[7rem] object-contain"
              />
            </div>
          </Link>
          {/* End of logo */}

          {/* {!activeSearch && (
            <>
              <div className="lg:hidden mx-2">
                <LanguageSwitcherHeader justFa={true} />
              </div>
            </>
          )} */}

          <Search
            activeSearch={activeSearch}
            setActiveSearch={setActiveSearch}
            searchId="top-bar-search"
            className=" lg:flex lg:max-w-[650px] px-1 md:px-6 2xl:max-w-[800px] w-full "
          />

          {/* {!activeSearch && (
            <button
              aria-label="Menu"
              onClick={handleMobileMenu}
              className="flex text-white flex-col items-center justify-center outline-none shrink-0 focus:outline-none lg:hidden"
            >
              <MenuIcon />
            </button>
          )} */}
          {/* End of search */}

          <div className="lg:flex gap-2 shrink-0 -mx-2.5 xl:-mx-3.5 hidden ">
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
            <Link href={'/signup'}>
              <Button
                style={{ padding: '10px 20px', height: 'fit-content' }}
                variant="formButton"
                className="hidden lg:inline"
              >
                {t('footer:Sgin-Up')}
              </Button>
            </Link>
          </div>
          {/* End of auth & lang */}
        </Container>
        {/* End of top part */}

        <div className="hidden navbar bg-1d3557 lg:block">
          <Container className="flex items-center justify-between lg:px-6 2xl:px-10">
            {/* <Logo className="w-[0] transition-all duration-200 ease-in-out opacity-0 navbar-logo  p-3" /> */}
            <div className="w-[0] cursor-pointer  transition-all duration-200 ease-in-out opacity-0 navbar-logo">
              <Link href={'/'}>
                <div className="flex items-baseline cursor-pointer">
                  <img
                    src="/logo.png"
                    className="p-2 lg:p-0  lg:w-[6rem] object-contain"
                  />
                </div>
              </Link>
            </div>
            {/* End of logo */}
            {!isScrolled && (
              <HeaderMenu
                data={site_header.menu}
                categorys={menuData}
                freeCategorys={freeCategory}
                row={true}
                className="flex transition-all duration-200 ease-in-out xl:gap-3 gap-2"
              />
            )}
            {(displaySearch || isScrolled) && (
              <div className=" flex items-center justify-center  px-4 sticky-search">
                <Search
                  ref={siteSearchRef}
                  setActiveSearch={setActiveSearch}
                  activeSearch={activeSearch}
                  className="min-w-[600px] max-w-[600px] xl:max-w-[730px]"
                />
              </div>
            )}
            <div className="flex items-center ">
              <LanguageSwitcherHeader justFa={true} />

              <div className="flex items-center  pl-2  shrink-0 ">
                {/* <Delivery /> */}
                <div className="flex items-center w-0 gap-2 py-4 overflow-hidden transition-all duration-200 ease-in-out opacity-0 navbar-right">
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
                  <Link href={'/signup'}>
                    <Button
                      style={{ padding: '10px 20px', height: 'fit-content' }}
                      variant="formButton"
                    >
                      {t('footer:Sgin-Up')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* End of main menu */}

            {/* End of conditional search  */}
          </Container>
        </div>
        {/* End of menu part */}
      </div>
    </header>
  );
};

export default Header;
