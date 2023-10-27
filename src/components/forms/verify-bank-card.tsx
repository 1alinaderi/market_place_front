import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useAllSupplierQuery } from '@framework/product/get-all-supplier';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { httpReauest } from 'src/api/api';

const VerifyCardBank = ({ baseData }) => {
  const [phone, setPhone] = useState<string>();
  const [name, setname] = useState<string>();
  const [cardNumber, setCardNumber] = useState<string>();

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (name && cardNumber) {
      await httpReauest(
        'POST',
        '/user/profile/bankcard',
        { bankCards: { name: name, cardNumber: cardNumber } },
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
              Card Number :
            </Heading>
            <input
              onChange={(e) => {
                setCardNumber(e.target.value);
              }}
              className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </span>
          <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              Name :
            </Heading>
            <input
              onChange={(e) => {
                setname(e.target.value);
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

export default VerifyCardBank;
