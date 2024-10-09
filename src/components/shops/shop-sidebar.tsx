import { useState } from 'react';
import Image from 'next/image';
import Text from '@components/ui/text';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';
import Heading from '@components/ui/heading';
import { useTranslation } from 'next-i18next';
import {
  IoLocationOutline,
  IoCallOutline,
  IoGlobeOutline,
} from 'react-icons/io5';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';
import { BsShieldCheck, BsShieldFillCheck } from 'react-icons/bs';
import { BiEnvelope, BiWorld } from 'react-icons/bi';
import { Instagram, Share } from 'iconsax-react';
import ShareModal from '@components/common/modal/share-modal';
import Modal from '@components/common/modal/modal';

interface ShopSidebarProps {
  data: any;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ data }) => {
  const {
    query: { slug },
  } = useRouter();
  const [descriptionState, setDescriptionState] = useState(Boolean(false));
  const shareUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.SHOPS}/${slug}`;
  const { t } = useTranslation('common');
  const descriptionHandel = () => {
    return setDescriptionState(true);
  };
  const [share , setShare] = useState<boolean>(false)
  const [share2 , setShare2] = useState<boolean>(false)
  const imageSrc = `${CDN_BASE_URL}${data?.logo}`;
  const myLoader = () => {
    return `${CDN_BASE_URL}${data?.logo}`;
  };

  return (
    <div className="flex flex-col px-6 pt-10 bg-white rounded shadow w-full">
      <div className='hidden lg:block'>
      {share && (
        <Modal
          open={share}
          onClose={() => setShare(false)}
          variant='center'
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
            <ShareModal desktop url={shareUrl} setShare={setShare}/>
        </Modal>
      )}
      </div>
      <div className='lg:hidden'>
      {share2 && <ShareModal desktop={false} url={shareUrl} setShare={setShare2}/>}
      </div>
    
            

      <div className="w-full px-5 pb-8 text-center border-b border-gray-base sm:px-8 lg:px-0  flex lg:flex-row flex-col gap-5 items-center relative">
        <span onClick={()=>setShare(true)} className='border rounded p-3 absolute left-0 top-0 w-fit h-fit cursor-pointer hidden lg:block'>
          <Share/>
        </span>
        <span onClick={()=>setShare2(true)} className='border rounded p-3 absolute -left-0 -top-0 w-fit h-fit cursor-pointer lg:hidden'>
          <Share/>
        </span>
        <div className="w-32 h-32 ">
          <Image
            loader={myLoader}
            src={imageSrc}
            alt={data?.name}
            width={158}
            height={158}
            className="rounded-full object-contain bg-slate-50"
          />
        </div>
        <div className='flex flex-col items-start '>
        <Heading variant="titleLarge" className=" mb-1.5">
          {data?.name}
        </Heading>
        <Text variant="medium" className='text-left rtl:text-right'>
            {data?.bio}
        </Text>
          {data?.membership === 'Premium' && (
        <div className="flex items-center flex-wrap justify-center text-md -mx-1 pt-4 mt-0.5">
            <div className="flex text-sm items-center text-green-500 font-bold gap-2">
              <BsShieldFillCheck className="text-green-500  " size={25} />{' '}
              {t("supplier-verified")}
            </div>
        </div>
          )}
        </div>
      </div>
      <div className="py-7  border-b">
        {data?.video && (
           <div>
           <Heading className='text-center mb-2' variant='titleLarge'>{t("intro-video")}</Heading>
           <video src={CDN_BASE_URL + data?.video} className='w-full lg:w-2/3 mx-auto rounded' controls/>
         </div>
        )}
       {data?.content && (
        <div className='mt-4' dangerouslySetInnerHTML={{__html:data?.content}}/>
       )}
      </div>
      <div className="py-7 grid lg:grid-cols-2 items-center gap-3">
        
      <a href={'mail:' + data?.email} className="flex items-start">
          <div className="w-10 shrink-0">
            <BiEnvelope className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1 flex items-center gap-2">
            <h4 className=" font-medium text-brand-dark text-15px">
              {t('t-email')}:
            </h4>
            <Text>{data?.email}</Text>
          </div>
        </a>
        <a href={'tel:' + data?.phone} className="flex items-start">
          <div className="w-10 shrink-0">
            <IoCallOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1 flex items-center gap-1">
            <h4 className=" font-medium text-brand-dark text-15px">
              {t('text-phone-number')}:
            </h4>
            <Text>{data?.phone}</Text>
          </div>
        </a>
        {data?.website && (

        <a target='_blank' href={data?.website} className="flex items-start">
          <div className="w-10 shrink-0">
            <BiWorld className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1 flex items-center gap-1">
            <h4 className=" font-medium text-brand-dark text-15px">
              {t('text-website')}:
            </h4>
            <Text>{data?.website}</Text>
          </div>
        </a>
        )}
         {data?.instagram && (

<a target='_blank' href={`https://instagram.com/${data?.instagram}`} className="flex items-start">
  <div className="w-10 shrink-0">
    <Instagram className="text-2xl text-brand-muted text-opacity-60" />
  </div>
  <div className="-mt-1 flex items-center gap-1">
    <h4 className=" font-medium text-brand-dark text-15px">
      {t('footer:link-instagram')}:
    </h4>
    <Text>{data?.instagram}</Text>
  </div>
</a>
)}
      </div>
    </div>
  );
};

export default ShopSidebar;
