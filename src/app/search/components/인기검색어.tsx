import { useGetPopularFlower } from '@/api/flower-search';

import Chip from './Chip';

const 인기검색어 = () => {
  const popularFlower = useGetPopularFlower();

  return (
    <section className='flex flex-col p-[1.5rem]'>
      <h3 className='text-[1.2rem] font-medium leading-[2.4rem] text-white'>
        인기 검색어
      </h3>
      <p className='flex flex-wrap gap-12 text-[1.2rem] font-light leading-[2.4rem] text-green-100'>
        {popularFlower.data ? (
          popularFlower.data.map((flower, index) => (
            <Chip
              className='border-yellow text-yellow'
              key={index}
              label={`#${flower}`}
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
