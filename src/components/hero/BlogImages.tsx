import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { httpReauest } from 'src/api/api';

const BlogImages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    await httpReauest('GET', '/news/slider', {}, {}).then((res) => {
      if (res.data.data) {
        setData(res.data.data);
      }
    });
    setLoading(false);
  }
  return (
    <div className="grid lg:grid-cols-12 gap-3 w-full   lg:pl-0 lg:pb-0 lg:mb-0 pb-5 mb-5">
      {loading ? (
        <></>
      ) : (
        <>
          {data.length > 0 && (
            <Link href={'/news/' + data[0]?.url}>
              <div className="relative  lg:col-span-5 rounded-[10px] overflow-hidden cursor-pointer h-[195px] lg:h-[260px] lg:min-w-0">
                <img
                  src={CDN_BASE_URL + data[0]?.cover}
                  className="w-full h-full object-cover max-w-none"
                />
                <span
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5, 15, 44, 0) 0%, #050F2C 100%)',
                  }}
                  className="absolute bottom-0 left-0 h-[55%] w-full"
                ></span>
                <h5 className="lg:text-[18px] text-[14px] absolute bottom-[0] py-4  px-5 right-[0] text-white">
                  {data[0]?.name}
                </h5>
              </div>
            </Link>
          )}

          {data.length > 1 && (
            <Link href={'/news/' + data[1]?.url}>
              <div className="relative  lg:col-span-3 rounded-[10px] overflow-hidden cursor-pointer h-[195px] lg:h-[260px] lg:min-w-0">
                <img
                  src={CDN_BASE_URL + data[1]?.cover}
                  className="w-full h-full object-cover max-w-none"
                />
                <span
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5, 15, 44, 0) 0%, #050F2C 100%)',
                  }}
                  className="absolute bottom-0 left-0 h-[55%] w-full"
                ></span>
                <h5 className="lg:text-[18px] text-[14px] absolute bottom-[0] py-4  px-5 right-[0] text-white">
                  {data[1]?.name}
                </h5>
              </div>
            </Link>
          )}
          {data.length > 2 && (
            <Link href={'/news/' + data[2]?.url}>
              <div className="relative  lg:col-span-4 rounded-[10px] overflow-hidden cursor-pointer h-[195px] lg:h-[260px] lg:min-w-0">
                <img
                  src={CDN_BASE_URL + data[2]?.cover}
                  className="w-full h-full object-cover max-w-none"
                />
                <span
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5, 15, 44, 0) 0%, #050F2C 100%)',
                  }}
                  className="absolute bottom-0 left-0 h-[55%] w-full"
                ></span>
                <h5 className="lg:text-[18px] text-[14px] absolute bottom-[0] py-4  px-5 right-[0] text-white">
                  {data[2]?.name}
                </h5>
              </div>
            </Link>
          )}
          {data.length > 3 && (
            <Link href={'/news/' + data[3]?.url}>
              <div className="relative  lg:col-span-3 rounded-[10px] overflow-hidden cursor-pointer h-[195px] lg:h-[260px] lg:min-w-0">
                <img
                  src={CDN_BASE_URL + data[3]?.cover}
                  className="w-full h-full object-cover max-w-none"
                />
                <span
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5, 15, 44, 0) 0%, #050F2C 100%)',
                  }}
                  className="absolute bottom-0 left-0 h-[55%] w-full"
                ></span>
                <h5 className="lg:text-[18px] text-[14px] absolute bottom-[0] py-4  px-5 right-[0] text-white">
                  {data[3]?.name}
                </h5>
              </div>
            </Link>
          )}
          {data.length > 4 && (
            <Link href={'/news/' + data[4]?.url}>
              <div className="relative  lg:col-span-3 rounded-[10px] overflow-hidden cursor-pointer h-[195px] lg:h-[260px] lg:min-w-0 hidden lg:block ">
                <img
                  src={CDN_BASE_URL + data[4]?.cover}
                  className="w-full h-full object-cover max-w-none"
                />
                <span
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5, 15, 44, 0) 0%, #050F2C 100%)',
                  }}
                  className="absolute bottom-0 left-0 h-[55%] w-full"
                ></span>
                <h5 className="lg:text-[18px] text-[14px] absolute bottom-[0] py-4  px-5 right-[0] text-white">
                  {data[4]?.name}
                </h5>
              </div>
            </Link>
          )}
          {data.length > 5 && (
            <Link href={'/news/' + data[5]?.url}>
              <div className="relative  lg:col-span-6 rounded-[10px] overflow-hidden cursor-pointer h-[195px] lg:h-[260px] lg:min-w-0 hidden lg:block ">
                <img
                  src={CDN_BASE_URL + data[5]?.cover}
                  className="w-full h-full object-cover max-w-none"
                />
                <span
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5, 15, 44, 0) 0%, #050F2C 100%)',
                  }}
                  className="absolute bottom-0 left-0 h-[55%] w-full"
                ></span>
                <h5 className="lg:text-[18px] text-[14px] absolute bottom-[0] py-4  px-5 right-[0] text-white">
                  {data[5]?.name}
                </h5>
              </div>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default BlogImages;
