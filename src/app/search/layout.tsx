'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

import { Header } from './components';

export default function SearchLayout({
  children,
  main,
  result,
}: {
  children: ReactNode;
  main: ReactNode;
  result: ReactNode;
}) {
  const searchParams = useSearchParams();
  const isResultPage = !!searchParams.get('q');

  return (
    <>
      <section className='flex h-full min-h-[100dvh] flex-col'>
        <Header />
        {children}
        {isResultPage ? result : main}
      </section>
    </>
  );
}
