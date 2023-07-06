'use client';

import { SvgIcon } from '@/common/components/svg-icon';

import { useSearchHistory } from '../hooks';
import Chip from './Chip';

const 최근검색어 = () => {
  const searchHistory = useSearchHistory();

  return (
    <section className='flex flex-col px-[1.5rem] pt-[1.5rem]'>
      <h3 className='text-[1.2rem] font-medium leading-[2.4rem] text-white'>
        최근 검색어
      </h3>
      <p className='flex flex-wrap gap-12 text-[1.2rem] font-light leading-[2.4rem] text-green-100'>
        {searchHistory.history.length === 0
          ? '최근 검색어가 없습니다.'
          : searchHistory.history.map((flower, index) => (
              <Chip
                className='border-grey text-grey'
                key={index}
                label={flower}
                type='button'
                leftComponent={
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      searchHistory.remove(flower);
                    }}
                  >
                    <SvgIcon
                      aria-labelledby='최근검색어 삭제'
                      height='8'
                      id='delete'
                      role='img'
                      stroke='#bcbcbc'
                      width='8'
                    />
                  </button>
                }
                onClick={() => console.log('hih')}
              />
            ))}
      </p>
    </section>
  );
};
export default 최근검색어;
