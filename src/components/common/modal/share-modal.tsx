import React, { useState } from "react";
import {
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";
import copy from "clipboard-copy";
import { Instagram } from "iconsax-react";
import { BiEnvelope } from "react-icons/bi";
import { FaTelegramPlane } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const   ShareModal = ({ url, setShare,  desktop }:{url : string , setShare : any , desktop : boolean}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (desktop) {
    return (
      <div className="p-5 bg-white rounded lg:min-w-[450px] ">
        <div>
          <h2 className="text-[20px] font-bold">اشتراک گذاری</h2>
        </div>
        <div dir="ltr" className="flex gap-2 items-center w-full">
            <input value={url} className="rounded border h-[42px] px-2 w-full"/>
          <button
            onClick={() => {
              setCopied(true);
              copy(url);
            }}
            className="border rounded font-bold px-3 py-2 my-4 whitespace-nowrap"
          >
            {" "}
            {copied ? "کپی شد!" : "کپی لینک"}
          </button>
        </div>
        <div className="grid grid-cols-4 pt-5 gap-6">
          <a
            href="https://www.instagram.com/direct/inbox/"
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center flex-col"
          >
            <Instagram  />
            <p >اینستاگرام</p>
          </a>
          <TelegramShareButton
            url={url}
            className="flex justify-center items-center flex-col"
          >
            <FaTelegramPlane size={25}  />
            <p>تلگرام</p>
          </TelegramShareButton>
          <WhatsappShareButton
            url={url}
            className="flex justify-center items-center flex-col"
          >
            <FaWhatsapp  size={25} />
            <p>واتساپ</p>
          </WhatsappShareButton>
        
          <EmailShareButton
            url={url}
            className="flex justify-center items-center flex-col"
          >
            <BiEnvelope   size={25}/>
            <p>ایمیل</p>
          </EmailShareButton>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        onClick={() => {
          setShare(false);
        }}
        className="fixed top-0 left-0 h-full w-full bg-[#00000070] z-30"
      ></div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-5 rounded-t-[10px] z-40 text-[14px]">
        <div>
          <h2 className="text-[20px] font-[700]">اشتراک گذاری</h2>
        </div>
        <div dir="ltr" className="flex gap-2 items-center w-full">
            <input value={url} className="rounded border h-[42px] px-2 w-full"/>
          <button
            onClick={() => {
              setCopied(true);
              copy(url);
            }}
            className="border rounded font-bold px-3 py-2 my-4 whitespace-nowrap"
          >
            {" "}
            {copied ? "کپی شد!" : "کپی لینک"}
          </button>
        </div>
        <div className="grid grid-cols-4 pt-5 gap-6">
          <a
            href="https://www.instagram.com/direct/inbox/"
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center flex-col"
          >
            <Instagram  />
            <p >اینستاگرام</p>
          </a>
          <TelegramShareButton
            url={url}
            className="flex justify-center items-center flex-col"
          >
            <FaTelegramPlane size={25}  />
            <p>تلگرام</p>
          </TelegramShareButton>
          <WhatsappShareButton
            url={url}
            className="flex justify-center items-center flex-col"
          >
            <FaWhatsapp  size={25} />
            <p>واتساپ</p>
          </WhatsappShareButton>
        
          <EmailShareButton
            url={url}
            className="flex justify-center items-center flex-col"
          >
            <BiEnvelope   size={25}/>
            <p>ایمیل</p>
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
