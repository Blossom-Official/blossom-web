'use client';

import { Suspense } from '@suspensive/react';

import { SearchForm, 최근검색어 } from './components';

export default function SearchPage() {
  return (
    <>
      <SearchForm />

      <Suspense.CSROnly>
        <최근검색어 />
      </Suspense.CSROnly>

      <Suspense>
        <인기검색어 />
      </Suspense>
    </>
  );
}

/**
 * TODO
 * 인기검색어 API 추가
 */
const 인기검색어 = () => {
  return (
    <section className='flex flex-col p-[1.5rem]'>
      <h3 className='text-[1.2rem] font-medium leading-[2.4rem] text-white'>
        인기 검색어
      </h3>
      <p className='text-[1.2rem] font-light leading-[2.4rem] text-green-100'></p>
    </section>
  );
};
