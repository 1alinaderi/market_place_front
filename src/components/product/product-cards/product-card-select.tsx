import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import PlusIcon from '@components/icons/plus-icon';
import { useCart } from '@contexts/cart/cart.context';
// import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import { httpReauest } from 'src/api/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


interface ProductProps {
  product: Product;
  className?: string;
  adminId?: any;
  handleAdd?:any
  handleDelete?:any
}

const ProductCardSelect: React.FC<ProductProps> = ({
  product,
  className,
  adminId,
  handleAdd,
  handleDelete
}) => {
  const { name, image, desc, specialPrice, _id,desc_en,desc_ar,name_en,name_ar } = product ?? {};
  const imageSrc = image ? `${CDN_BASE_URL}${image}` : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
  const myLoader = () => {
    return `${CDN_BASE_URL}${image}`;
  };
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'USD',
  });

  const router = useRouter();

 

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
      <article
        className={cn(
          'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full bg-white',
          className
        )}
        title={name}
        onClick={ ()=>!handleDelete && handleAdd(product)}
      >
        <div className="relative shrink-0">
          <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
            {discount && (
              <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                {t('text-on-sale')}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
          <div className="mb-1 lg:mb-1.5 -mx-1">
            {specialPrice ? (
              <>
                <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
                  ${specialPrice}
                </span>
                <del className="mx-1 text-sm text-brand-dark text-opacity-70">
                  {price}
                </del>
              </>
            ) : (
              <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
                {price}
              </span>
            )}
          </div>
          <h2 className="text-brand-dark text-13px sm:text-sm lg:text-[15px] font-bold leading-5 sm:leading-6 mb-1.5">
            {router.locale === 'fa' && name} {router.locale === 'ar' && name_ar} {router.locale === 'en' && name_en}
          </h2>
          <div className="mt-2 text-13px sm:text-sm">
            {router.locale === 'fa' && desc?.slice(0, 50)}{router.locale === 'en' && desc_en?.slice(0, 50)}{router.locale === 'ar' && desc_ar?.slice(0, 50)} ...
          </div>
          {handleDelete && (
            <div className="w-full flex justify-end pt-2">
              <FaTrash
                onClick={(e) => handleDelete(product)}
                color="red"
                size={20}
              />
            </div>
          )}
        </div>
      </article>
  );
};

export default ProductCardSelect;
