'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEventHandler, useCallback, useDeferredValue } from 'react';

import { useGetFlowerSearch } from '@/api/flower-search';
import { Input } from '@/common/components/input';
import { SvgIcon } from '@/common/components/svg-icon';
import { useInputState } from '@/common/hooks';

import { useSearchHistory } from '../hooks';

const SearchForm = () => {
  const searchHandle = useSearchHandle();
  const deferredValue = useDeferredValue(searchHandle.value);
  const flowerSearch = useGetFlowerSearch(deferredValue);
  const searchText = useSearchParams().get('q');

  return (
    <section>
      <form onSubmit={searchHandle.handleSubmit}>
        <Input
          className='bg-transparent text-24-regular-32 placeholder:text-24-light-32 placeholder:text-grey'
          placeholder='검색어를 입력하세요'
          value={searchHandle.value}
          rightComponent={
            searchText ? (
              <button type='button' onClick={searchHandle.handleDeleteValue}>
                <SvgIcon
                  aria-labelledby='검색어 지우기'
                  height='24'
                  id='menu-out'
                  role='img'
                  width='24'
                />
              </button>
            ) : (
              <button type='submit' onClick={searchHandle.handleSubmit}>
                <SvgIcon
                  aria-labelledby='꽃 검색하기'
                  height='24'
                  id='search'
                  role='img'
                  width='24'
                />
              </button>
            )
          }
          wrapperClassName={clsx(
            'border-b border-b-white px-16 py-12 text-24-semibold-24 text-white',
            [!!searchText && 'border-none bg-green-200']
          )}
          onChange={searchHandle.handleValue}
        />
      </form>
      {flowerSearch.data && (
        <ul className='absolute flex h-full w-full flex-col bg-green-400 py-16 text-[2rem] font-normal leading-[3.2rem] text-green-100'>
          {flowerSearch.data.map((flower) => (
            <li className='hover:bg-green-300' key={flower.flowerId}>
              <button
                className='h-full w-full px-16 py-8 text-left'
                type='submit'
                onClick={searchHandle.handleSubmit}
              >
                {flower.koreanName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SearchForm;

const useSearchHandle = () => {
  const [value, setValue, handleValue] = useInputState('');
  const searchHistory = useSearchHistory();
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLElement> = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/search?q=${value}`);
      searchHistory.add(value);
    },
    [value, router, searchHistory]
  );

  const handleDeleteValue = useCallback(() => {
    setValue('');
    router.push('/search');
  }, [router, setValue]);

  return {
    value,
    setValue,
    handleValue,
    handleSubmit,
    handleDeleteValue,
  } as const;
};
