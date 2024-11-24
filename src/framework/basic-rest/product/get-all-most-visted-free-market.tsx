import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchMostVistedFreeMarketProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(
    `${API_ENDPOINTS.FREEMARKET}?sort=-vist&limit=15`
  );
  return data.data.allProduct as Product[];
};
export const useMostVistedFreeMarketProductsQuery = (
  options: QueryOptionsType
) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.FREEMARKET, options],
    fetchMostVistedFreeMarketProducts
  );
};
