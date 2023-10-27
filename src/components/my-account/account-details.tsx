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
import { FaAngleRight, FaCheckCircle } from 'react-icons/fa';
import CompleteProfileFormBuyerCompany from '@components/forms/complete-profile-buyer-company';
import CompleteProfileFormBuyerPersonal from '@components/forms/complete-profile-buyer-personal';
import VerifyCardBank from '@components/forms/verify-bank-card';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';
import Alert from '@components/ui/alert';
import Link from 'next/link';

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
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [orders, setorders] = useState();
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

    setData(data.data);
  }
  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }
  return (
    <div className="flex flex-col w-full">
      <Link href={'/my-account/vip'}>
        <div
          className={`w-full hover:text-red-600 duration-200 cursor-pointer h-full py-4 px-5 text-[18px] md:text-xl text-white items-center  font-semibold flex  border  mb-8 bg-green-500 rounded `}
        >
          Upgrade your membership level to get the best services
          <FaAngleRight size={23} className="ml-1" />
        </div>
      </Link>

      {isSeller ? (
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
                <span className="col-span-12 sm:col-span-12 flex my-1 sm:mb-6 justify-center ">
                  <span className="border p-2 rounded-full flex justify-center items-center">
                    <img
                      className="h-[80px] w-[80px] p-2"
                      src={
                        data.logo
                          ? CDN_BASE_URL + '/' + data.logo
                          : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                      }
                    />
                  </span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Name :
                  </Heading>
                  <span>{data?.name}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Email :
                  </Heading>
                  <span>{data?.email}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Email :
                  </Heading>
                  <span>{data?.email}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Membership :
                  </Heading>
                  <span>{data?.membership}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Signing Date :
                  </Heading>

                  <span>
                    {moment(data?.createdAt).format('MM/DD/YYYY hh:mm')}
                  </span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    phone :
                  </Heading>

                  <span>{data?.phone ? data.phone : 'Not Verfiyed'}</span>
                </span>

                <span className="col-span-12 sm:col-span-12 flex my-1 sm:my-3 ">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    bio :
                  </Heading>

                  <span>{data?.bio}</span>
                </span>
              </div>
            </div>
          </div>

          {!data?.inProggress && !data?.completeProfile && (
            <div className="border-b border-border-base pb-7">
              <Heading
                variant="titleLarge"
                className="pt-6 mb-5  md:pt-7 lg:pt-8"
              >
                <div className="flex items-center gap-3">
                  Complete Your Profile
                </div>
              </Heading>
              <CompleteProfileFormSellerPersonal baseData={baseData} />
            </div>
          )}

          {data?.inProggress && (
            <div className="border-b border-border-base pb-7">
              <Heading
                variant="titleLarge"
                className="pt-6 mb-5  md:pt-7 lg:pt-8"
              >
                <div className="flex items-center gap-3">
                  <MdPendingActions size={35} />
                  Your information has been sent, you must wait for it to be
                  confirmed by the site's support
                </div>
              </Heading>
            </div>
          )}

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

          {!data?.phone && (
            <div id="orders">
              <Heading
                variant="titleLarge"
                className="pt-6 mb-5  md:pt-7 lg:pt-8"
              >
                Verify Your Phone
              </Heading>
              <VerifyPhoneBuyer baseData={baseData} />
            </div>
          )}

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
        </div>
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
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Name :
                  </Heading>
                  <span>{data?.name}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Email :
                  </Heading>
                  <span>{data?.email}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Signing Date :
                  </Heading>

                  <span>
                    {moment(data?.createdAt).format('MM/DD/YYYY hh:mm')}
                  </span>
                </span>

                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Type :
                  </Heading>

                  <span>{data?.type}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Address :
                  </Heading>

                  <span>{data?.address ? data.address : 'No Address'}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Phone :
                  </Heading>

                  <span>{data?.phone ? data.phone : 'No phone'}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Country :
                  </Heading>

                  <span>{data?.country ? data.country : 'No Country'}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    City :
                  </Heading>

                  <span>{data?.city ? data.city : 'No City'}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Certifed Id :
                  </Heading>

                  <span>{data?.passId ? data.passId : 'No Id'}</span>
                </span>
                <span className="col-span-12 sm:col-span-6 flex my-1 sm:my-3">
                  <Heading className="mr-2 whitespace-nowrap" variant="base">
                    Postal Code :
                  </Heading>

                  <span>
                    {data?.postalCode ? data.postalCode : 'No Postal Code'}
                  </span>
                </span>

                <span className="col-span-12 sm:col-span-12 flex my-1 sm:my-3 flex-wrap">
                  <Heading
                    className="mr-2 pb-4 whitespace-nowrap"
                    variant="base"
                  >
                    Bank Cards :
                  </Heading>

                  {data?.bankCards &&
                    data?.bankCards.map((card) => {
                      return (
                        <div className="w-full">
                          {card.name} - {card.cardNumber}
                        </div>
                      );
                    })}
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
          {!data?.address && !data?.country && (
            <div className="border-b border-border-base pb-7">
              <Heading
                variant="titleLarge"
                className="pt-6 mb-5  md:pt-7 lg:pt-8"
              >
                <div className="flex items-center gap-3">
                  Complete Your Profile
                </div>
              </Heading>
              {data?.type === 'COMPANY' ? (
                <CompleteProfileFormBuyerCompany baseData={baseData} />
              ) : (
                <CompleteProfileFormBuyerPersonal baseData={baseData} />
              )}
            </div>
          )}

          <div id="orders">
            <Heading
              variant="titleLarge"
              className="pt-6 mb-5  md:pt-7 lg:pt-8"
            >
              Add Your Bank Cards
            </Heading>
            <VerifyCardBank baseData={baseData} />
          </div>

          {!data?.phone && (
            <div id="orders">
              <Heading
                variant="titleLarge"
                className="pt-6 mb-5  md:pt-7 lg:pt-8"
              >
                Verify Your Phone
              </Heading>
              <VerifyPhoneBuyer baseData={baseData} />
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
