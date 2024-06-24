import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ManagedUIContext } from '@contexts/ui.context';
import ManagedModal from '@components/common/modal/managed-modal';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { useEffect, useRef, useState } from 'react';
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

const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  const [show , setShow] = useState<boolean>(false)
  useEffect(() => {
    if (
      router.pathname != '/my-account' &&
      router.pathname != '/my-account/vip' &&
      router.pathname != '/my-account/create-product' &&
      router.pathname != '/my-account/all-product' &&
      router.pathname != '/my-account/legal-notice' &&
      router.pathname != '/my-account/help-center'
    ) {
      // if (router.locale == 'fa') {
      //   router.push(router.asPath, router.asPath, { locale: 'en' });
      // } else {
      //   document.documentElement.dir = dir;
      // }
      document.documentElement.dir = dir;
    }
  }, [dir, router]);
  const Layout = (Component as any).Layout || Noop;

  const [cookies, setCookie] = useCookies(['user', 'seller']);

  function handleLogin(user: any) {
    setCookie('user', user, { path: '/' });
  }
  function handleLoginSeller(user: any) {
    setCookie('seller', user, { path: '/' });
  }

  console.log()

  async function getIp() {
    if (!cookies?.seller?.token) {
      const response = await fetch('https://geolocation-db.com/json/').catch((e)=>console.log(e))
      const data = await response.json();
      if (data.country_code === "IR") {
        setShow(true)
      }
    }
    
  }

  const [isPlaying, setIsPlaying] = useState(false);

  const audio = useRef();

  // const [audio] = useState(typeof Audio !== 'undefined' && new Audio('/1.mp3'));

  useEffect(() => {
    setTimeout(() => {
      if (router.pathname === '/') {
        if (!isPlaying) {
          audio.current.play();
          if (!audio.current.paused) {
            setIsPlaying(true);
          }
        }
      }
    }, 3000);
    getIp()
  }, []);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <PayPalScriptProvider
        options={{
          clientId:
            'AaHw48SxjwQ5fd_vnuRY4AsibkBn0qWx-7Usnp4yglQ3UGN7ISqP698t0-llTGnyidB0eqeAJVaIJDYa',
        }}
      >
        <audio ref={audio} src="/2.mp3" width="180" height="90" hidden />
        <Hydrate state={pageProps.dehydratedState}>
          {' '}
          <GoogleOAuthProvider clientId="74472575659-u08deub6ejrgjqied21q0ucikd0qjrgh.apps.googleusercontent.com">
            <ManagedUIContext>
              <CookiesProvider>
                <>
                  <DefaultSeo />
                  <Modal open={show} onClose={()=>setShow(false)}>
                  <div
                    className={
                      'w-full  relative '
                    }
                  >
                   <CloseButton onClick={()=>setShow(false)} />
                   <div className="mx-auto overflow-hidden rounded-lg text-center bg-brand-light md:px-16 py-6">
                   <h4 className="w-full text-2xl   text-black font-semibold">
                    تامین کننده هستی؟همین الان ثبت نام کن
                    </h4>
                    <p className='text-black/90 text-md m-0 mt-1'>داخل فری مارکت میتونی راحت محصولاتت رو بفروشی</p>
                    <Link href="/supplier/signin">
                    <Button className='mt-3 font-[900] scale-90'>
                    ثبت نام / ورود
                   </Button>
                    </Link>
             
                   </div>
                  
                </div>
                  </Modal>
                  {(router.pathname === '/home' || router.pathname === '/') ? (
                    <>
                      {isPlaying ? (
                        <MdMusicOff
                          onClick={() => {
                            audio.current.pause();
                            setIsPlaying(false);
                          }}
                          className="fixed text-black p-2 border-black bg-orange-200  border-2 rounded-full bottom-[5%] md:bottom-[5%] right-[3%] text-5xl z-10 cursor-pointer"
                        />
                      ) : (
                        <MdMusicNote
                          onClick={() => {
                            audio.current.play();
                            setIsPlaying(true);
                          }}
                          className="fixed text-black p-2 border-black bg-orange-200  border-2 rounded-full bottom-[5%] md:bottom-[5%] right-[3%] text-5xl z-10 cursor-pointer"
                        />
                      )}
                      <Component
                        {...pageProps}
                        key={router.route}
                        baseData={{ handleLogin, cookies, handleLoginSeller }}
                      />
                    </>
                  ) : (
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
                  )}
                  <ToastContainer position="top-center" />
                  <ManagedModal baseData={{ handleLogin, cookies }} />
                  <ManagedDrawer />
                </>
              </CookiesProvider>
            </ManagedUIContext>
          </GoogleOAuthProvider>{' '}
        </Hydrate>
      </PayPalScriptProvider>

      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default appWithTranslation(CustomApp);
