import Layout from '@components/layout/layout';
import LoginForm from '@components/auth/login-form';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginFormSeller from '@components/auth/login-form-seller';
import Head from 'next/head';
import { jwtDecode } from 'jwt-decode';
import { httpReauest } from 'src/api/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Link from 'next/link';

export default function SignInPage({ baseData }) {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const router = useRouter();
  // const googleLogin = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUser(codeResponse),
  //   onError: (error) => console.log('Login Failed:', error),
  // });

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: 'application/json',
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setProfile(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);
  async function handlecallback(response) {
    const userObject = jwtDecode(response.credential);
    setProfile(userObject);
    if (userObject) {
      await httpReauest(
        'POST',
        '/supplier/sign/google',
        { email: userObject.email, name: userObject.name },
        {}
      )
        .then((e) => {
          toast.success(e.data.message);
          baseData.handleLoginSeller({
            email: userObject.email,
            id: e.data.data._id,
            token: e.data.data.token,
          });
          router.push(`${window.location.origin}/my-account`);
        })
        .catch((e) => {
          toast.error('Eroor');
        });
    }
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
      callback: handlecallback,
    });
    google.accounts.id.renderButton(document.getElementById('signInDivS'), {
      theme: 'outline',
      width: '100%',
      text: 'Sign With Google',
      class: 'custom-google-button',
    });
  }, []);

  return (
    <>
      <Seo title="ورود نام تامین کننده" path="supplier/signin" />
      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Head>
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-12 sm:py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <div className="flex gap-3 items-center border p-2 mb-4 justify-between rounded font-bold">
            {' '}
            برای ثبت نام نیاز به راهنمایی داری؟
            <Link href={'/guide'}>
              <button className="text-[14px] text-white bg-red-500 rounded px-4 py-1">
                راهنما
              </button>
            </Link>
          </div>
          <LoginFormSeller
            // profile={profile}
            baseData={baseData}
            // googleLogin={googleLogin}
            isPopup={false}
            className="border rounded-lg border-border-base"
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

SignInPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
