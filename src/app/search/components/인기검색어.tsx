'use client';

import { useRouter } from 'next/navigation';

import { useGetPopularFlower } from '@/api/flower-search';

import Chip from './Chip';

const 인기검색어 = () => {
  const popularFlower = useGetPopularFlower();
  const router = useRouter();

  return (
    <section className='flex flex-col p-24'>
      <h3 className='text-12 font-medium leading-24 text-white'>인기 검색어</h3>
      <p className='flex flex-wrap gap-12 text-12 font-light leading-24 text-green-100'>
        {popularFlower.data ? (
          popularFlower.data.map((flower, index) => (
            <Chip
              className='border-yellow text-yellow'
              key={index}
              label={`#${flower}`}
              onClick={() => router.push(`/search?q=${flower}`)}
            />
          ))
        ) : (
          <>인기검색어가 없습니다.</>
        )}
      </p>
    </section>
  );
};

export default 인기검색어;
