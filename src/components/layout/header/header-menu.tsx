import Link from '@components/ui/link';
import { FaAngleLeft, FaAngleRight, FaChevronDown } from 'react-icons/fa';
import ListMenu from '@components/ui/list-menu';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Building, Building3 } from 'iconsax-react';
import CartIcon from '@components/icons/cart-icon';
import { BiCircle } from 'react-icons/bi';

interface MenuProps {
  data: any;
  className?: string;
  row: boolean;
  categorys: any;
  freeCategorys: any;
}

const HeaderMenu: React.FC<MenuProps> = ({
  data,
  className,
  row,
  categorys,
  freeCategorys,
}) => {
  const { t } = useTranslation('menu');
  const router = useRouter();
  const [selected, setSelected] = useState<string>();
  const [notshow, setnotshow] = useState<boolean>();
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [subCategory, setsubCategory] = useState<any>();

  useEffect(() => {
    if (selected == 'free') {
      if (freeCategorys.subCategorys) {
        const findedData = freeCategorys.subCategorys.filter(
          (item: any) => item.category == selectedCategory?._id
        );
        setsubCategory(findedData);
      }
    } else {
      if (categorys.subCategorys) {
        const findedData = categorys.subCategorys.filter(
          (item: any) => item.category == selectedCategory?._id
        );
        setsubCategory(findedData);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory && categorys.categorys) {
      setSelectedCategory(categorys?.categorys[0]);
    }
  }, [categorys]);

  return (
    <nav className={cn('headerMenu flex w-full  ', className)}>
      <div className=" py-3 cursor-pointer menuItem group xl:mx-4">
        <Link
          href={'/products'}
          className="relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-light group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
        >
          {t('text-categories')}
          <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-light opacity-80 group-hover:text-brand">
            <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
          </span>
        </Link>
        <div
          onClick={()=>{
            setnotshow(true)
            setTimeout(() => {
            setnotshow(false)
            }, 1000);
          }}
          style={notshow ? {visibility  : "hidden" , opacity : 0} : {}}
          className={` absolute z-[9] px-4 md:px-6 lg:px-8 2xl:px-10 opacity-0 py-3 subMenu h-[70vh] shadow-dropDown transition-all w-full duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0  group-hover:opacity-100`}
        >
          <div className="  relative h-full flex ">
            <span className="flex flex-col rtl:border-l w-[20%] text-black ltr:border-r pl-2  h-full overflow-y-scroll relative overflow-x-visible">
              <Link href={`/sustainable-arch`}>
              <span
                onMouseEnter={() => setSelected('sustainable')}
                className={`${
                  selected != 'free' && 'bg-gray-200'
                } w-full p-3 flex items-center gap-2 hover:bg-gray-200 duration-200 hover:font-bold`}
              >
                <Building3 />
                  {t('common:sustainable')} {t('common:arch-and-art')}
            
              </span>
              </Link>
              <Link href={'/free-market'}>
              <span
                onMouseEnter={() => setSelected('free')}
                className={`${
                  selected == 'free' && 'bg-gray-200'
                } w-full p-3  hover:bg-gray-200 duration-200 hover:font-bold flex items-center gap-2`}
              >
                <CartIcon />
              {t('common:free-market')}
              </span>
            </Link>
            </span>
            <span className="flex flex-col rtl:border-l w-[20%] text-black ltr:border-r pl-2  h-full overflow-y-scroll relative overflow-x-visible">
              {selected === 'free'
                ? freeCategorys.categorys?.map((item: any) => (
                    <span
                      onMouseEnter={() => setSelectedCategory(item)}
                      className={`${
                        selectedCategory?._id == item._id && 'bg-gray-200'
                      } w-full  hover:bg-gray-200 duration-200 hover:font-bold`}
                    >
                      <Link href={'/free-market/' + item?.url} className='w-full block p-3' >
                        {router.locale == 'en'
                          ? item.name_en
                          : router.locale == 'ar'
                          ? item.name_ar
                          : item.name}
                      </Link>
                    </span>
                  ))
                : categorys.categorys?.map((item: any) => (
                    <span
                      onMouseEnter={() => setSelectedCategory(item)}
                      className={`${
                        selectedCategory?._id == item._id && 'bg-gray-200'
                      } w-full  hover:bg-gray-200 duration-200 hover:font-bold`}
                    >
                      <Link href={'/sustainable-arch/' + item?.url} className='w-full block p-3' >
                        {router.locale == 'en'
                          ? item.name_en
                          : router.locale == 'ar'
                          ? item.name_ar
                          : item.name}
                      </Link>
                    </span>
                  ))}
            </span>
            <span className="flex flex-wrap gap-3 px-3 rtl:border-l w-[60%] h-fit text-black ltr:border-r pl-2  overflow-y-scroll relative overflow-x-visible">
              {selectedCategory && (
                <div className="w-full mb-4">
                  <Link
                    href={`/${
                      selected == 'free' ? 'free-market' : 'sustainable-arch'
                    }/${selectedCategory?.url}`}
                  >
                    <span className="col-span-full flex items-center gap-2 font-bold px-4  w-full">
                      {router.locale == 'en'
                        ? selectedCategory.name_en
                        : router.locale == 'ar'
                        ? selectedCategory.name_ar
                        : selectedCategory.name}{' '}
                      {router.locale == 'en' ? (
                        <FaAngleRight />
                      ) : (
                        <FaAngleLeft />
                      )}
                    </span>
                  </Link>
                </div>
              )}
              {subCategory?.map((item: any) => (
                <Link
                  href={`/${
                    selected == 'free' ? 'free-market' : 'sustainable-arch'
                  }/${selectedCategory?.url}/${item?.url}`}
                >
                  <span className="bg-slate-100 px-4 py-3 shadow rounded-md flex items-center gap-1 cursor-pointer hover:text-red-500">
                    {router.locale == 'en'
                      ? item.name_en
                      : router.locale == 'ar'
                      ? item.name_ar
                      : item.name}
                    {router.locale == 'en' ? <FaAngleRight /> : <FaAngleLeft />}
                  </span>
                </Link>
              ))}
            </span>
          </div>
        </div>
      </div>
      {data?.map((item: any) => (
        <div
          className="relative py-3 mx-1 cursor-pointer menuItem group xl:mx-4"
          key={item.id}
        >
          <Link
            href={item.path}
            className="relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-light group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
          >
            {t(item.label)}
            {(item?.columns || item.subMenu) && (
              <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-light opacity-80 group-hover:text-brand">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

          {item?.subMenu && Array.isArray(item?.subMenu) && (
            <div
              className={`absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0   ${
                item.row ? 'w-[630px] xl:w-[700px]' : 'w-[220px] xl:w-[240px]'
              }  group-hover:opacity-100`}
            >
              <ul
                className={`py-5 text-sm text-brand-muted ${
                  item.row ? 'flex flex-wrap col-span-12' : ''
                } `}
              >
                {item.subMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;
                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                      row={item.row ? true : false}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
