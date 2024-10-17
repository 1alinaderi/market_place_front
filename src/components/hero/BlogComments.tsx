import Comment from '@components/common/comment';
import Button from '@components/ui/button';
import { getTiming } from '@utils/getTiming';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaReply } from 'react-icons/fa';
import { FaSquare } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { httpReauest } from 'src/api/api';

const BlogComments = ({
  comments,
  user,
  blog,
}: {
  comments: any;
  user: any;
  blog: string;
}) => {
  const [content, setContent] = useState();
  const { t } = useTranslation('common');
  const router = useRouter();

  async function handleSubmit(e: any, newsId?: string) {
    if (e == 'reply') {
      if (!content) {
        return;
      }

      await httpReauest(
        'POST',
        '/news/comment',
        { userId: user.id, news: blog, content, reply: newsId },
        {}
      ).then(({ data }) => {
        toast.success('Success');
        router.reload();
      });
    } else {
      e.preventDefault();
      if (!content) {
        return;
      }

      await httpReauest(
        'POST',
        '/news/comment',
        { userId: user.id, news: blog, content },
        {}
      ).then(({ data }) => {
        toast.success('Success');
        router.reload();
      });
    }
  }

  return (
    <div className="pt-10 w-full">
      <div className="col-span-2">
        <h3 className="text-[22px] text-[#205398] lg:text-[28px] flex items-center gap-2 ">
          <FaSquare size={12} color="#F37324" /> {t('write-review')}
        </h3>

        <form className="grid  lg:grid-cols-2 gap-5 mt-10 relative ">
          {!user && (
            <span className="absolute left-0 top-0 w-full h-full justify-center items-center bg-[#000]/10 backdrop-blur-sm flex flex-col gap-3 rounded-[8px]">
              <Link href={'/signin'}>
                <Button variant="primary">{t('footer:Sgin-Up')}</Button>
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
            <Button
              variant="primary"
              className="w-full"
              onClick={handleSubmit}
              disabled={user ? false : true}
            >
              {t('send')}
            </Button>
            <button className="btn-brand w-full py-3 text-[22px] rounded-[25px]"></button>
          </span>
        </form>
        <div className="mt-10">
          <h4 className="text-[21px] text-[#43425D] lg:text-[#205398] lg:text-[24px] flex items-center gap-2 ">
            <FaSquare className="hidden lg:inline" size={14} color="#F37324" />{' '}
            {t('comments')} ({comments.length})
          </h4>
          {comments.map((item) => (
            <Comment
              data={item}
              t={t}
              user={user}
              handleSubmit={handleSubmit}
              setContent={setContent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogComments;
