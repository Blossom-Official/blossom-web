'use client';

import Link from 'next/link';

import { SvgIcon } from '@/common/components/svg-icon';

const Header = () => {
  return (
    <header className='absolute top-0 z-[1000] flex w-full justify-between bg-transparent p-16'>
      <div className='flex gap-10 font-lemon-milk text-16 leading-24 text-green-100'>
        <Link href='/'>
          <SvgIcon height='24' id='left-arrow' width='24' />
        </Link>
        CONTENTS
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
