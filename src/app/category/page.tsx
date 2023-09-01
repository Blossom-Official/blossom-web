import { Suspense } from '@suspensive/react';

import { Loading } from '@/common/components/loading';

import { Category, FlowerList, Header } from './components';

const CategoryPage = () => {
  return (
    <>
      <Header />
      <Category />
      <Suspense
        fallback={
          <div className='mx-auto mt-20 h-50 w-50'>
            <Loading />
          </div>
        }
      >
        <FlowerList />
      </Suspense>
    </>
  );
};

export default CategoryPage;
