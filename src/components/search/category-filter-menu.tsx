import { useRouter } from 'next/router';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useContext, useEffect, useMemo, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import { httpReauest } from 'src/api/api';
import { SearchContext } from '@contexts/searchContext';

function checkIsActive(arr: any, item: string, subItems: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}

function CategoryFilterMenuItem({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  subItems,
  depth = 0,
  setProductData,
  setLoading,
  selected,
  setSelected,
  id,
  setId,
  mainMarket,
  setSubactive,
  subActive,
  news,
  onClose,
}: any) {
  const { t } = useTranslation('common');
  const [idrouter, setIdrouter] = useState('');

  const { category, setCategory, setsubCategory } = useContext(SearchContext);

  const router = useRouter();
  useEffect(() => {
    if (router.query.category) {
      setIdrouter(router.query.category);
    }
  }, [router.query.category]);
  const { pathname, query } = router;
  // const [selected, setSelected] = useState([]);

  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(',') : []),
    [query?.category]
  );
  const isActive =
    checkIsActive(selectedCategories, item.slug) ||
    item?.children?.some((_item: any) =>
      checkIsActive(selectedCategories, _item.slug)
    );
  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [subItemAction, setSubItemAction] = useState<boolean>(false);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { slug, name, children: items, icon, _id, name_en, name_ar } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  const handleChange = () => {
    setSubItemAction(!subItemAction);
  };

  async function onClick() {
    // setLoading(true);
    if (mainMarket) {
      if (id === _id) {
        setSelected([]);
        const response = await httpReauest('GET', '/prouduct', {}, {});
        setProductData(response.data.data);
        setId('');
      } else {
        setSelected([]);
        setId(_id);
        const sub = subItems.filter((i) => i.category === _id);
        setSelected(sub);
        const response = await httpReauest(
          'GET',
          `/prouduct?category=${_id}`,
          {},
          {}
        );
        setProductData(response.data.data);
      }
    } else if (news) {
      if (id === _id) {
        setSelected([]);
        const response = await httpReauest('GET', '/news', {}, {});
        setProductData(response.data.data);
        setId('');
      } else {
        setSelected([]);
        setId(_id);
        const sub = subItems.filter((i) => i.category === _id);
        setSelected(sub);
        const response = await httpReauest(
          'GET',
          `/news?category=${_id}`,
          {},
          {}
        );
        setProductData(response.data.data);
      }
    } else {
      if (id === _id) {
        setSelected([]);
        const response = await httpReauest('GET', '/prouduct/free', {}, {});
        setProductData(response.data.data);
        setId('');
        setCategory(null);
      } else {
        setSelected([]);
        setId(_id);
        const sub = subItems.filter((i) => i.category === _id);
        setSelected(sub);
        setCategory(_id);
      }
    }

    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    }
    // setLoading(false);
  }
  async function handleSubcategory(e) {
    // setLoading(true);
    if (mainMarket) {
      if (subActive === e.name) {
        setSubactive('');
        const response = await httpReauest(
          'GET',
          `/prouduct?category=${_id}`,
          {},
          {}
        );
        setProductData(response.data.data);
      } else {
        const response = await httpReauest(
          'GET',
          `/prouduct?category=${_id}&subCategory=${e._id}`,
          {},
          {}
        );
        setSubactive(e.name);
        setProductData(response.data.data);
      }
    } else if (news) {
      if (subActive === e.name) {
        setSubactive('');
        const response = await httpReauest(
          'GET',
          `/news?category=${_id}`,
          {},
          {}
        );
        setProductData(response.data.data);
      } else {
        const response = await httpReauest(
          'GET',
          `/news?category=${_id}&subCategory=${e._id}`,
          {},
          {}
        );
        setSubactive(e.name);
        setProductData(response.data.data);
      }
    } else {
      if (subActive === e.name) {
        setSubactive('a');
        const response = await httpReauest(
          'GET',
          `/prouduct/free?category=${_id}`
        );
        setProductData(response.data.data);
        setsubCategory(null);
      } else {
        setsubCategory(e._id);
        // const response = await httpReauest(
        //   'GET',
        //   `/prouduct/free?category=${_id}&subCategory=${e._id}`
        // );
        setSubactive(e.name);
        // setProductData(response.data.data);
      }
    }
    // setLoading(false);
  }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          `flex justify-between items-center transition text-sm md:text-15px ${
            id === _id ? 'bg-slate-300' : 'bg-none'
          }`,
          { 'bg-fill-base': isOpen },
          className
        )}
      >
        <button
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group',
            { 'py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3': depth > 0 }
          )}
          // onClick={handleChange}
        >
          <span className="text-brand-dark capitalize py-0.5">
            {router.locale === 'en' && name_en} {router.locale === 'fa' && name}{' '}
            {router.locale === 'ar' && name_ar}
          </span>
          <span
            className={`w-[22px] h-[22px] text-13px flex items-center justify-center rounded-full  ltr:ml-auto rtl:mr-auto transition duration-500 ease-in-out group-hover:border-yellow-100 text-brand-light `}
          >
            <FaChevronDown
              color={`${
                selectedCategories.includes(name) ? 'orange' : '#5555'
              }`}
            />
          </span>

          {/* {selected !== 'undefined' && (<span>{selected.map((e)=>(e.name))}</span>) } */}
          {/* {depth > 0 && (
            <span
              className={`w-[22px] h-[22px] text-13px flex items-center justify-center border-2 border-border-four rounded-full ltr:ml-auto rtl:mr-auto transition duration-500 ease-in-out group-hover:border-yellow-100 text-brand-light ${
                selectedCategories.includes(slug) &&
                'border-yellow-100 bg-yellow-100'
              }`}
            >
              {selectedCategories.includes(slug) && <FaCheck />}
            </span>
          )} */}
        </button>
      </li>

      {Array.isArray(items) && isOpen ? (
        <li>
          <ul key="content" className="px-4 text-xs">
            {items?.map((currentItem: any) => {
              const childDepth = depth + 1;
              return (
                <CategoryFilterMenuItem
                  key={`${currentItem.name}${currentItem.slug}`}
                  item={currentItem}
                  depth={childDepth}
                  className="px-0 border-t border-border-base first:border-t-0 mx-[3px] bg-transparent"
                />
              );
            })}
          </ul>
        </li>
      ) : null}
      <div
        className={`${
          id === _id ? 'max-h-[1000px] ' : ' max-h-[0px] '
        } overflow-hidden duration-300  `}
      >
        {selected?.map((e) => (
          <div
            onClick={() => {
              handleSubcategory(e);
              onClose();
            }}
            className="flex justify-between items-center py-2  px-5  text-slate-500 border-[1px] border-slate-50  hover:bg-slate-100"
          >
            <button className=" mx-3">
              {router.locale === 'en' && e?.name_en}{' '}
              {router.locale === 'fa' && e?.name}{' '}
              {router.locale === 'ar' && e?.name_ar}
            </button>
            <span
              className={`${
                subActive === e.name ? 'bg-slate-300 ' : 'bg-none'
              } h-4 w-4 border-2  rounded-full border-slate-300`}
            ></span>
          </div>
        ))}
      </div>
    </>
  );
}

function CategoryFilterMenu({
  items,
  className,
  subItems,
  setProductData,
  setLoading,
  selected,
  setSelected,
  id,
  setId,
  mainMarket,
  routerActive,
  subActive,
  setSubactive,
  news,
  onClose,
}: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItem
          key={items._id}
          item={item}
          subItems={subItems}
          setProductData={setProductData}
          setLoading={setLoading}
          selected={selected}
          setSelected={setSelected}
          id={id}
          setId={setId}
          mainMarket={mainMarket}
          routerActive={routerActive}
          subActive={subActive}
          setSubactive={setSubactive}
          news={news}
          onClose={onClose}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;
