import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { CountrysName } from '@utils/countrys';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useAllSupplierQuery } from '@framework/product/get-all-supplier';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { httpReauest } from 'src/api/api';

const CompleteProfileFormBuyerPersonal = ({ baseData }) => {
  const [image, setimage] = useState(null);
  const [preview, setpreview] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [passId, setPassId] = useState(null);
  const [phone, setPhone] = useState(null);

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

  function setPreviwImage() {
    const reader = new FileReader();
    reader.onloadend = function () {
      setpreview(reader.result);
    };
    reader.readAsDataURL(image);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (country && image && city && postalCode && passId && address) {
      const formData = new FormData();

      formData.append('passPhoto', image, image?.name);
      formData.append('country', country);
      formData.append('city', city);
      formData.append('postalCode', postalCode);
      formData.append('passId', passId);
      formData.append('address', address);
      // formData.append('id', baseData?.cookies?.user?.id);

      await httpReauest('POST', '/user/profile/personal', formData, {
        'x-access-token': baseData?.cookies?.user?.token,
      })
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid px-1 grid-cols-12   ">
          <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              Country:
            </Heading>
            <select
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              className="shadow  appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              {CountrysName.data.map((country) => {
                return <option value={country.name}>{country.name}</option>;
              })}
            </select>
          </span>
          <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              City :
            </Heading>
            <input
              onChange={(e) => {
                setCity(e.target.value);
              }}
              className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </span>
          <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              Address :
            </Heading>
            <input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </span>
          <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              Postal Code :
            </Heading>
            <input
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
              className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </span>
          <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              Passport Id or National Id :
            </Heading>
            <input
              onChange={(e) => {
                setPassId(e.target.value);
              }}
              className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </span>

          <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              Passport or Birth certificate :
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
        </div>
        <div className="px-5 mt-8">
          <Button variant="formButton" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfileFormBuyerPersonal;
