import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ManagedUIContext } from '@contexts/ui.context';
import ManagedModal from '@components/common/modal/managed-modal';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { Ref, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from '@components/seo/default-seo';
import { CookiesProvider, useCookies } from 'react-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// external
import NextNProgress from 'nextjs-progressbar';
// base css file
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/custom-plugins.css';
import '@assets/css/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { getDirection } from '@utils/get-direction';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import Modal from '@components/common/modal/modal';
import CloseButton from '@components/ui/close-button';
import Button from '@components/ui/button';
import Link from 'next/link';
import { SearchContext } from '@contexts/searchContext';

const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    // if (router.locale == 'fa') {
    //   router.push(router.asPath, router.asPath, { locale: 'en' });
    // } else {
    //   document.documentElement.dir = dir;
    // }
    document.documentElement.dir = dir;
  }, [dir, router]);

  const Layout = (Component as any).Layout || Noop;

  const [cookies, setCookie] = useCookies(['user', 'seller']);

  function handleLogin(user: any) {
    setCookie('user', user, { path: '/' });
  }
  function handleLoginSeller(user: any) {
    setCookie('seller', user, { path: '/' });
  }

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audio = useRef<HTMLAudioElement>();

  // const [audio] = useState(typeof Audio !== 'undefined' && new Audio('/1.mp3'));

  useEffect(() => {
    setTimeout(() => {
      if (router.pathname === '/') {
        if (!isPlaying) {
          if (audio.current) {
            audio.current.play();
            if (!audio.current.paused) {
              setIsPlaying(true);
            }
          }
        }
      }
    }, 3000);
  }, []);

  const [category, setCategory] = useState();
  const [subCategory, setsubCategory] = useState();

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <NextNProgress color="red" />

      <audio ref={audio} src="/2.mp3" width="180" height="90" hidden />
      <Hydrate state={pageProps.dehydratedState}>
        {' '}
        <GoogleOAuthProvider clientId="74472575659-u08deub6ejrgjqied21q0ucikd0qjrgh.apps.googleusercontent.com">
          <ManagedUIContext>
            <SearchContext.Provider
              value={{ category, setCategory, subCategory, setsubCategory }}
            >
              <CookiesProvider>
                <>
                  <DefaultSeo />
                  <Layout pageProps={pageProps}>
                    {isPlaying ? (
                      <MdMusicOff
                        onClick={() => {
                          if (audio.current.paused) {
                            audio.current.play();
                            setIsPlaying(true);
                          } else {
                            audio.current.pause();
                            setIsPlaying(false);
                          }
                        }}
                        className="fixed text-black p-2 border-black bg-orange-200  border-2 rounded-full bottom-[8%] md:bottom-[5%] right-[3%] text-5xl z-10 cursor-pointer"
                      />
                    ) : (
                      <MdMusicNote
                        onClick={() => {
                          if (audio.current.paused) {
                            audio.current.play();
                            setIsPlaying(true);
                          } else {
                            audio.current.pause();
                            setIsPlaying(false);
                          }
                        }}
                        className="fixed text-black p-2 border-black bg-orange-200  border-2 rounded-full bottom-[8%] md:bottom-[5%] right-[3%] text-5xl z-10 cursor-pointer"
                      />
                    )}
                    <Component
                      {...pageProps}
                      key={router.route}
                      baseData={{ handleLogin, cookies, handleLoginSeller }}
                    />
                  </Layout>
                  <ToastContainer position="top-center" />
                  <ManagedModal
                    baseData={{ handleLogin, cookies, handleLoginSeller }}
                  />
                  <ManagedDrawer />
                </>
              </CookiesProvider>
            </SearchContext.Provider>
          </ManagedUIContext>
        </GoogleOAuthProvider>{' '}
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default appWithTranslation(CustomApp);
