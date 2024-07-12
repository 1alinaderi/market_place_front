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

export const CategoryFilter = () => {
  const { t } = useTranslation('common');
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });

  const [subCategory, setSubcategory] = useState();

  const router = useRouter();

  const { query, pathname } = router;

  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(',') : []),
    [query?.category]
  );

  const selectedSubCategories = useMemo(
    () => (query?.subcategory ? (query.subcategory as string).split(',') : []),
    [query?.subcategory]
  );

  const { displaySidebar, closeSidebar } = useUI();

  function onClick(name: any) {
    const { subcategory, ...restQuery } = query;
    let currentFormState = selectedSubCategories.includes(name)
      ? selectedSubCategories.filter((i) => i !== name)
      : [...selectedSubCategories, name];
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { subcategory: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );

    displaySidebar && closeSidebar();
  }
console.log(data)
  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }
  if (error) return <Alert message={error?.message} />;

  return (
    <div className="block">
      <>
        
      </>
      <Heading className="mb-5 -mt-1">{t('text-categories')}</Heading>

      <div className="max-h-full overflow-hidden rounded border border-border-base">
        <Scrollbar className="w-full ">
          {!loading ? (
            <CategoryFilterMenu items={data.categorys} />
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
