'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Photo } from '@/common/components/photo';
import { SvgIcon } from '@/common/components/svg-icon';

export default function Signin() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/api/auth/signin');
  };

  return (
    <>
      <header className='absolute z-[1000] flex w-full justify-between bg-transparent p-16'>
        <Link href='/'>
          <SvgIcon height='24' id='left-arrow' width='24' />
        </Link>
      </header>

      <div className='relative h-screen overflow-hidden'>
        <div className='absolute top-0 h-full w-full'>
          <Photo alt='배경화면' src='/images/background-image.png' />
        </div>
      </div>

      <div className='absolute inset-0 flex flex-col items-center justify-center px-20'>
        <section className='mb-50 w-full text-white'>
          <p className='text-center text-20 font-medium leading-24 text-[#c2cdad]'>
            마음을 피워요
          </p>
          <SvgIcon className='m-auto' height='40' id='logo' width='180' />
        </section>

        <section className='mb-30 flex w-full items-center gap-10'>
          <span className='h-px w-full flex-1 bg-white'></span>
          <span className='text-[1.6rem] text-white'>LOG IN</span>
          <span className='h-px w-full flex-1 bg-white'></span>
        </section>

        <button
          className='mx-auto h-45 w-300'
          type='button'
          onClick={handleButtonClick}
        >
          <Photo
            alt='카카오 로그인 버튼'
            className='m-auto'
            src='/images/kakao-login.png'
          />
        </button>
      </div>
    </>
  );
}
