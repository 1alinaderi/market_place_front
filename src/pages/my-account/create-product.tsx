import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import AccountDetailsAdmin from '@components/my-account-admin/account-details';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import AccountOrdersAdmin from '@components/my-account-admin/account-orders-admin';
import Heading from '@components/ui/heading';
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '@components/ui/button';
import { httpReauest } from 'src/api/api';
import { toast } from 'react-toastify';
import { getCategories } from '@utils/get-categories';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useAllSupplierQuery } from '@framework/product/get-all-supplier';
import { useRouter } from 'next/router';

export default function AccountDetailsPage({ baseData }) {
  const categories = useCategoriesQuery({ limit: 15 });
  const suppliers = useAllSupplierQuery();

  const [image, setimage] = useState(null);
  const [preview, setpreview] = useState(null);
  const [name, setname] = useState(null);
  const [bio, setbio] = useState(null);
  const [price, setPrice] = useState(null);
  const [specialprice, setspecialPrice] = useState(null);
  const [owner, setowner] = useState(null);
  const [balance, setbalance] = useState(null);
  const [category, setcategory] = useState(null);
  const [data, setData] = useState(null);

  const router = useRouter();

  async function getSellerData(id: any) {
    const { data } = await httpReauest('GET', '/supplier/' + id, {}, {});

    setData(data.data);
  }

  useEffect(() => {
    if (image) {
      setPreviwImage();
    }
  }, [image]);

  useEffect(() => {
    if (!baseData.cookies.seller?.id) {
      router.push(`${window.location.origin}/sign`);
    } else {
      getSellerData(baseData.cookies.seller?.id);
    }
  }, [router.pathname]);

  function setPreviwImage() {
    const reader = new FileReader();
    reader.onloadend = function () {
      setpreview(reader.result);
    };
    reader.readAsDataURL(image);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!category) {
      await setcategory(categories?.data[0]?._id);
    }
    if (name && bio && image && price && balance) {
      const formData = new FormData();

      formData.append('image', image, image?.name);
      formData.append('name', name);
      formData.append('desc', bio);
      formData.append('price', price);
      formData.append('owner', baseData?.cookies?.seller?.id);
      if (specialprice) {
        formData.append('specialPrice', specialprice);
      }
      formData.append('balance', balance);
      formData.append('category', category);

      await httpReauest('POST', '/prouduct/create', formData, {
        'x-access-token': baseData?.cookies?.seller?.token,
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
    <>
      <Seo
        title="Account Settings"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/account-settings"
      />
      <AccountLayout isSeller={baseData?.cookies?.seller?.id ? true : false} baseData={baseData}>
        <form onSubmit={handleSubmit}>
          <div className="grid px-1 grid-cols-12   ">
            <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                Name:
              </Heading>
              <input
                onChange={(e) => {
                  setname(e.target.value);
                }}
                className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </span>
            <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                Price :
              </Heading>
              <input
                type={'number'}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </span>
            <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                Desc :
              </Heading>
              <textarea
                onChange={(e) => {
                  setbio(e.target.value);
                }}
                className="shadow h-[160px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </span>
            <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                Image :
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
              />
            </span>

            {data?.membership === 'Premium' && (
              <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
                <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                  Special Price ?:
                </Heading>
                <input
                  type={'number'}
                  onChange={(e) => {
                    setspecialPrice(e.target.value);
                  }}
                  className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </span>
            )}

            <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                Category :
              </Heading>
              <select
                onChange={(e) => {
                  setcategory(e.target.value);
                }}
                className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              >
                {categories?.data?.map((category) => {
                  return <option value={category._id}>{category.name}</option>;
                })}
              </select>
            </span>
            <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                Balance :
              </Heading>
              <input
                onChange={(e) => {
                  setbalance(e.target.value);
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
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = Layout;

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
