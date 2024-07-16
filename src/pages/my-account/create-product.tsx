import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';

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
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Formik } from 'formik';

export default function AccountDetailsPage({ baseData }) {
  const categoriesData = useCategoriesQuery({ limit: 15 });
  const suppliers = useAllSupplierQuery();
  console.log(categoriesData);

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
  const [firstCategory, setFirstCategory] = useState(null);
  const [subcategory, setsubcategory] = useState(null);
  const [categoryName, setcategoryName] = useState(null);
  const [subcategoryForm, setsubcategoryForm] = useState(null);
  const [previews, setPreview] = useState([]);
  const router = useRouter();
  const [images, setImages] = useState([]);

  async function getSellerData(id: any) {
    const { data } = await httpReauest('GET', '/supplier/' + id, {}, {});

    setData(data.data);
  }

  const { t } = useTranslation('common');

  useEffect(() => {
    if (image) {
      if (image.size > 1031517) {
        toast.error(t('t-size-more-1mb'));
        setimage(null);
      } else {
        setPreviwImage();
      }
    }
  }, [image]);

  useEffect(() => {
    if (!baseData.cookies.seller?.id) {
      router.push(`${window.location.origin}/sign`);
    } else {
      getSellerData(baseData.cookies.seller?.id);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (firstCategory) {
      {
        const c = categoriesData?.data?.subCategorys.filter((e) => {
          return e.category === firstCategory;
        });
        console.log(c);
        setsubcategory(c);
      }
    }
  }, [firstCategory]);

  function setPreviwImage() {
    const reader = new FileReader();
    reader.onloadend = function () {
      setpreview(reader.result);
    };
    reader.readAsDataURL(image);
  }
  function handleImages(e) {
    const fils = e.target.files;
    if (fils) {
      for (let index = 0; index < fils?.length; index++) {
        if (fils[index].size > 1031517) {
          toast.error('حجم فایل باید کمتر از دو مگابایت باشد');
        } else {
          setImages((current) => [...current, fils[index]]);
          setPreviwImages(fils[index]);
        }
      }
    }
  }

  async function setPreviwImages(i) {
    const reader = new FileReader();
    reader.onloadend = function () {
      setPreview((current) => [...current, reader.result]);
    };
    reader.readAsDataURL(i);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // if (!category) {
    //   await setcategory(categoriesData?.data?.categorys?._id);
    // }
    if (name && bio && image && price && category) {
      const formData = new FormData();

      formData.append('image', image, image?.name);
      formData.append('name', name);
      formData.append('desc', bio);
      formData.append('price', price);

      formData.append('subCategory', subcategoryForm);

      formData.append('owner', baseData?.cookies?.seller?.id);
      if (specialprice) {
        formData.append('specialPrice', specialprice);
      }
      // formData.append('balance', balance);
      formData.append('category', category);
      if (images) {
        for (let index = 0; index < images.length; index++) {
          formData.append("images", images[index], images[index]?.name);
        }
      }

      await httpReauest('POST', '/prouduct/free/create', formData, {
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
      toast.error(t('t-check-all-fild'));
    }
    
  }

  return (
    <>
      <Seo
        title="Account Settings"
        description="Welcome to Future Business Hub, your ultimate destination for understanding career paths and professional growth in the export development sector. At WIMEHR platform, we are committed to providing the knowledge and tools necessary for success in both professional and personal life."
        path="my-account/account-settings"
      />
      <AccountLayout
        isSeller={baseData?.cookies?.seller?.id ? true : false}
        baseData={baseData}
      >
        {data?.completeProfile ? (
          <form onSubmit={handleSubmit}>
            <div className="grid px-1 grid-cols-12   ">
              <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
                <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                  {t('t-name')}:
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
                  {t('t-price')} :
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
                  {t('t-desc')} :
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
                  {t('t-image')} :
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

              <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
                <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                  {t('t-special-price')} ?:
                </Heading>
                <input
                  type={'number'}
                  onChange={(e) => {
                    setspecialPrice(e.target.value);
                  }}
                  className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </span>

              <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
                <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                  {t('t-category')} :
                </Heading>
                <select
                  onChange={(e) => {
                    setcategory(e.target.value);
                    setFirstCategory(e.target.value);
                  }}
                  dir="ltr"
                  className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {categoriesData.data?.categorys?.map((category) => {
                    return (
                      <option value={category._id}>{category.name}</option>
                    );
                  })}
                </select>
              </span>

              {firstCategory && subcategory?.length != 1 && (
                <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
                  <Heading
                    className="mr-2 pb-2 whitespace-nowrap"
                    variant="base"
                  >
                    {t('t-category-in')} {categoryName} :
                  </Heading>
                  <select
                    onChange={(e) => setsubcategoryForm(e.target.value)}
                    className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {subcategory?.map((sub) => {
                      return <option value={sub._id}>{sub.name}</option>;
                    })}
                  </select>
                </span>
              )}

              {/* <span className="col-span-12 sm:col-span-6  my-1 sm:my-3 px-4">
              <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
                {t("t-balance")} :
              </Heading>
              <input
                onChange={(e) => {
                  setbalance(e.target.value);
                }}
                className="shadow h-10 appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </span> */}
              <Heading className="col-span-full mx-4 pb-2 mt-4 whitespace-nowrap" variant="base">
                {t('t-image')} :
              </Heading>
              <label
                htmlFor="images"
                className=" col-span-full relative  mx-4  border rounded p-3 min-h-[340px] cursor-pointer appearance-none shadow  border-slate-300"
              >
                {previews?.length > 0 ? (
                  <div
                    className="p-3"
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '15px',
                    }}
                  >
                    <FaPlus className='mt-10'  size={40} />
                    {previews &&
                      previews.map((src) => {
                        return (
                          <img
                            src={src}
                            style={{
                              width: '150px',
                              height: '150px',
                              objectFit: 'contain',
                            }}
                            alt=""
                          />
                        );
                      })}
                    
                  </div>
                ) : (
                  <div className=' absolute top-[45%] left-[45%] '>
                    <FaPlus className="center" size={50} />
                  </div>
                )}
              </label>
              <input
                onChange={(e) => {
                  handleImages(e);
                }}
                type="file"
                className="hidden "
                id="images"
                accept="image/png, image/jpg, image/jpeg"
              />
            </div>
            <div className="px-5 mt-8">
              <Button variant="formButton" type="submit">
                {t('t-submit')}
              </Button>
            </div>
          </form>
        ) : (
          <Link href={'/my-account'}>{t('t-must-complete-profile')}</Link>
        )}
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
