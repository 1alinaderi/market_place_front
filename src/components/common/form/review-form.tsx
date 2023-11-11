import { useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/form/text-area';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import cn from 'classnames';
import StarRatingComponent from 'react-star-rating-component';
import StarIcon from '@components/icons/star-icon';
import { httpReauest } from 'src/api/api';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface ReviewFormProps {
  className?: string;
  baseData?: any;
}
interface ReviewFormValues {
  name: string;
  email: string;
  cookie: string;
  message: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  className = '',
  baseData,
}) => {
  const { t } = useTranslation();
  const { query , reload } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>();
  const [rating_custom_icon, set_rating_custom_icon] = useState(1);
  async function onSubmit(values: ReviewFormValues) {
    console.log(values, rating_custom_icon, 'review');

    await httpReauest(
      'POST',
      '/prouduct/review/' + query.slug,
      { content: values.message, rate: rating_custom_icon },
      { 'x-access-token': baseData.cookies.user.token }
    )
      .then(() => {
        toast.success('SuccessFull');
        reload()
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }
  const onStarClickCustomIcon = (
    nextValue: number,
    prevValue: number,
    name: string
  ) => {
    console.log(
      'name: %s, nextValue: %s, prevValue: %s',
      name,
      nextValue,
      prevValue
    );
    set_rating_custom_icon(nextValue);
  };
  return (
    <div className={cn(className)}>
      <Heading className="mb-2">Write your review</Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto mt-5 lg:mt-7 xl:mt-9"
        noValidate
      >
        <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
          <div className="pb-1.5 flex items-center">
            <label className="block text-sm leading-none cursor-pointer shrink-0 text-brand-dark md:text-15px ltr:pr-3 rtl:pl-3">
              {t('forms:label-your-rating')}
            </label>
            <StarRatingComponent
              name="app3"
              starCount={5}
              value={rating_custom_icon}
              onStarClick={onStarClickCustomIcon}
              starColor="#F3B81F"
              emptyStarColor="#DFE6ED"
              renderStarIcon={() => (
                <StarIcon className="w-3.5 lg:w-4 h-3.5 lg:h-4" />
              )}
            />
          </div>

          <TextArea
            variant="solid"
            label="forms:label-message-star"
            {...register('message', { required: 'Message is required' })}
            error={errors.message?.message}
          />

          <div className="pt-1">
            <Button
              type="submit"
              className="w-full h-12 text-sm md:mt-1 lg:text-base sm:w-auto"
            >
              {t('common:button-submit')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
