import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import ReviewCard from '@components/cards/review-card';
import ReviewForm from '@components/common/form/review-form';
import Heading from '@components/ui/heading';
import Link from 'next/link';
import Button from '@components/ui/button';

// const data = [
//   {
//     id: 1,
//     rating: 4,
//     title: 'Amazing Service & Packaging',
//     description:
//       'Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing with denim and white kicks for a stylish sporty vibe. Will fit a UK 8-10, model shown Go sporty this summer with this vintage navy and white striped v-neck t-shirt.',
//     author: 'Kavin Dustin',
//   },
//   {
//     id: 2,
//     rating: 5,
//     title: 'Promising Quality & Fast Delivery',
//     description:
//       'Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing with denim and white kicks for a stylish sporty vibe. Will fit a UK 8-10, model shown Go sporty this summer with this vintage navy and white striped v-neck t-shirt.',
//     author: 'Milly Jacsion',
//   },
//   {
//     id: 3,
//     rating: 3,
//     title: 'Late Delivery service',
//     description:
//       'Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing with denim and white kicks for a stylish sporty vibe. Will fit a UK 8-10, model shown Go sporty this summer with this vintage navy and white striped v-neck t-shirt.',
//     author: 'Kavin Dustin',
//   },
// ];

const ProductReviewRating: FC = ({ data, baseData }) => {
  const { t } = useTranslation('common');
  return (
    <div className="lg:flex justify-between">
      <div className="pt-2">
        {data?.length == 0 ? (
          <Heading className="w-full">{t('product-currently')}</Heading>
        ) : (
          data?.map((item, i) => (
            <ReviewCard item={item} key={`review-key-${i}`} />
          ))
        )}
      </div>

      {baseData?.cookies?.user?.id ? (
        <ReviewForm
          baseData={baseData}
          className="lg:w-[500px] xl:w-[540px] 2xl:w-[600px] 3xl:w-[730px] lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-20 3xl:rtl:pr-20 shrink-0 pt-10"
        />
      ) : (
        <div className="lg:w-[500px] xl:w-[540px] 2xl:w-[600px] 3xl:w-[730px]">
          <Heading variant="titleLarge" className="w-full text-center pt-5">
            {t('have-account')}
          </Heading>
          <div className="h-[200px] w-full flex justify-center items-center">
            <Link href={'/signin'}>
              <Button>{t('text-sign-in')}</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviewRating;
