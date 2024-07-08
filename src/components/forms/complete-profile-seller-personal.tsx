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

  const [bio, setbio] = useState(null);
  const [nationalCode, setnationalCode] = useState(null);

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (String(nationalCode).length != 10) {
      return toast.error("کد ملی اشتباه است")
    }

    if (bio && image &&nationalCode ) {
      const formdata = new FormData();

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid px-1 grid-cols-12   ">
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
              }}
              type='number'
              className="shadow h-[40px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </span>
          
        </div>

        <div className="px-5 mt-8">
          <Button variant="formButton" type="submit">
            {t('t-submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfileFormSellerPersonal;
