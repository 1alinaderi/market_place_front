import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { CDN_BASE_URL } from "@framework/utils/api-endpoints";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";

const BlogSmallCard = ({data}:any) => {
  const [t] = useTranslation("common")
  return (
    <div className="w-full rounded-[15px] p-[10px] bg-white flex gap-4 border-2 border-[#ffffff]">
      <span>
        <img
          src={CDN_BASE_URL + data?.cover}
          className="lg:min-w-[113px] min-w-[103px] lg:max-w-[113px] max-w-[103px] rounded-[8px] lg:min-h-[112px] min-h-[102px] lg:max-h-[112px] max-h-[102px] object-cover"
        />
      </span>
      <span className=" flex flex-col gap-2 justify-between items-start ">
        <h5 style={{ color: "#000" }} className="leading-7 line-clamp-2 lg:text-[16px] text-[12px]">
          {data?.name}
        </h5>

        <Link
          href={"/news/" + data?.url}
        >
          <button
          className="btn-brand-2 py-2 border-2 border-[#ffbbbb] text-[#000] px-4 text-[14px] flex items-center gap-2 rounded-[16px] font-bold"
          >
          {t("read-more")} <FaArrowLeft size={12}  className="mt-1"/>
          </button>
        </Link>
      </span>
    </div>
  );
};

export default BlogSmallCard;
