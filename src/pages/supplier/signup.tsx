import Layout from '@components/layout/layout';
import SignupForm from '@components/auth/sign-up-form';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import Divider from '@components/ui/divider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import SignUpSeller from '@components/auth/sign-up-seller';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import { httpReauest } from 'src/api/api';
import { toast } from 'react-toastify';

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
    console.log(userObject);
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
    google?.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
      callback: handlecallback,
    });
    google?.accounts.id.renderButton(document.getElementById('signUpDivS'), {
      theme: 'outline',
      width: '100%',
      text: 'Sign With Google',
      class: 'custom-google-button',
    });
  }, []);
  return (
    <>
      <Seo title="ثبت نام تامین کننده" path="supplier/signup" />
      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Head>
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10 w-full">
          <SignUpSeller
            profile={profile}
            baseData={baseData}
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
