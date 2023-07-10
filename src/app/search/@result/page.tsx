'use client';

import { QueryAsyncBoundary } from '@suspensive/react-query';

import { 검색결과 } from '../components';

export default function SearchResultPage() {
  return (
    <>
      <QueryAsyncBoundary.CSROnly
        rejectedFallback={(boundary) => (
          <button onClick={boundary.reset}>Try again</button>
        )}
      >
        <검색결과 />
      </QueryAsyncBoundary.CSROnly>
    </>
  );
}
