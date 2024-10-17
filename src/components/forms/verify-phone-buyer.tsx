import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useAllSupplierQuery } from '@framework/product/get-all-supplier';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { httpReauest } from 'src/api/api';

const VerifyPhoneBuyer = ({ baseData, t }) => {
  const [phone, setPhone] = useState<string>();
  const [sendCode, setsendcode] = useState<boolean>(false);
  const [code, setcode] = useState<string>();

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (phone) {
      await httpReauest(
        'POST',
        '/supplier/profile/phone/accept',
        { phone: phone, code: code },
        {
          'x-access-token': baseData?.cookies?.seller?.token,
        }
      )
        .then((e) => {
          toast.success(e.data.message);
          router.reload();
        })
        .catch((e) => {
          toast.error(e.message);
        });
    } else {
      toast.error('check all fild');
    }
  }

  async function handleSubmitPhone(e) {
    e.preventDefault();
    if (phone && phone.length === 11) {
      await httpReauest(
        'POST',
        '/supplier/profile/phone',
        { phone: phone },
        {
          'x-access-token': baseData?.cookies?.seller?.token,
        }
      )
        .then((e) => {
          setsendcode(true);
        })
        .catch((e) => {
          toast.error(e.message);
        });
    } else {
      toast.error('تعداد ارقام صحیح نمی باشد');
    }
  }

  return (
    <div>
      {sendCode ? (
        <form onSubmit={handleSubmit}>
          <div className="grid px-1 grid-cols-12   ">
            <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                {t('t-send-code')} {phone}
              </Heading>
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                {t('t-code')} :
              </Heading>
              <input
                onChange={(e) => {
                  setcode(e.target.value);
                }}
                className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </span>
          </div>
          <div className="px-5 mt-8">
            <Button variant="formButton" type="submit">
              {t('t-submit')}
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <div className="grid px-1 grid-cols-12   ">
            <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                {t('t-phone')} :
              </Heading>

              <input
                dir="ltr"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="0939*******"
                className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </span>
          </div>
          <div className="px-5 mt-8">
            <Button
              variant="formButton"
              type="button"
              onClick={handleSubmitPhone}
            >
              {t('t-submit')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPhoneBuyer;
