import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { getTiming } from '@utils/getTiming';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaReply } from 'react-icons/fa';

const Comment = ({ data, t, user, handleSubmit, setContent, replay }: any) => {
  const [show, setshow] = useState<boolean>(false);

  const now = new Date();
  const newTime = now.getTime() - new Date(data.createdAt).getTime();
  const hour = newTime / 86400000;
  return (
    <>
      <div className="py-8 border-b relative">
        <h5 className="text-[14px] lg:text-[16px]">
          {data.user?.name} {replay && `در پاسخ به ${replay.user.name}`}
        </h5>
        <div className="text-[#858597] mt-2 mb-4 text-[13px] lg:text-[15px]">
          {getTiming(hour, t)}
          {/* {Shamsi.format("hh:mm", new Date(data.createdAt))} */}
        </div>
        <p className="text-[#43425D] text-[16px] lg:text-[18px]">
          {data.content}
        </p>
        {user && !replay && (
          <FaReply
            onClick={() => setshow(true)}
            className="absolute ltr:right-4 rtl:left-4 bottom-4 cursor-pointer"
          />
        )}

        {show && (
          <form className="grid  lg:grid-cols-2 gap-5 mt-10 relative ">
            <Heading>ریپلای به {data.user?.name}</Heading>

            <span className="col-span-full">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                className="bg-[#F7F9FC] rounded-[8px] p-3 h-[200px] w-full mt-2 border border-[#E4EAF0]"
              />
            </span>
            <span className="col-span-full">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => handleSubmit('reply', data._id)}
              >
                {t('send')}
              </Button>
              <button className="btn-brand w-full py-3 text-[22px] rounded-[25px]"></button>
            </span>
          </form>
        )}
      </div>
      <div className="ltr:ml-[16px] rtl:mr-[16px] ltr:pl-[16px] rtl:pr-[16px] bg-slate-100">
        {data?.replays?.map((item) => (
          <Comment
            replay={data}
            data={item}
            t={t}
            user={user}
            handleSubmit={handleSubmit}
            setContent={setContent}
          />
        ))}
      </div>
    </>
  );
};

export default Comment;
