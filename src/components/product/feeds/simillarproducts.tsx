import { useFreshVegetablesProductsQuery } from '@framework/product/get-all-fresh-vegetables-products';
import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';
import { useEffect, useState } from 'react';
import { httpReauest } from 'src/api/api';



export default function Simillarproducts({category} : {category:string}) {
  const [data , setData] = useState()
  const [loading , setLoading] = useState<boolean>(true)
  const [error , setError] = useState()

  async function getData() {
    setLoading(true)
    await httpReauest("GET" , "/products?category=" + category ,{} ,{}).then((res)=>setData(res.data.data))
    setLoading(false)
  }

  useEffect(()=>{
    getData()
  },[])
 
  return (
    <ProductsCarousel
      sectionHeading="text-fresh-vegetables"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={loading}
      error={error}
      limit={LIMITS.FRESH_VEGETABLES_PRODUCTS_LIMITS}
      uniqueKey="fresh-vegetable"
      type={false}
    />
  );
}
