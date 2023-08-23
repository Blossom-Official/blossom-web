'use client';

import Link from 'next/link';

import { SvgIcon } from '@/common/components/svg-icon';
import { useCopyToClipboard } from '@/common/hooks';

const Header = () => {
  const [, copy] = useCopyToClipboard();

  return (
    <header className='absolute top-0 z-[1000] flex w-full justify-between bg-transparent p-16'>
      <div className=''>
        <Link href='/'>
          <SvgIcon height='24' id='left-arrow' width='24' />
        </Link>
      </div>
      <button type='button' onClick={() => copy(location.href)}>
        <SvgIcon height='24' id='share' width='24' />
      </button>
    </header>
  );
};

export default Header;
