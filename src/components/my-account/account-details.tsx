import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm, Controller } from 'react-hook-form';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import { useTranslation } from 'next-i18next';
import Switch from '@components/ui/switch';
import Text from '@components/ui/text';
import { useUserQuery } from '@framework/product/get-user';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { httpReauest } from 'src/api/api';
import OrderTable from '@components/order/order-table';
import CompleteProfileFormSellerPersonal from '@components/forms/complete-profile-seller-personal';
import { MdPendingActions } from 'react-icons/md';
import VerifyPhoneBuyer from '@components/forms/verify-phone-buyer';
import { FaAngleRight, FaCheckCircle, FaTimes } from 'react-icons/fa';
import CompleteProfileFormBuyerCompany from '@components/forms/complete-profile-buyer-company';
import CompleteProfileFormBuyerPersonal from '@components/forms/complete-profile-buyer-personal';
import VerifyCardBank from '@components/forms/verify-bank-card';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';
import Alert from '@components/ui/alert';
import Link from 'next/link';
import Modal from '@components/common/modal/modal';
import LoginForm from '@components/auth/login-form';
import CloseButton from '@components/ui/close-button';
import MembershipCard from '@components/cards/membership-card';
import LanguageSwitcher from '@components/ui/language-switcher';
import Balance from './Balance';
import CompleteOtherInfoSeller from '@components/forms/complete-other-info-seller';

const defaultValues = {};

interface AccountDetailsProps {
  baseData: any;
  isSeller: boolean;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  baseData,
  isSeller,
}) => {
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const { t } = useTranslation('common');
  const [data, setData] = useState([]);
  const [open, setopen] = useState<boolean>(false);
  const [dontshow, setdontshow] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateUserType>({
    defaultValues,
  });

  const router = useRouter();

  useEffect(() => {
    if (!baseData.cookies.user?.id && !baseData.cookies.seller?.id) {
      router.push(`${window.location.origin}/sign`);
    } else {
      if (baseData.cookies.user?.id) {
        getuserData(baseData.cookies.user?.id);
      }
      if (baseData.cookies.seller?.id) {
        getSellerData(baseData.cookies.seller?.id);
      }
    }
  }, [router.pathname]);

  async function getuserData(id: any) {
    const { data } = await httpReauest('GET', '/user/' + id, {}, {});

    // const data2 = await httpReauest('GET', '/order/' + id, {}, {});

    // setorders(data2.data.data);

    setData(data.data);
  }

  async function getSellerData(id: any) {
    const { data } = await httpReauest('GET', '/supplier/' + id, {}, {});

    const showmodal = localStorage.getItem('showmodal');

    if (data?.data?.membership == 'Freemium' && !showmodal) {
      setopen(true);
    }
    const isdont = localStorage.getItem('dontshow');
    if (data?.data?.phone && data?.data?.completeProfile && !isdont) {
      setdontshow(true);
    }
    setData(data.data);
  }
  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }

  function onClose() {
    setopen(false);
    localStorage.setItem('showmodal', 'false');
  }

  function gotovip() {
    router.push(`${window.location.origin}/membership`);
  }

  function handleDontshow() {
    localStorage.setItem('dontshow', 'false');
    setdontshow(false);
  }
  return (
    <div className="flex flex-col w-full">
      {isSeller ? (
        <>
          <Modal open={open} onClose={onClose}>
            <div
              className={
                'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1000px] relative '
              }
            >
              {' '}
              <CloseButton onClick={onClose} />
              <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light py-5 gap-4 justify-center flex-wrap">
                <h1 className="w-full text-3xl py-3 text-center text-black font-semibold">
                  {t('text-choose-membership')}
                </h1>
                <MembershipCard gotovip={gotovip} onClose={onClose} free />
                <MembershipCard
                  gotovip={gotovip}
                  onClose={onClose}
                  free={false}
                />
              </div>
            </div>
          </Modal>
          <small className="mb-2">{t('manage-coins')}</small>
          <div className="flex gap-2 items-center mb-3 flex-wrap lg:flex-nowrap">
            <Balance data={data} />
            {dontshow && (
              <div className="border w-full border-green-400 p-3 pb-4 rounded bg-green-200 text-green-700 font-bold relative">
                {' '}
                <span
                  onClick={handleDontshow}
                  className="absolute rtl:left-1 top-1 ltr:right-1"
                >
                  <FaTimes />
                </span>
                {t('congragelation-text')}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center w-full mx-auto">
            {!data?.phone && (
              <div id="orders">
                <Heading
                  variant="titleLarge"
                  className="pt-6 mb-5  md:pt-7 lg:pt-8"
                >
                  {t('t-verify-phone')}
                </Heading>
                <VerifyPhoneBuyer t={t} baseData={baseData} />
              </div>
            )}

            {!data?.inProggress && !data?.completeProfile && (
              <div className="border-b border-border-base pb-7">
                <Heading
                  variant="titleMedium"
                  className="pt-6 mb-5  md:pt-7 lg:pt-8"
                >
                  <div className="flex items-center gap-3">
                    {t('t-compelete-profile')}
                  </div>
                </Heading>
                <div className="text-[12px] lg:text-[16px] lg:px-3 mb-4">
                  <h2 className="mb-5 text-black">{t('profile-h')}</h2>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-5 ">
                    <img
                      className="md:h-[340px] rounded shadow w-full"
                      src="/assets/images/img.jpg"
                      alt=""
                    />
                    <img
                      className="md:h-[340px] rounded shadow w-full"
                      src="/assets/images/img1.jpg"
                      alt=""
                    />
                  </div>
                  <p>{t('profile-p')}</p>
                  <p>{t('profile-p-1')}</p>
                  <p>{t('profile-p-2')}</p>
                </div>
                <CompleteProfileFormSellerPersonal t={t} baseData={baseData} />
              </div>
            )}

            {data?.inProggress && (
              <div className="border-b border-border-base pb-7">
                <Heading
                  variant="titleMedium"
                  className="pt-6 mb-5  md:pt-7 lg:pt-8"
                >
                  <div className="flex items-center gap-3">
                    <MdPendingActions size={35} />
                    {t('t-send-information-wait')}
                  </div>
                </Heading>
              </div>
            )}
            <Heading
              variant="titleLarge"
              className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1"
            >
              {t('common:text-account-details-personal')}
            </Heading>
            <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
              <div className="flex flex-col space-y-4 sm:space-y-5">
                <div className="grid px-1 grid-cols-12   ">
                  <span className="col-span-12 sm:col-span-12 flex my-1 sm:mb-6 justify-center ">
                    <span className="border p-2 rounded-full flex justify-center items-center">
                      <img
                        className="h-[80px] w-[80px] p-2"
                        src={
                          data.logo
                            ? CDN_BASE_URL + data.logo
                            : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                        }
                      />
                    </span>
                  </span>
                  <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                    <Heading className="mx-2 whitespace-nowrap" variant="base">
                      {t('t-name')} :
                    </Heading>
                    <span>{data?.name}</span>
                  </span>
                  <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                    <Heading className="mx-2 whitespace-nowrap" variant="base">
                      {t('t-email')} :
                    </Heading>
                    <span>{data?.email}</span>
                  </span>

                  <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                    <Heading className="mx-2 whitespace-nowrap" variant="base">
                      {t('account-membership')} :
                    </Heading>
                    <span>{data?.membership}</span>
                  </span>
                  <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                    <Heading className="mx-2 whitespace-nowrap" variant="base">
                      {t('t-sign-date')} :
                    </Heading>

                    <span>
                      {moment(data?.createdAt).format('MM/DD/YYYY hh:mm')}
                    </span>
                  </span>
                  <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                    <Heading className="mx-2 whitespace-nowrap" variant="base">
                      {t('t-phone')} :
                    </Heading>

                    <span>{data?.phone ? data.phone : t('t-not-verify')}</span>
                  </span>

                  <span className="col-span-12 sm:col-span-12 flex my-1 sm:my-3 ">
                    <Heading className="mx-2 whitespace-nowrap" variant="base">
                      {t('t-bio-1')} :
                    </Heading>

                    <span>{data?.bio}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* {data?.bankCards?.length == 0 && (
          <div id="orders">
            <Heading
              variant="titleLarge"
              className="pt-6 mb-5  md:pt-7 lg:pt-8"
            >
              Verify Your Bank Cards
            </Heading>
            <VerifyCardBank baseData={baseData} />
          </div>
        )} */}

            {data?.completeProfile && (
              <>
                <Heading variant="title" className="pt-6 mb-5  md:pt-7 lg:pt-8">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" />
                    {t('t-profile-us-complete')}
                    <span className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 duration-150">
                      <Link href={'/my-account/create-product'}>
                        {t('add-product')}
                      </Link>
                    </span>
                  </div>
                </Heading>
                <CompleteOtherInfoSeller
                  data={data}
                  t={t}
                  baseData={baseData}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center w-full mx-auto" noValidate>
          <Heading
            variant="titleLarge"
            className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1"
          >
            {t('common:text-account-details-personal')}
          </Heading>
          <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
            <div className="flex flex-col space-y-4 sm:space-y-5">
              <div className="grid px-1 grid-cols-12   ">
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mx-2 whitespace-nowrap" variant="base">
                    Name :
                  </Heading>
                  <span>{data?.name}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mx-2 whitespace-nowrap" variant="base">
                    Email :
                  </Heading>
                  <span>{data?.email}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mx-2 whitespace-nowrap" variant="base">
                    Signing Date :
                  </Heading>

                  <span>
                    {moment(data?.createdAt).format('MM/DD/YYYY hh:mm')}
                  </span>
                </span>

                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mx-2 whitespace-nowrap" variant="base">
                    Address :
                  </Heading>

                  <span>{data?.address ? data.address : 'No Address'}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mx-2 whitespace-nowrap" variant="base">
                    Phone :
                  </Heading>

                  <span>{data?.phone ? data.phone : 'No phone'}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mx-2 whitespace-nowrap" variant="base">
                    Country :
                  </Heading>

                  <span>{data?.country ? data.country : 'No Country'}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mx-2 whitespace-nowrap" variant="base">
                    City :
                  </Heading>

                  <span>{data?.city ? data.city : 'No City'}</span>
                </span>

                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mx-2 whitespace-nowrap" variant="base">
                    Postal Code :
                  </Heading>

                  <span>
                    {data?.postalCode ? data.postalCode : 'No Postal Code'}
                  </span>
                </span>
              </div>
            </div>
          </div>
          {data?.completeProfile && (
            <Heading
              variant="titleLarge"
              className="pt-6 mb-5  md:pt-7 lg:pt-8"
            >
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500" />
                Your Profile is Complete
              </div>
            </Heading>
          )}
          {!data?.address ||
            (!data?.country && (
              <div className="border-b border-border-base pb-7">
                <Heading
                  variant="titleLarge"
                  className="pt-6 mb-5  md:pt-7 lg:pt-8"
                >
                  <div className="flex items-center gap-3">
                    Complete Your Profile
                  </div>
                </Heading>

                <CompleteProfileFormBuyerPersonal baseData={baseData} />
              </div>
            ))}

          {!data?.phone && (
            <div id="orders">
              <Heading
                variant="titleLarge"
                className="pt-6 mb-5  md:pt-7 lg:pt-8"
              >
                Verify Your Phone
              </Heading>
              <VerifyPhoneBuyer t={t} baseData={baseData} />
            </div>
          )}

          {/* <div id="orders">
          <Heading
            variant="titleLarge"
            className="pt-6 mb-5  md:pt-7 lg:pt-8"
          >
            Orders
          </Heading>
          <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
            {orders && <OrderTable orders={orders} />}
          </div>
        </div> */}
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
