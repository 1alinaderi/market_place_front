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

  async function handleSubmit(e) {
    e.preventDefault();
    if (country && city && address && postalCode) {
      const formData = new FormData();

      formData.append('country', country);
      formData.append('postalCode', postalCode);
      formData.append('city', city);
      formData.append('address', address);
      // formData.append('id', baseData?.cookies?.user?.id);

      await httpReauest(
        'POST',
        '/user/profile',
        { country, postalCode, city, address },
        {
          'x-access-token': baseData?.cookies?.user?.token,
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
