import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useAllSupplierQuery } from '@framework/product/get-all-supplier';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaClosedCaptioning,
  FaPlus,
  FaPlusCircle,
  FaSubscript,
  FaSubway,
} from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { httpReauest } from 'src/api/api';

const CreateProductForm = ({ baseData }) => {
  const categories = useCategoriesQuery({ limit: 15 });

  const [image, setimage] = useState(null);
  const [preview, setpreview] = useState(null);
  const [name, setname] = useState(null);
  const [bio, setbio] = useState(null);
  const [price, setPrice] = useState(null);
  const [auction, setAuction] = useState(1);
  const [auctionHour, setAuctionHour] = useState(null);
  const [category, setcategory] = useState();
  const [howPay, setHowPay] = useState('once');

  const ref1 = useRef();
  const router = useRouter();

  useEffect(() => {
    if (image) {
      setPreviwImage();
    }
  }, [image]);

  useEffect(() => {
    if (!category && categories.data) {
      setcategory(categories?.data[0]._id);
    }
    setcategory;
  }, [categories]);

  function setPreviwImage() {
    const reader = new FileReader();
    reader.onloadend = function () {
      setpreview(reader.result);
    };
    reader.readAsDataURL(image);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (name && bio && image && price && category) {
      let attributes = [];
      for (let index = 0; index < ref1.current?.children.length - 1; index++) {
        attributes.push(ref1.current?.children[index].value);
      }
      const formData = new FormData();

      formData.append('image', image, image?.name);
      formData.append('name', name);
      formData.append('desc', bio);
      formData.append('price', price);
      formData.append('owner', baseData.cookies.seller?.id);
      formData.append('category', category);
      formData.append('howPay', howPay);

      for (var i = 0; i < attributes.length; i++) {
        formData.append('attributes[]', attributes[i]);
      }
      if (auction != 0) {
        formData.append('auctionHour', auctionHour);
      }

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

  const suppliers = useAllSupplierQuery();

  const [inputArr, setInputArr] = useState([{ type: 'text', id: 1 }]);

  function handleAttribute() {
    setInputArr([...inputArr, { type: 'text', id: inputArr.length + 1 }]);
  }
  function handleDeleteAttribute() {
    const newArr = inputArr.slice(0, inputArr.length - 1);
    setInputArr(newArr);
  }

  return (
    <div>
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
          <span className="col-span-12 sm:col-span-12  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              Desc :
            </Heading>
            <textarea
              onChange={(e) => {
                setbio(e.target.value);
              }}
              className="shadow h-[120px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </span>
          <span className="col-span-12 sm:col-span-12  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              Attributes :
            </Heading>
            <div ref={ref1} className="flex flex-wrap gap-3 justify-between">
              {inputArr.map((item) => {
                return (
                  <input className="shadow h-10 appearance-none border border-slate-300 rounded w-full md:w-[48%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                );
              })}
              <div className="w-full md:w-[48%] md:mb-5 flex">
                <FaPlusCircle
                  onClick={handleAttribute}
                  className="cursor-pointer"
                  size={28}
                />
                {inputArr.length > 1 && (
                  <MdDelete
                    onClick={handleDeleteAttribute}
                    className="cursor-pointer"
                    size={28}
                  />
                )}
              </div>
            </div>
          </span>

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
              On Auction :
            </Heading>
            <select
              onChange={(e) => {
                setAuction(e.target.value);
              }}
              className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </span>

          <span
            className={`col-span-12 sm:col-span-6  my-1 sm:my-3 px-4 ${
              auction == 0 ? 'opacity-10' : 'opacity-100'
            }`}
          >
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              How many hours is the auction? :
            </Heading>
            <input
              type={'number'}
              onChange={(e) => {
                setAuctionHour(e.target.value);
              }}
              className={
                'shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              }
            />
          </span>
          <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              How to pay :
            </Heading>
            <select
              onChange={(e) => {
                setHowPay(e.target.value);
              }}
              className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={'once'}>To be paid at once</option>
              <option value={'installments'}>
                It is possible to pay in installments
              </option>
            </select>
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

export default CreateProductForm;
