import BlogCard from "@components/cards/blog-card";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSquare } from "react-icons/fa";
import { httpReauest } from "src/api/api";

const BlogBestSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    await httpReauest("GET", "/news/popular", {}, {}).then((res) => {
      if (res.data.data) {
        setData(res.data.data);
      }
    });
    setLoading(false);
  }
  return (
    <div >
      <p className="justify-center flex gap-2 items-center text-[#7E8AAB] text-[12px] lg:text-[14px]">
          <FaSquare size={12} color="#F37324" />
          {t("news-popular-text")}
        </p>
        <h2 className="text-center text-[#205398] text-[24px] lg:text-[34px] font-bold mt-1">
          {t("news-popular-title")}
        </h2>
        <div className="mt-6 pb-6  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading ? (
              Array(4).fill("").map(()=><ProductCardLoader />)
          ) : (
            data.map((item) => <BlogCard data={item} />)
          )}
        </div>
    </div>
  );
};

export default BlogBestSection;
