import { CDN_BASE_URL } from "@/config";
import { httpReauest } from "@/utils/httprequest";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BlogImages2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    await httpReauest("GET", "/blog/slider", {}, {}).then((res) => {
      if (res.data.data.blogs) {
        setData(res.data.data.blogs);
      }
    });
    setLoading(false);
  }
  if (data?.length > 6) {
    return (
      <div className="grid lg:grid-cols-2 gap-10 w-full  py-10 lg:pl-0 lg:pb-0 lg:mb-0 pb-5 mb-5">
        <Link
          href={"/blogs/" + data[6].url}
          className="relative hidden lg:block rounded-[10px] overflow-hidden "
        >
          <img
            src={CDN_BASE_URL + data[6].cover}
            className="w-full h-full object-cover"
          />
          <span
            style={{
              background:
                "linear-gradient(180deg, rgba(5, 15, 44, 0) 0%, #050F2C 100%)",
            }}
            className="absolute bottom-0 left-0 h-[55%] w-full"
          ></span>
          <h5 className="lg:text-[20px] text-[14px] absolute bottom-[0] py-4  px-5 right-[0] text-white">
            {data[6].name}
          </h5>
        </Link>
        <span className="grid gap-5 lg:gap-10 lg:grid-cols-2 lg:grid-rows-2">
          {data?.slice(7, window.innerWidth > 992 ? 11 : 9)?.map((item) => (
            <Link
              href={"/blogs/" + item.url}
              className="relative  rounded-[10px] overflow-hidden  lg:min-w-0 "
            >
              <img
                src={CDN_BASE_URL + item.cover}
                className="w-full h-full object-cover max-w-none"
              />
              <span
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5, 15, 44, 0) 0%, #050F2C 100%)",
                }}
                className="absolute bottom-0 left-0 h-[55%] w-full"
              ></span>
              <h5
                href={"/"}
                className="lg:text-[20px] text-[14px] absolute bottom-[0] py-4  px-5 right-[0] text-white"
              >
                {item.name}
              </h5>
            </Link>
          ))}
        </span>
      </div>
    );
  }
};

export default BlogImages2;
