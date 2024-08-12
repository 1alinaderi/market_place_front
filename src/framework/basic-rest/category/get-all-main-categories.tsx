import { CategoriesQueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchMainCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.CATEGORIESMAIN);
  return data;
};
export const useMainCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery([API_ENDPOINTS.CATEGORIES, options], fetchMainCategories);
};
