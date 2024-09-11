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
      <div className="flex flex-col gap-2 py-7">
        <a  href={"mail:" + data?.email}>
         <div className="flex items-start">
          <div className="w-10 shrink-0">
            <BiEnvelope className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1 flex items-center gap-2">
            <h4 className=" font-medium text-brand-dark text-15px">
              {t('t-email')}:
            </h4>
            <Text>{data?.email}</Text>
          </div>
        </div>
        </a>
        <a  href={"tel:" + data?.phone}>

        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoCallOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1 flex items-center gap-1">
            <h4 className=" font-medium text-brand-dark text-15px">
              {t('text-phone-number')}:
            </h4>
            <Text>{data?.phone}</Text>
          </div>
        </div>
        </a>

        {data?.website && (
        <a target='_blank' href={data?.website}>

          <div className="flex items-start">
            <div className="w-10 shrink-0">
              <BiWorld className="text-2xl text-brand-muted text-opacity-60" />
            </div>
            <div className="-mt-1 flex items-center gap-1">
              <h4 className=" font-medium text-brand-dark text-15px">
                {t('text-website')}:
              </h4>
              <Text>{data?.website}</Text>
            </div>
          </div>
          </a>
          )}
 {data?.instagram && (
        <a target='_blank' href={data?.instagram}>

        <div className="flex items-start">
        <div className="w-10 shrink-0">
        <Instagram className="text-2xl text-brand-muted text-opacity-60" />
        </div>
        <div className="-mt-1 flex items-center gap-1">
        <h4 className=" font-medium text-brand-dark text-15px">
        {t('footer:link-instagram')}:
        </h4>
        <Text>{data?.instagram}</Text>
        </div>
        </div>
        </a>
        )}
      </div>
    </div>
  );
};

export default ShopSidebarSmall;