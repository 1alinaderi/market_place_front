import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchRelatedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  if (queryKey[1].freeMarket) {
    
    const { data } = await http.get(`${API_ENDPOINTS.RELATED_PRODUCTS_FREE}?category=${queryKey[1].category}&limit=${queryKey[1].limit}`);
    return data.data?.allProduct;
  }else {
    const { data } = await http.get(`${API_ENDPOINTS.RELATED_PRODUCTS}?category=${queryKey[1].category}&limit=${queryKey[1].limit}`);
    return data.data?.allProduct;
  }
};
export const useRelatedProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.RELATED_PRODUCTS, options],
    fetchRelatedProducts
  );
};
