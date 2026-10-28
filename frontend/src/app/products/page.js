import { ProductsView } from '@/features/products/products-view';

export const metadata = {
  title: 'Furniture Products',
  description: 'Explore ZXI furniture across seating, tables, storage and display pieces.',
};

export default function ProductsPage() {
  return <ProductsView />;
}
