'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Photo } from '@/common/components/photo';

const Category = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('category');

  return (
    <ul className='flex w-full gap-8 px-20 pt-20'>
      {Categories.map((category) => {
        const selected = query === category.query;
        return (
          <li
            className='relative w-1/4 after:block after:pb-[100%] after:content-[""]'
            key={category.query}
          >
            <Link
              className='absolute h-full w-full'
              href={`/category?category=${category.query}`}
            >
              <Photo
                alt={category.name}
                src={selected ? category.selectedImageUrl : category.imageUrl}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Category;

const Categories = [
  {
    name: '전체',
    query: 'ALL',
    imageUrl: '/images/category/all.png',
    selectedImageUrl: '/images/category/all-selected.png',
  },
  {
    name: '사랑',
    query: 'LOVE',
    imageUrl: '/images/category/love.png',
    selectedImageUrl: '/images/category/love-selected.png',
  },
  {
    name: '축하',
    query: 'CELEBRATE',
    imageUrl: '/images/category/celebrate.png',
    selectedImageUrl: '/images/category/celebrate-selected.png',
  },
  {
    name: '감사',
    query: 'THANKS',
    imageUrl: '/images/category/thanks.png',
    selectedImageUrl: '/images/category/thanks-selected.png',
  },
  {
    name: '위로',
    query: 'CHEERING',
    imageUrl: '/images/category/cheering.png',
    selectedImageUrl: '/images/category/cheering-selected.png',
  },
] as const;
