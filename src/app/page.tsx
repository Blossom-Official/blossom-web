'use client';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';

import { SvgIcon } from '@/common/components/svg-icon';
import { useOverlay } from '@/common/hooks';

import { Sidebar } from './components';

export default function Home() {
  const overlay = useOverlay();

  return (
    <div className='flex min-h-screen flex-col justify-center p-20'>
      {/* 네비게이션 바 제작 */}
      <button
        type='button'
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Suspense.CSROnly>
              <Sidebar isOpen={isOpen} onClose={close} />
            </Suspense.CSROnly>
          ));
        }}
      >
        <SvgIcon
          aria-labelledby='메뉴 버튼'
          height='22'
          id='menu'
          role='img'
          width='22'
        />
      </button>

      <section className='mb-50 w-full text-white'>
        <p className='text-center'>마음을 피워요</p>
        <h1 className='text-center'>BLOSSOM</h1>
      </section>

      <Link
        className='flex w-full justify-between border border-solid border-white p-10 text-white'
        href='/search'
      >
        검색하기
        <span>화살표 아이콘</span>
      </Link>
    </div>
  );
}
