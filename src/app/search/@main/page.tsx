'use client';

import { Suspense } from '@suspensive/react';

import { 인기검색어, 최근검색어 } from '../components';

export default function SearchMainPage() {
  return (
    <>
      <Suspense.CSROnly>
        <최근검색어 />
      </Suspense.CSROnly>

      <Suspense>
        <인기검색어 />
      </Suspense>
    </>
  );
}
