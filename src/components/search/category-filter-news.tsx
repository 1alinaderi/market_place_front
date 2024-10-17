import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCheck } from 'react-icons/fa';
import { useUI } from '@contexts/ui.context';
import { httpReauest } from 'src/api/api';
import { IoCloseOutline } from 'react-icons/io5';

export const CategoryFilterNews = ({ setProductData, setFilter }: any) => {
  const { t } = useTranslation('common');
  const [data, setData] = useState([]);
  const [mainCategory, setMainCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [id, setId] = useState('');
  const [subActive, setSubactive] = useState('');

  const router = useRouter();
  async function getMainCategory() {
    setLoading(true);
    const response = await httpReauest('GET', '/categorys/news', {}, {});
    setMainCategory(response.data.data);

    setLoading(false);
  }

  useEffect(() => {
    getMainCategory();
  }, [router.query.category]);

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
      <div className="hidden lg:block">
        <div className="w-72 mt-8 px-2">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 bg-white">
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
              <CategoryFilterMenu
                items={mainCategory?.categorys}
                subItems={mainCategory?.subCategorys}
                setProductData={setProductData}
                setLoading={setLoading}
                selected={selected}
                setSelected={setSelected}
                id={id}
                setId={setId}
                news
                subActive={subActive}
                setSubactive={setSubactive}
              />
            ) : (
              <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
                {t('text-no-results-found')}
              </div>
            )}
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};
