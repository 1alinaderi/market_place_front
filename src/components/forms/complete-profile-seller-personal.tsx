import Button from '@components/ui/button';
import { CheckBox } from '@components/ui/form/checkbox';
import Heading from '@components/ui/heading';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useAllSupplierQuery } from '@framework/product/get-all-supplier';
import { CountrysName } from '@utils/countrys';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { httpReauest } from 'src/api/api';

const CompleteProfileFormSellerPersonal = ({ baseData, t }) => {
  const [image, setimage] = useState(null);
  const [image1, setimage1] = useState(null);
  const [preview, setpreview] = useState(null);
  const [previewPay, setpreviewPay] = useState(null);
  const [imagePay, setimagePay] = useState(null);
  const [bio, setbio] = useState<string>();
  const [nationalCode, setnationalCode] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [step, setStep] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (image) {
      if (image.size > 1031517) {
        toast.error('The file size is more than 1mb');
        setimage(null);
      } else {
        setPreviwImage();
      }
    }
  }, [image]);
  useEffect(() => {
    if (imagePay) {
      if (imagePay.size > 1031517) {
        toast.error('The file size is more than 1mb');
        setimagePay(null);
      } else {
        setPreviwImagePay();
      }
    }
  }, [imagePay]);
  function handlestep(e) {
    e.preventDefault();
    if (imagePay !== null) {
      setStep(false);
    } else {
      toast.warning('Please select a payment method');
    }
  }

  useEffect(() => {
    if (image1) {
      if (image1.size > 1031517) {
        toast.error('The file size is more than 1mb');
        setimage1(null);
      }
    }
  }, [image1]);

  function setPreviwImage() {
    const reader = new FileReader();
    reader.onloadend = function () {
      setpreview(reader.result);
    };
    reader.readAsDataURL(image);
  }
  function setPreviwImagePay() {
    const reader = new FileReader();
    reader.onloadend = function () {
      setpreviewPay(reader.result);
    };
    reader.readAsDataURL(imagePay);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (String(nationalCode).length != 10) {
      return toast.error('کد ملی اشتباه است');
    }

    if (!isValid) {
      return;
    }

    if (bio && image && nationalCode && imagePay) {
      const formdata = new FormData();

      formdata.append('payment', imagePay, imagePay?.name);
      formdata.append('logo', image, image?.name);
      formdata.append('bio', bio);
      formdata.append('nationalCode', nationalCode);

      await httpReauest('POST', '/supplier/profile', formdata, {
        'x-access-token': baseData?.cookies?.seller?.token,
      })
        .then((e) => {
          toast.success(e.data.message);
          setTimeout(() => {
            router.reload();
          }, 1000);
        })
        .catch((e) => {
          toast.error(e.message);
        });
    } else {
      toast.error('Check All fild');
    }
  }

  const validateNationalId = (nationalId: string) => {
    let id = nationalId.trim();

    // بررسی تعداد ارقام کد ملی
    if (id.length < 8 || id.length > 10) {
      setIsValid(false);
      return;
    }

    // اضافه کردن صفر به سمت چپ
    while (id.length < 10) {
      id = '0' + id;
    }

    // بررسی تکرار ارقام
    if (new Set(id.split('')).size === 1) {
      setIsValid(false);
      return;
    }

    // محاسبه رقم کنترلی
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(id[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let controlDigit = remainder > 1 ? 11 - remainder : remainder;

    // بررسی صحت کد ملی
    setIsValid(parseInt(id[9]) === controlDigit);
  };
  const url = 'https://api.cryptocloud.plus/v2/invoice/create';
  const headers = new Headers({
    Authorization:
      'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTWpNek9UTT0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiJjMjk0OTYzZmIxNGJjOTIzMjEyZWViN2YxM2VlMDY2Y2IwNDZjMTVmYThhYzllNDc4ZTgyMzc1ZGI5ZjI3NGFmIiwiZXhwIjo4ODEyMDY4MzM5Mn0.oUrG2q4Ta7eIPaNCb-nCOVaXxE1BjAcsC9x-u-A7uP0',
    'Content-Type': 'application/json',
  });

  const bodyfirst = {
    shop_id: '2Gt7Ur32pAyo7bgQ',
    amount: 50,
  };

  function getAuth() {
    fetch(url, { method: 'POST', headers, body: JSON.stringify(bodyfirst) })
      .then(async (response) => {
        if (response.ok) {
          const res = await response.json();
          if (res.status == 'success') {
            localStorage.setItem('uuid', res.result.uuid);
            router.push(res.result.link);
          }
        } else {
          return Promise.reject('Auth error');
        }
      })
      .catch((error) => {
        console.error('Fail:', error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid px-1 grid-cols-12   ">
          {step ? (
            <>
              <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
                <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                  {t('pay')} *:
                </Heading>
                <label className="cursor-pointer relative" htmlFor="payment">
                  {previewPay ? (
                    <img
                      src={previewPay ? previewPay : null}
                      className="w-full h-[160px] rounded object-contain"
                    />
                  ) : (
                    <div className="w-full h-[160px] rounded relative border">
                      <FaPlus size={25} className="inset-0 absolute m-auto" />
                    </div>
                  )}
                </label>
                <input
                  onChange={(e) => {
                    setimagePay(e.target.files[0]);
                  }}
                  id="payment"
                  className="hidden"
                  type={'file'}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </span>
              <div className="flex col-span-full lg:col-span-6 justify-center items-center mt-6">
                <button
                  className="bg-blue-500 rounded-2xl px-4 py-2 text-white "
                  onClick={getAuth}
                >
                  {t('crypto-pay')}
                </button>
              </div>
            </>
          ) : (
            <>
              {' '}
              <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
                <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                  {t('t-logo')} *:
                </Heading>
                <label className="cursor-pointer relative" htmlFor="addImage">
                  {preview ? (
                    <img
                      src={preview ? preview : null}
                      className="w-full h-[160px] rounded object-contain"
                    />
                  ) : (
                    <div className="w-full h-[160px] rounded relative border">
                      <FaPlus size={25} className="inset-0 absolute m-auto" />
                    </div>
                  )}
                </label>
                <input
                  onChange={(e) => {
                    setimage(e.target.files[0]);
                  }}
                  id="addImage"
                  className="hidden"
                  type={'file'}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </span>
              <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
                <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                  {t('t-bio')} :
                </Heading>
                <textarea
                  onChange={(e) => {
                    setbio(e.target.value);
                  }}
                  className="shadow h-[160px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </span>
              <span className="col-span-12 sm:col-span-6  my-1 sm:my-2 px-4">
                <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                  {t('t-national-code')} :
                </Heading>
                <input
                  onChange={(e) => {
                    setnationalCode(e.target.value);
                    validateNationalId(e.target.value);
                  }}
                  type="number"
                  className="shadow h-[40px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                {nationalCode && !isValid && (
                  <small className="text-red-500">
                    {t('t-national-code-error')}
                  </small>
                )}
              </span>{' '}
            </>
          )}
        </div>

        <div className="px-5 mt-8">
          {step ? (
            <Button onClick={handlestep}>{t('t-submit')}</Button>
          ) : (
            <Button variant="formButton" type="submit">
              {t('t-submit')}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompleteProfileFormSellerPersonal;
