'use client';
import 'keen-slider/keen-slider.min.css';

import { Suspense } from '@suspensive/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { useGetHome } from '@/api/home';
import { SvgIcon } from '@/common/components/svg-icon';

import {
  ContentsSlider,
  PopularFlowers,
  ProfileMenuButton,
} from './components';

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleScroll = () => {
    headingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className='relative h-[100dvh]'>
        <header className='sticky top-0 z-[1000] flex w-full justify-between bg-transparent p-16'>
          <ProfileMenuButton />
        </header>

        <Image
          fill
          alt='배경화면'
          sizes='(max-width: 440px): 100vw, 440px'
          src='/images/background-image.png'
          style={{ objectFit: 'cover' }}
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
            onClick={handleScroll}
          >
            더보기
            <SvgIcon height='10' id='bottom-arrow' width='42' />
          </button>
        </div>
      </section>

      <section className='h-full min-h-[100dvh] text-white'>
        <header
          className='sticky top-0 z-[1000] flex w-full justify-between bg-[#3E482F]/80 p-16'
          ref={headingRef}
        >
          <div className='flex gap-10 font-lemon-milk text-16 leading-24 text-green-100'>
            <ProfileMenuButton />
          </div>
          <div>
            <Link href='/search'>
              <SvgIcon height='24' id='search' width='24' />
            </Link>
          </div>
        </header>

        <Suspense>
          <MainComp />
        </Suspense>
      </section>
    </>
  );
}

const CATEGORIES = [
  { name: '사랑', query: 'LOVE', imageUrl: '/images/category/love.png' },
  {
    name: '축하',
    query: 'CELEBRATE',
    imageUrl: '/images/category/celebrate.png',
  },
  { name: '감사', query: 'THANKS', imageUrl: '/images/category/thanks.png' },
  {
    name: '위로',
    query: 'CHEERING',
    imageUrl: '/images/category/cheering.png',
  },
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
                  <Image
                    fill
                    alt={category.name}
                    sizes='(max-width: 440px): 25vw, 100px'
                    src={category.imageUrl}
                    style={{ objectFit: 'cover' }}
                  />
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
