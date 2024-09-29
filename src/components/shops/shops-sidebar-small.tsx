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
import { Instagram } from 'iconsax-react';
import Link from 'next/link';
import Button from '@components/ui/button';

interface ShopSidebarSmallProps {
  data: any;
}

const ShopSidebarSmall: React.FC<ShopSidebarSmallProps> = ({ data }) => {
  const {
    query: { slug },
  } = useRouter();
  const [descriptionState, setDescriptionState] = useState(Boolean(false));
  const shareUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.SHOPS}/${slug}`;
  const { t } = useTranslation('common');
  const descriptionHandel = () => {
    return setDescriptionState(true);
  };
  const imageSrc = `${CDN_BASE_URL}${data?.logo}`;
  const myLoader = () => {
    return `${CDN_BASE_URL}${data?.logo}`;
  };
  return (
    <div className="flex flex-col px-6 pt-10 lg:pt-14">
      <div className="w-full px-5 pb-8 text-center border-b border-gray-base sm:px-8 lg:px-0 2xl:px-7">
        <div className="w-32 h-32 mx-auto">
          <Image
            loader={myLoader}
            src={imageSrc}
            alt={data?.name}
            width={158}
            height={158}
            className="rounded-xl object-contain"
          />
        </div>
        <Heading variant="titleLarge" className="mt-6 mb-1.5">
          {data?.name}
        </Heading>
        <Text variant="small">
          {descriptionState === true ? (
            data?.bio
          ) : data?.bio?.split(' ').length >= 13 ? (
            <>
              {data?.bio?.split(' ').slice(0, 13).join(' ')}
              {'..'}
              <span
                role="button"
                className="text-brand ltr:ml-0.5 rtl:mr-0.5 font-semibold block hover:text-brand-muted"
                onClick={descriptionHandel}
              >
                {t('text-read-more')}
              </span>
            </>
          ) : (
            data?.bio
          )}
        </Text>
        <div className="flex items-center flex-wrap justify-center text-md -mx-1 pt-4 mt-0.5">
          {data?.membership === 'Premium' && (
            <div className="flex text-sm items-center text-green-500 font-bold">
              <BsShieldFillCheck className="text-green-500 mr-2 " size={25} />{' '}
              This Supplier Verifyed By Website
            </div>
          )}
        </div>
        <Link href={"/suppliers/" + data?.name}>
        <Button variant='formButton'>
          {t("text-see-more")}
        </Button>
        </Link>
      </div>
      <div className="flex py-7 justify-center">
        <a  href={"mail:" + data?.email}>
         <div className="flex items-start justify-center">
          <div className="w-10 shrink-0">
            <BiEnvelope className="text-3xl text-white bg-blue-600 rounded-full p-1 " />
          </div>
        </div>
        </a>
        <a  href={"tel:" + data?.phone}>

        <div className="flex items-start justify-center">
          <div className="w-10 shrink-0">
            <IoCallOutline className="text-3xl text-white bg-green-600 rounded-full p-1" />
          </div>
        </div>
        </a>

        {data?.website && (
        <a target='_blank' href={data?.website}>

          <div className="flex items-start justify-center">
            <div className="w-10 shrink-0">
              <BiWorld className="text-3xl text-white bg-blue-400 rounded-full p-1 " />
            </div>
          </div>
          </a>
          )}
    {data?.instagram && (
        <a target='_blank' href={`https://instagram.com/${data?.instagram}`}>

        <div className="flex items-start justify-center">
        <div className="w-10 shrink-0">
        <Instagram size={32} className="text-3xl text-white bg-red-400 rounded-full p-1 " />
        </div>
        
        </div>
        </a>
        )}
      </div>
    </div>
  );
};

export default ShopSidebarSmall;