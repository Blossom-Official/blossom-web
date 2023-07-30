'use client';

import { Suspense } from '@suspensive/react';
import Link from 'next/link';

import { SvgIcon } from '@/common/components/svg-icon';
import { useOverlay } from '@/common/hooks';

import Sidebar from './Sidebar';

const Header = () => {
  const overlay = useOverlay();

  return (
    <header className='fixed top-0 z-[1000] flex w-full justify-between bg-transparent p-16'>
      <div className='flex gap-10 font-lemon-milk text-16 leading-24 text-green-100'>
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
      </div>
      <div>
        <Link href='/search'>
          <SvgIcon height='24' id='search-green-100' width='24' />
        </Link>
      </div>
    </header>
  );
};

export default Header;
