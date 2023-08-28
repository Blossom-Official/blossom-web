'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import { SvgIcon } from '@/common/components/svg-icon';

const Header = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get('q');
  const router = useRouter();

  return (
    <header className={clsx('flex p-16', [!!searchText && 'bg-green-200'])}>
      <button type='button' onClick={() => router.back()}>
        <SvgIcon height='24' id='left-arrow' width='24' />
      </button>
    </header>
  );
};

export default Header;
