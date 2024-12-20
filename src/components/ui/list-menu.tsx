import { useTranslation } from 'next-i18next';
import { IoIosArrowForward } from 'react-icons/io';
import Link from '@components/ui/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SearchContext } from '@contexts/searchContext';

const ListMenu = ({ dept, data, hasSubMenu, menuIndex, row }: any) => {
  const { t } = useTranslation('menu');
  const { setCategory } = useContext(SearchContext);
  const router = useRouter();

  function handleRoute() {
    setCategory(data?._id);
    router.push(data.path ? data.path : `/products`);
  }
  return (
    <li className={`relative ${row && 'w-1/3'} `}>
      <span
        onClick={handleRoute}
        className="flex items-center justify-between py-2 ltr:pl-5 rtl:pr-5 xl:ltr:pl-7 xl:rtl:pr-7 ltr:pr-3 rtl:pl-3 xl:ltr:pr-3.5 xl:rtl:pl-3.5 hover:bg-fill-dropdown-hover hover:text-brand-dark"
      >
        {data.label
          ? t(data.label)
          : (router.locale === 'fa' && data.name) ||
            (router.locale === 'en' && data.name_en) ||
            (router.locale === 'ar' && data.name_ar)}
        {data.subMenu && (
          <span className="text-sm mt-0.5 shrink-0">
            <IoIosArrowForward className="transition duration-300 ease-in-out text-body group-hover:text-brand-dark" />
          </span>
        )}
      </span>
      {hasSubMenu && (
        <SubMenu dept={dept} data={data.subMenu} menuIndex={menuIndex} />
      )}
    </li>
  );
};

const SubMenu: React.FC<any> = ({ dept, data, menuIndex }) => {
  dept = dept + 1;
  return (
    <ul className="absolute z-0 invisible w-56 py-3 transition-all duration-300 opacity-0 subMenuChild shadow-subMenu bg-brand-light ltr:right-full rtl:left-full 2xl:ltr:right-auto 2xl:rtl:left-auto 2xl:ltr:left-full 2xl:rtl:right-full top-4">
      {data?.map((menu: any, index: number) => {
        const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
        return (
          <ListMenu
            dept={dept}
            data={menu}
            hasSubMenu={menu.subMenu}
            menuName={menuName}
            key={menuName}
            menuIndex={index}
          />
        );
      })}
    </ul>
  );
};

export default ListMenu;
