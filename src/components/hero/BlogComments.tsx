
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useState } from "react";
import { FaSquare } from "react-icons/fa6";
import { toast } from "react-toastify";
import { httpReauest } from "src/api/api";

const BlogComments = ({ comments, user, blog }:{comments:any , user:any ,blog:string }) => {
  const [content, setContent] = useState();
  const { t } = useTranslation('common');

  async function handleSubmit(e:any) {
    e.preventDefault();
    if (!content) {
      return;
    }

    await httpReauest(
      "POST",
      "/news/comment",
      { userId: user._id, blog, content },
      {}
    ).then(({ data }) => {
      toast.success("Success");
    });
  }

  return (
    <div className="pt-10 w-full">
      <div className="col-span-2">
        <h3 className="text-[22px] text-[#205398] lg:text-[28px] flex items-center gap-2 ">
          <FaSquare size={12} color="#F37324" /> {t("write-review")}
        </h3>

        <form className="grid  lg:grid-cols-2 gap-5 mt-10 relative ">
          {!user && (
            <span className="absolute left-0 top-0 w-full h-full justify-center items-center bg-[#000]/10 backdrop-blur-sm flex flex-col gap-3 rounded-[8px]">
           
              <Link
                href={"/signin"}
                
              > 
                 <Button variant="primary" >
                {t("footer:Sgin-Up")}
                </Button>
              </Link>
            </span>
          )}

          <span className="col-span-full">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              className="bg-[#F7F9FC] rounded-[8px] p-3 h-[200px] w-full mt-2 border border-[#E4EAF0]"
            />
          </span>
          <span className="col-span-full">
            <Button variant="primary" className="w-full" onClick={handleSubmit}  disabled={user ? false : true}>
            {t("send")}
            </Button>
            <button
              className="btn-brand w-full py-3 text-[22px] rounded-[25px]"
            >
            </button>
          </span>
        </form>
        <div className="mt-10">
          <h4 className="text-[21px] text-[#43425D] lg:text-[#205398] lg:text-[24px] flex items-center gap-2 ">
            <FaSquare className="hidden lg:inline" size={14} color="#F37324" />{" "}
            {t("comments")} ({comments.length})
          </h4>
          {comments.map((item) => (
            <div className="py-8 border-b">
              <h5 className="text-[14px] lg:text-[16px]">
                {item.userId?.f_name} {item.userId?.l_name}
              </h5>
              <div className="text-[#858597] mt-2 mb-4 text-[13px] lg:text-[15px]">
                {/* {Shamsi.format("DDD dd MMM yyyy ", new Date(item.createdAt))} */}
                <span className="text-black">|</span> ساعت{" "}
                {/* {Shamsi.format("hh:mm", new Date(item.createdAt))} */}
              </div>
              <p className="text-[#43425D] text-[16px] lg:text-[18px]">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogComments;
