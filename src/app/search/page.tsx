'use client';

import { Suspense } from '@suspensive/react';

import { SearchForm, 인기검색어, 최근검색어 } from './components';

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

