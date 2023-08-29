'use client';
import 'keen-slider/keen-slider.min.css';

import { Suspense } from '@suspensive/react';
import Link from 'next/link';

import { useGetHome } from '@/api/home';
import { Photo } from '@/common/components/photo';
import { SvgIcon } from '@/common/components/svg-icon';

import { ContentsSlider, Header, PopularFlowers } from './components';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col justify-center bg-green-400 text-white'>
      <Header />

      <section className='relative -mt-56 h-screen'>
        <Photo
          alt='배경화면'
          className='h-full'
          src='/images/background-image.png'
        />
        <div className='absolute inset-0 flex flex-col justify-center px-20'>
          <div>
            <p className='text-center text-20 font-medium leading-24 text-[#c2cdad]'>
              마음을 피워요
            </p>
            <SvgIcon className='m-auto' height='40' id='logo' width='180' />
            <Link
              className='mt-28 flex w-full justify-between border border-solid border-white px-20 py-12 text-16 font-medium leading-24 text-white'
              href='/search'
            >
              검색하기
              <SvgIcon
                aria-labelledby='검색하기 페이지로 이동'
                className='[&_*]:fill-white'
                height='24'
                id='right-arrow'
                role='img'
                width='24'
              />
            </Link>
          </div>
          <button
            className='absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-8 text-12 leading-20 text-green-100'
            type='button'
          >
            더보기
            <SvgIcon height='10' id='bottom-arrow' width='42' />
          </button>
        </div>
      </section>

      <Suspense>
        <section className='h-full min-h-screen'>
          <MainComp />
        </section>
      </Suspense>
    </div>
  );
}

const CATEGORIES = [
  { name: '축하', query: 'CELEBRATE', imageUrl: '/images/celebrate.png' },
  { name: '감사', query: 'THANKS', imageUrl: '/images/thanks.png' },
  { name: '사랑', query: 'LOVE', imageUrl: '/images/love.png' },
  { name: '위로', query: 'CHEERING', imageUrl: '/images/cheering.png' },
] as const;

const MainComp = () => {
  const homeData = useGetHome();

  return (
    <>
      <section className='mb-20'>
        <ContentsSlider contents={homeData.data.contents} />
      </section>

      <section className='mb-24 px-20'>
        <h3 className='mb-16 border-b font-lemon-milk text-16 leading-24'>
          CATEGORY
        </h3>
        <ul className='flex w-full gap-8'>
          {CATEGORIES.map((category) => {
            return (
              <li
                className='relative w-1/4 after:block after:pb-[100%] after:content-[""]'
                key={category.query}
              >
                <Link
                  className='absolute h-full w-full'
                  href={`/category?category=${category.query}`}
                >
                  <Photo alt={category.name} src={category.imageUrl} />
                  <span className='absolute bottom-4 left-6 text-14 font-semibold'>
                    {category.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          className='mt-28 flex w-full justify-between border border-solid border-pink-200 bg-pink-100 px-20 py-12 text-16 font-medium leading-24 text-pink-200'
          href='/quiz'
        >
          꽃 추천 받기
          <SvgIcon
            aria-labelledby='검색하기 페이지로 이동'
            className='[&_*]:fill-pink-200'
            height='24'
            id='right-arrow'
            role='img'
            width='24'
          />
        </Link>
      </section>

      <section className='px-20'>
        <h3 className='mb-16 border-b font-lemon-milk text-16 leading-24'>
          POPULAR
        </h3>
        <PopularFlowers flowers={homeData.data.flowers} />
      </section>
    </>
  );
};
