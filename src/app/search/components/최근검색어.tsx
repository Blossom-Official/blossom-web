'use client';

import { useSearchHistory } from '../hooks';

const 최근검색어 = () => {
  const searchHistory = useSearchHistory();

  return (
    <section className='flex flex-col px-[1.5rem] pt-[1.5rem]'>
      <h3 className='text-[1.2rem] font-medium leading-[2.4rem] text-white'>
        최근 검색어
      </h3>
      <p className='text-[1.2rem] font-light leading-[2.4rem] text-green-100'>
        {searchHistory.history.length === 0 ? (
          '최근 검색어가 없습니다.'
        ) : (
          <>최근 검색어</>
        )}
      </p>
    </section>
  );
};
export default 최근검색어;
