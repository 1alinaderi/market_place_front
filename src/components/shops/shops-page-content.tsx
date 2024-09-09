import VendorCard from '@components/cards/vendor-card';
import { useShopsQuery } from '@framework/shop/get-shops';
import Alert from '@components/ui/alert';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import SupplierCard from '@components/product/product-cards/supllaier-card';
import Container from '@components/ui/container';

const ShopsPageContent: React.FC = ({ admin }) => {
  const { t } = useTranslation('common');
  const { data, error } = useShopsQuery({
    limit: 9,
  });


  if (error) return <Alert message={error?.message} />;

  return (
    <div
      className={`${
        admin
          ? ''
          : 'pt-10  lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 md:px-8 bg-slate-100'
      }`}
    >
        <Container>
        <Heading variant="titleLarge" className="mb-4 lg:mb-6">
          {t('text-all-shops')}
        </Heading>
        <div
          className={`grid ${
            admin
              ? 'md:grid-cols-2 lg:grid-cols-2'
              : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          }  gap-3 md:gap-4 lg:gap-4 xl:gap-4`}
        >
          {data?.shop?.data?.data?.map((item: any) => (
            <SupplierCard key={item.id} product={item} />
          ))}
        </div>
        </Container>
      </div>
  );
};

export default ShopsPageContent;
