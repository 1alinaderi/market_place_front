import { CategoryFilter } from './category-filter';
import { BrandFilter } from './brand-filter';
import { FilteredItem } from './filtered-item';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { DietaryFilter } from '@components/search/dietary-filter';
import Heading from '@components/ui/heading';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { httpReauest } from 'src/api/api';
import Link from 'next/link';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export const ShopFilters: React.FC = ({
  setProductData,
  mainMarket,
  setFilter,
}: any) => {
  const router = useRouter();
  const [data, setData] = useState<any>();

  async function getData() {
    const res = await httpReauest('GET', '/categorys/free', {}, {});
    setData(res.data.data.categorys);
  }
  useEffect(() => {
    getData();
  }, []);
  const { pathname, query } = router;
  const { t } = useTranslation('common');
  return (
    <div className=" bg-white">
      <div className="flex justify-between items-center mb-5">
        <Heading className="">{t('text-categories')}</Heading>{' '}
        <button onClick={() => setFilter(false)} className="mb-4 lg:hidden">
          <IoCloseOutline size={30} />
        </button>
      </div>
      <div className="border rounded">
        {data?.map((item: any) => (
          <Link href={`/free-market/${item.url}`}>
            <div className="flex justify-between gap-2 items-center p-3 cursor-pointer hover:bg-slate-100 duration-200">
              {router.locale == 'en'
                ? item?.name_en
                : router.locale == 'ar'
                ? item?.name_ar
                : item?.name}
              {router.locale == 'en' ? <FaAngleRight /> : <FaAngleLeft />}
            </div>
          </Link>
        ))}
      </div>
      {/* {!isEmpty(query) && (
        <div className="block -mb-3">
          <div className="flex items-center justify-between mb-4 -mt-1">
            <Heading>{t('text-filters')}</Heading>
            <button
              className="flex-shrink transition duration-150 ease-in text-13px focus:outline-none hover:text-brand-dark"
              aria-label={t('text-clear-all')}
              onClick={() => {
                router.push(pathname);
              }}
            >
              {t('text-clear-all')}
            </button>
          </div>
          <div className="flex flex-wrap -m-1">
            {Object.values(query)
              .join(',')
              .split(',')
              .map(
                (v, idx) =>
                  !isEmpty(v) && (
                    <FilteredItem
                      itemKey={
                        Object.keys(query).find((k) => query[k]?.includes(v))!
                      }
                      itemValue={v}
                      key={idx}
                    />
                  )
              )}
          </div>
        </div>
      )} */}

      {/* <CategoryFilter
        setProductData={setProductData}
        mainMarket={mainMarket}
        setFilter={setFilter}
      /> */}
      {/* <DietaryFilter />
      <BrandFilter /> */}
    </div>
  );
};
