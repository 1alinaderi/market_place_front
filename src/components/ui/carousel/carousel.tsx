import { useRef } from 'react';
import 'swiper/css/autoplay';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import {
  Swiper,
  Navigation,
  Autoplay,
  Pagination,
  Grid,
} from '@components/ui/carousel/slider';
import { useRouter } from 'next/router';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
import { EffectFade } from 'swiper';

import 'swiper/css/effect-fade';

type CarouselPropsType = {
  className?: string;
  buttonGroupClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  buttonSize?: 'default' | 'small';
  centeredSlides?: boolean;
  loop?: boolean;
  slidesPerColumn?: number;
  breakpoints?: {} | any;
  pagination?: {} | any;
  navigation?: {} | any;
  autoplay?: {} | any;
  grid?: {} | any;
};

const Carousel: React.FunctionComponent<CarouselPropsType> = ({
  fade,
  children,
  className = '',
  buttonGroupClassName = '',
  prevActivateId = '',
  nextActivateId = '',
  prevButtonClassName = 'ltr:-left-3.5 rtl:-right-3.5 lg:ltr:-left-4 lg:rtl:-right-4 xl:ltr:-left-5 xl:rtl:-right-5',
  nextButtonClassName = 'ltr:-right-3.5 rtl:-left-3.5 lg:ltr:-right-4 lg:rtl:-left-4 xl:ltr:-right-5 xl:rtl:-left-5',
  buttonSize = 'default',
  breakpoints,
  navigation = true,
  pagination = false,
  loop = false,
  grid,
  autoplay,
  ...props
}) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  let nextButtonClasses = cn(
    'w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-brand-light absolute transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none transform shadow-navigation',
    { '3xl:text-2xl': buttonSize === 'default' },
    nextButtonClassName
  );
  let prevButtonClasses = cn(
    'w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-brand-light absolute transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none transform shadow-navigation',
    { '3xl:text-2xl': buttonSize === 'default' },
    prevButtonClassName
  );
  return (
    <div
      className={`carouselWrapper relative ${className} ${
        pagination ? 'dotsCircle' : 'dotsCircleNone'
      }`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid, EffectFade]}
        effect={`${fade ? 'fade' : 'none'}`}
        autoplay={autoplay ? { delay: 3000 } : false}
        breakpoints={breakpoints}
        dir={dir}
        pagination={pagination}
        grid={grid}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!, // Assert non-null
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current!, // Assert non-null
              }
            : {}
        }
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`flex items-center w-full absolute top-2/4 z-10 ${buttonGroupClassName}`}
        >
          {prevActivateId.length > 0 ? (
            <div className={prevButtonClasses} id={prevActivateId}>
              {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
          ) : (
            <div ref={prevRef} className={prevButtonClasses}>
              {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
          )}

          {nextActivateId.length > 0 ? (
            <div className={nextButtonClasses} id={nextActivateId}>
              {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          ) : (
            <div ref={nextRef} className={nextButtonClasses}>
              {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;
