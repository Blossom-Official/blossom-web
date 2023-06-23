'use client';

import { useRouter } from 'next/navigation';

import { Photo } from '@/common/components/photo';

export default function Signin() {
  const router = useRouter();

  const handleButtonClick = async () => {
    router.push('/api/auth/signin');
  };

  return (
    <>
      <section className='mb-50 w-full text-white'>
        <p className='text-center'>마음을 피우다</p>
        <h1 className='text-center'>BLOSSOM</h1>
      </section>

      <section className='mb-30 flex items-center gap-10'>
        <span className='h-px w-full flex-1 bg-white'></span>
        <p className='text-[1.6rem] text-white'>LOG IN</p>
        <span className='h-px w-full flex-1 bg-white'></span>
      </section>

      <button type='button' onClick={handleButtonClick}>
        <Photo
          alt='카카오 로그인 버튼'
          className='m-auto'
          height='45'
          src='/images/kakao-login.png'
          width='300'
        />
      </button>
    </>
  );
}
