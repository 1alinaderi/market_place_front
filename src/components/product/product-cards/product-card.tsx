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
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
  adminId?: any;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { t } = useTranslation('common');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        <PlusIcon width={iconSize} height={iconSize} opacity="1" />
      </button>
    );
  }
  return <AddToCart data={data} />;
}
const ProductCard: React.FC<ProductProps> = ({
  product,
  className,
  adminId,
}) => {
  const {
    name,
    image,
    desc,
    specialPrice,
    _id,
    desc_en,
    desc_ar,
    name_en,
    name_ar,
  } = product ?? {};
  const imageSrc = image
    ? `${CDN_BASE_URL}${image}`
    : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
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

  async function handleDelete(e: any, id: any) {
    await e.stopPropagation();
    await httpReauest(
      'DELETE',
      '/prouduct/' + id,
      {},
      { 'x-access-token': adminId }
    )
      .then((data) => {
        toast.success(data.message);
        router.reload();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <Link href={`/products/${product?.url}`}>
      <article
        className={cn(
          'flex flex-col group overflow-hidden  cursor-pointer transition-all duration-300 lg:min-w-[230px] lg:max-w-[230px] min-w-[150px] max-w-[400px] relative h-full bg-white',
          className
        )}
        title={name}
      >
        <div className="relative shrink-0">
          <div className="flex overflow-hidden lg:min-w-[230px] lg:max-w-[230px] min-w-[150px] max-w-[400px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
            <Image
              loader={myLoader}
              src={imageSrc ?? productPlaceholder}
              alt={name || 'Product Image'}
              width={230}
              height={200}
              quality={100}
              className="object-cover rounded-md"
            />
          </div>
          <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
            {discount && (
              <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                {t('text-on-sale')}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col  pb-5 lg:pb-6 lg:pt-1.5 h-full">
          <h2 className="text-brand-dark text-13px sm:text-sm lg:text-[15px] font-bold leading-5 sm:leading-6 mb-1.5">
            {router.locale === 'fa' && name} {router.locale === 'ar' && name_ar}{' '}
            {router.locale === 'en' && name_en}
          </h2>
          <div className="-mx-1">
            {specialPrice ? (
              <>
                <span className="inline-block mx-1 text-[18px] font-semibold text-brand">
                  ${specialPrice}
                </span>
                <del className="mx-1 text-[18px] text-brand-dark text-opacity-70">
                  {price}
                </del>
              </>
            ) : (
              <span className="inline-block mx-1 text-[18px] font-semibold  text-brand">
                {price}
              </span>
            )}
          </div>
          <div className="mt-1 text-13px sm:text-sm">
            {router.locale === 'fa' && desc?.slice(0, 50)}
            {router.locale === 'en' && desc_en?.slice(0, 50)}
            {router.locale === 'ar' && desc_ar?.slice(0, 50)} ...
          </div>
          {adminId && (
            <div className="w-full flex justify-end pt-2">
              <FaTrash
                onClick={(e) => handleDelete(e, _id)}
                color="red"
                size={20}
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
