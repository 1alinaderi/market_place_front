import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { httpReauest } from 'src/api/api';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';
import Loading from '@components/common/Loading';

const CompleteOtherInfoSeller = ({ baseData, t, data }: any) => {
  const [image, setimage] = useState(null);
  const [video, setvideo] = useState(null);
  const [image1, setimage1] = useState(null);
  const [preview, setpreview] = useState(
    data?.coverImage ? CDN_BASE_URL + data?.coverImage : null
  );
  const [previewVideo, setpreviewVideo] = useState(
    data?.video ? CDN_BASE_URL + data?.video : null
  );
  const [previewPay, setpreviewPay] = useState(null);
  const [imagePay, setimagePay] = useState(null);
  const [loading, setloading] = useState<boolean>(false);
  const [nationalCode, setnationalCode] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [step, setStep] = useState(true);
  const [text, settext] = useState<string>(data?.content);
  const [instagram, setinstagram] = useState<string>(data?.instagram);
  const [website, setwebsite] = useState<string>(data?.website);

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
    if (video) {
      if (video.size > 10031517) {
        toast.error('The file size is more than 10mb');
        setvideo(null);
      } else {
        setPreviwVideo();
      }
    }
  }, [video]);

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
  function setPreviwVideo() {
    const reader = new FileReader();
    reader.onloadend = function () {
      setpreviewVideo(reader.result);
    };
    reader.readAsDataURL(video);
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
    setloading(true);

    const formdata = new FormData();
    if (image) {
      formdata.append('cover', image, image?.name);
    }
    if (video) {
      formdata.append('video', video, video?.name);
    }
    if (instagram) {
      formdata.append('instagram', instagram);
    }
    if (website) {
      formdata.append('website', website);
    }
    if (text) {
      formdata.append('text', text);
    }

    await httpReauest('POST', '/supplier/more-info', formdata, {
      'x-access-token': baseData?.cookies?.seller?.token,
    })
      .then((e) => {
        toast.success(e.data.message);
        setloading(false);
        setTimeout(() => {
          router.reload();
        }, 1000);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setloading(false);
      });
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
          <span className="col-span-12 sm:col-span-6  my-1 sm:my-2 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              {t('footer:link-instagram')} :
            </Heading>
            <input
              onChange={(e) => {
                setinstagram(e.target.value);
              }}
              value={instagram}
              type="text"
              className="shadow h-[40px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </span>
          <span className="col-span-12 sm:col-span-6  my-1 sm:my-2 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              {t('text-website')} :
            </Heading>
            <input
              onChange={(e) => {
                setwebsite(e.target.value);
              }}
              value={website}
              type="text"
              className="shadow h-[40px] appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </span>
          <span className="col-span-12 sm:col-span-12  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              {t('cover')} :
            </Heading>
            <label className="cursor-pointer relative" htmlFor="addImage">
              {preview ? (
                <img
                  src={preview ? preview : null}
                  className="w-full h-[130px] lg:h-[160px] rounded object-cover"
                />
              ) : (
                <div className="w-full h-[130px] lg:h-[160px] rounded relative border">
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
              {t('intro-video')} :{' '}
              {previewVideo && (
                <FaTrash
                  className="text-red-500"
                  onClick={() => {
                    setvideo(null);
                    setpreviewVideo(null);
                  }}
                />
              )}
            </Heading>
            <label className="cursor-pointer relative" htmlFor="addIVideo">
              {previewVideo ? (
                <video
                  src={previewVideo ? previewVideo : null}
                  controls
                  className="w-full h-[140px] lg:h-[170px] rounded object-contain"
                />
              ) : (
                <div className="w-full h-[140px] lg:h-[170px] rounded relative border">
                  <FaPlus size={25} className="inset-0 absolute m-auto" />
                </div>
              )}
            </label>
            <input
              onChange={(e) => {
                setvideo(e.target.files[0]);
              }}
              id="addIVideo"
              className="hidden"
              type={'file'}
              accept="video/*"
            />
          </span>
          <span className="col-span-12 sm:col-span-12  my-1 sm:my-3 px-4">
            <Heading className="mr-2 pb-2 whitespace-nowrap" variant="base">
              {t('more-info')} :
            </Heading>

            <ReactQuill
              value={text}
              modules={{
                toolbar: [
                  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                  ['blockquote', 'code-block'],
                  ['link', 'image', 'video', 'formula'],

                  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

                  [{ align: [] }],
                ],
              }}
              onChange={(value) => settext(value)}
            />
          </span>
        </div>

        <div className="px-5 mt-6">
          {loading ? (
            <Loading />
          ) : (
            <Button type="submit">{t('t-submit')}</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompleteOtherInfoSeller;
