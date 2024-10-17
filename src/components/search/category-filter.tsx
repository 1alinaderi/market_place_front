import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useState, useMemo, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { FaCheck } from 'react-icons/fa';
import { useUI } from '@contexts/ui.context';
import { httpReauest } from 'src/api/api';
import { IoCloseOutline } from 'react-icons/io5';
import { SearchContext } from '@contexts/searchContext';

export const CategoryFilter = ({ setProductData, mainMarket, setFilter }) => {
  const { t } = useTranslation('common');
  const [data, setData] = useState([]);
  const [mainCategory, setMainCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [id, setId] = useState('');
  const [subActive, setSubactive] = useState('');

  const { category, setCategory, setsubCategory } = useContext(SearchContext);

  const router = useRouter();
  async function getMainCategory() {
    setLoading(true);
    if (router.pathname === '/free-market') {
      const response = await httpReauest('GET', '/categorys/free', {}, {});
      setData(response.data.data);
    } else {
      const response = await httpReauest('GET', '/categorys', {}, {});
      setMainCategory(response.data.data);
      if (category) {
        const id = category;
        getQueryData(id, response.data.data);
      }
    }

    setLoading(false);
  }

  async function getQueryData(id, data) {
    if (router.pathname === '/free-market') {
      const response = await httpReauest(
        'GET',
        `/prouduct/free?category=${id}`,
        {},
        {}
      );
      setProductData(response.data.data);
      setId(id);

      const subItems = data?.subCategorys;
      const sub = subItems.filter((i) => i.category === id);
      setSelected(sub);
    } else {
      const response = await httpReauest(
        'GET',
        `/prouduct?category=${id}`,
        {},
        {}
      );
      setProductData(response.data.data);
      setId(id);

      const subItems = data?.subCategorys;
      const sub = subItems.filter((i) => i.category === id);
      setSelected(sub);
    }
  }

  useEffect(() => {
    getMainCategory();
  }, []);

  const { displaySidebar, closeSidebar } = useUI();

  // function onClick(name: any) {
  //   const { subcategory, ...restQuery } = query;
  //   let currentFormState = selectedSubCategories.includes(name)
  //     ? selectedSubCategories.filter((i) => i !== name)
  //     : [...selectedSubCategories, name];
  //   router.push(
  //     {
  //       pathname,
  //       query: {
  //         ...restQuery,
  //         ...(!!currentFormState.length
  //           ? { subcategory: currentFormState.join(',') }
  //           : {}),
  //       },
  //     },
  //     undefined,
  //     { scroll: false }
  //   );

  //   displaySidebar && closeSidebar();
  // }

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }

  return (
    <div className="block bg-white">
      <div className="flex justify-between items-center ">
        <Heading className="mb-5 -mt-1">{t('text-categories')}</Heading>{' '}
        <button onClick={() => setFilter(false)} className="mb-4 lg:hidden">
          <IoCloseOutline size={30} />
        </button>
      </div>

      <div className="max-h-full overflow-hidden rounded border border-border-base">
        <Scrollbar className="w-full ">
          {!loading ? (
            mainMarket ? (
              <CategoryFilterMenu
                items={mainCategory?.categorys}
                subItems={mainCategory?.subCategorys}
                setProductData={setProductData}
                setLoading={setLoading}
                selected={selected}
                setSelected={setSelected}
                id={id}
                setId={setId}
                mainMarket={mainMarket}
                subActive={subActive}
                setSubactive={setSubactive}
                onClose={() => setFilter(false)}
              />
            ) : (
              <CategoryFilterMenu
                selected={selected}
                setSelected={setSelected}
                items={data.categorys}
                subItems={data?.subCategorys}
                setProductData={setProductData}
                setLoading={setLoading}
                id={id}
                setId={setId}
                subActive={subActive}
                setSubactive={setSubactive}
                onClose={() => setFilter(false)}
              />
            )
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
              {t('text-no-results-found')}
            </div>
          )}
        </Scrollbar>
      </div>
    </div>
  );
};
