import { useEffect, useState, useRef } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { useSignUpMutation, SignUpInputType } from '@framework/auth/use-signup';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { httpReauest } from 'src/api/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { FaGoogle } from 'react-icons/fa';

interface SignUpFormProps {
  isPopup?: boolean;
  className?: string;
  baseData?: any;
  profile: any;
  googleLogin: any;
}

const SignUpSeller: React.FC<SignUpFormProps> = ({
  isPopup = true,
  className,
  baseData,
  profile,
  googleLogin,
}) => {
  const { t } = useTranslation();
  const { mutate: signUp, isLoading } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);
  const [step2, setstep2] = useState(false);
  const [formmail, setformmail] = useState();
  const [code, setcode] = useState();
  const [usageType, setusageType] = useState<string>();
  const router = useRouter();
  const videoRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  // useEffect(() => {
  //   if (profile?.email) {
  //     googleLoginAndSign();
  //   }
  // }, [profile]);

  // async function googleLoginAndSign() {
  //   await httpReauest(
  //     'POST',
  //     '/supplier/sign/google',
  //     { email: profile.email, name: profile.given_name },
  //     {}
  //   )
  //     .then((e) => {
  //       toast.success(e.data.message);
  //       baseData.handleLoginSeller({
  //         email: e.data.data.email,
  //         id: e.data.data._id,
  //         token: e.data.data.token,
  //       });
  //       router.push(`${window.location.origin}/my-account`);
  //     })
  //     .catch((e) => {
  //       toast.error('Eroor');
  //     });
  // }

  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }

  async function onSubmit({
    name,
    email,
    password,
    remember_me = true,
  }: SignUpInputType) {
    // signUp({
    //   name,
    //   email,
    //   password,
    //   remember_me,
    // });
    await httpReauest('POST', '/supplier/sign', { name, email, password }, {})
      .then((e) => {
        setstep2(true);
        setformmail(email);
        console.log(e);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  useEffect(() => {
    if (baseData?.cookies?.seller?.id) {
      router.push(`${window.location.origin}/my-account`);
    }
  }, [router.pathname]);

  async function sendCode(e: any) {
    e.preventDefault();
    await httpReauest(
      'POST',
      '/supplier/sign/accept',
      { email: formmail, code },
      {}
    )
      .then((e) => {
        toast.success(e.data.message);
        baseData.handleLoginSeller({
          email: e.data.data.email,
          id: e.data.data._id,
          token: e.data.data.token,
        });
        router.push(`${window.location.origin}/my-account`);
      })
      .catch(() => {
        toast.error('code is wrong');
      });
  }
  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[800px] xl:w-[900px] 2xl:w-[900px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full flex-col md:flex-row mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="lg:w-[50%] xl:w-[45%] md:w-[50%] registration  md:block relative">
          <video
            ref={videoRef}
            className="w-full "
            loop
            muted
            src="https://server.wimehr.com/uploads/sign.mp4"
          ></video>
        </div>
        <div className="w-full xl:w-[55%] lg:w-[50%] md:w-[50%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-sign-up-for-free')}
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-base text-body">
              {t('common:text-already-registered')}
              <Link href={'/supplier/signin'}>
                <button
                  type="button"
                  className="text-sm font-semibold ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none"
                  // onClick={handleSignIn}
                >
                  {t('common:text-sign-in-now')}
                </button>
              </Link>
            </div>
          </div>
          {step2 ? (
            <form className="flex flex-col justify-center" noValidate>
              <h3 className="my-3 text-center text-black ">
                We have sent a code to your email{' '}
              </h3>
              <div className="flex flex-col space-y-4">
                <Input
                  name="code"
                  onChange={(e) => {
                    setcode(e.target.value);
                  }}
                  label={t('Code')}
                  type="number"
                  variant="solid"
                />
                <div className="flex items-center justify-center">
                  <div
                    className="flex ltr:ml-auto rtl:mr-auto mt-[2px]"
                    onClick={closeModal}
                  >
                    <Link
                      href={ROUTES.PRIVACY}
                      className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                    >
                      {t('common:text-privacy-and-policy')}
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <Button
                    onClick={(e) => sendCode(e)}
                    loading={isLoading}
                    disabled={isLoading}
                    className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                    variant="formButton"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center"
              noValidate
            >
              <div className="flex flex-col space-y-4">
                <Input
                  label={t('forms:label-name')}
                  type="text"
                  variant="solid"
                  {...register('name', {
                    required: 'forms:name-required',
                  })}
                  error={errors.name?.message}
                />
                <Input
                  label={t('forms:label-email')}
                  type="email"
                  variant="solid"
                  {...register('email', {
                    required: `${t('forms:email-required')}`,
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: t('forms:email-error'),
                    },
                  })}
                  error={errors.email?.message}
                />
                <PasswordInput
                  label={t('forms:label-password')}
                  error={errors.password?.message}
                  {...register('password', {
                    required: `${t('forms:password-required')}`,
                  })}
                />
                {/* <div className="flex gap-7 justify-center flex-wrap">
                  <label
                    className={`block font-normal text-sm w-full leading-none cursor-pointer text-brand-dark text-opacity-70`}
                  >
                    What is your usage type?{' '}
                  </label>

                  <span>
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="PERSONAL"
                      onClick={(e) => {
                        setusageType(e.currentTarget.value);
                      }}
                    />{' '}
                    <label htmlFor="PERSONAL">Personal</label>
                  </span>
                  <span>
                    <input
                      onClick={(e) => {
                        setusageType(e.currentTarget.value);
                      }}
                      type="radio"
                      id="css"
                      name="fav_language"
                      value="COMPANY"
                    />{' '}
                    <label htmlFor="COMPANY">Company</label>
                  </span>
                </div> */}
                <div className="flex items-center justify-center">
                  <div
                    className="flex ltr:ml-auto rtl:mr-auto mt-[2px]"
                    onClick={closeModal}
                  >
                    <Link
                      href={ROUTES.PRIVACY}
                      className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                    >
                      {t('common:text-privacy-and-policy')}
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  {/* <Button
                    onClick={googleLogin}
                    loading={isLoading}
                    disabled={isLoading}
                    className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                    variant="border"
                  >
                    <FaGoogle className="mr-3" size={23} /> Sign With Google
                  </Button> */}
                  <div id="signUpDivS"></div>
                </div>

                <div className="relative">
                  <Button
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                    className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                    variant="formButton"
                  >
                    {t('common:text-register')}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpSeller;
