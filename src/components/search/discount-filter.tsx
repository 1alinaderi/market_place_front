import React from 'react';
import { httpReauest } from 'src/api/api';
import { useState } from 'react';
import { ImFire } from 'react-icons/im';
import { IoCloseOutline } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';

const DiscountFilters = ({ setProductData, setLoading, setFilter }) => {
  const discounts = [5, 15, 25, 50, 75];
  const { t } = useTranslation('common');
  const [active, setActive] = useState();
  async function handleFilter(d) {
    setLoading(true);
    if (active === d) {
      setActive(null);
      const response = await httpReauest('GET', `/prouduct/discount`, {}, {});
      setProductData(response.data.data);
    } else {
      const response = await httpReauest(
        'GET',
        `/prouduct/discount?percent=${d}`,
        {},
        {}
      );
      setProductData(response.data.data);
      setActive(d);
    }
    setLoading(false);
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="flex justify-start items-center gap-1 mb-4">
          <h2 className="text-black  text-xl ">{t("discount-filter")} </h2>
          <ImFire color="#e6532f" size={25} />
        </span>
        <button onClick={() => setFilter(false)} className="mb-4 lg:hidden">
          <IoCloseOutline size={30} />
        </button>
      </div>
      <div className="flex flex-col border-[1px] border-slate-400/20 rounded ">
        {discounts.map((d) => (
          <span
            onClick={() => handleFilter(d)}
            className="border-[1px] cursor-pointer border-slate-400/20 py-2 px-3 flex justify-between items-center"
          >
            <p> {t("discount-more")} {d}%</p>
            <span
              className={`h-4 w-4 border-2 active:bg-slate-300 rounded-full border-slate-300 ${
                d === active ? 'bg-slate-300' : 'bg-none'
              }`}
            ></span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DiscountFilters;
