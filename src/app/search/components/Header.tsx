'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SvgIcon } from '@/common/components/svg-icon';

const Header = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get('q');
  return (
    <header className={clsx('flex p-16', [!!searchText && 'bg-green-200'])}>
      <Link href='/search'>
        <SvgIcon height='24' id='left-arrow' width='24' />
      </Link>
    </header>
  );
};

export default Header;
