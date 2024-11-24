import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import SustainableMobile from './sustainable-mobile';
import FreeMarketMobile from './free-market-mobile';
import DiscountedMobile from './discounted-mobile';

const LandingMobile = () => {
  const [t] = useTranslation('common');
  const [selected, setSelected] = useState<string>('sustainable');
  return (
    <div className="px-4">
      <div className="border-b flex gap-4 overflow-x-scroll text-black">
        <span
          onClick={() => setSelected('sustainable')}
          className={`${
            selected === 'sustainable' && 'border-b-2 border-black font-bold'
          } py-4 whitespace-nowrap`}
        >
          {t('common:sustainable')} {t('common:arch-and-art')}
        </span>
        <span
          onClick={() => setSelected('free-market')}
          className={`${
            selected === 'free-market' && 'border-b-2 border-black font-bold'
          } py-4 whitespace-nowrap`}
        >
          {t('free-market')}
        </span>
        <span
          onClick={() => setSelected('discount')}
          className={`${
            selected === 'discount' && 'border-b-2 border-black font-bold'
          } py-4 whitespace-nowrap`}
        >
          {t('discount')}
        </span>
      </div>
      <div className="py-6">
        {selected === 'sustainable' ? (
          <SustainableMobile />
        ) : selected === 'free-market' ? (
          <FreeMarketMobile />
        ) : (
          <DiscountedMobile />
        )}
      </div>
    </div>
  );
};

export default LandingMobile;
