import { CDN_BASE_URL } from "@framework/utils/api-endpoints";
import { getTiming } from "@utils/getTiming";
import { Calendar, Heart, Share } from "iconsax-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

const BlogCard = ({ data } : {data:any}) => {
  const { t } = useTranslation('common');

  const now = new Date();
  const newTime = now.getTime() - new Date(data.createdAt).getTime();
  const hour = newTime / 86400000;

  return (
    <Link
      href={"/news/" + data?.url}
    >
    <div       
      className="p-2 border-2 border-[#CFDFF6] rounded-[15px] min-w-[250px] bg-white block hover:border-[#fff] duration-200 hover:shadow-md cursor-pointer"
      style={{ boxShadow: "0px 4px 16px 0px #1122110D" }}>
      <span className="relative">
        <img
          src={CDN_BASE_URL + data?.cover}
          className="rounded-[10px] object-cover w-full h-[160px] lg:h-[230px]"
        />
        <span className="absolute right-0 bottom-0  flex p-2.5 gap-3.5 items-center">
          <button className="bg-[#fff]/70 rounded-full p-2">
            <Heart color="#F37324" size={18} />
          </button>
          <button className="bg-[#fff]/70 rounded-full p-2">
            <Share color="#F37324" size={18} />
          </button>
        </span>
      </span>
      <div className="my-[12px] px-1">
        <p className="text-[#073B70]  text-[10px] flex items-center gap-2 ">
          <Calendar size={18} />
          {getTiming(hour , t)}
        </p>
        <h5 className="mb-[8px] mt-[4px] text-[#002147] text-[16px] lg:text-[16px] font-bold">
          {data?.name}
        </h5>
          <p className="text-[#7E8AAB] text-[13px] leading-7 line-clamp-2">
            {data?.desc}
          </p>
      </div>
        </div>
    </Link>
  );
};

export default BlogCard;
