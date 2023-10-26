'use client';

import { useAutocomplete } from '@mui/base';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useDeferredValue } from 'react';

import { useSearchAutoComplete } from '@/api/flower-search';
import { Input } from '@/common/components/input';
import { SvgIcon } from '@/common/components/svg-icon';

import { useSearchHandle } from '../hooks';

const SearchForm = () => {
  const searchHandle = useSearchHandle();
  const deferredValue = useDeferredValue(searchHandle.value);
  const searchComplete = useSearchAutoComplete(deferredValue, {
    enabled: !!deferredValue,
  });
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'blossom-auto-complete',
    options: searchComplete.data || [],
    value: searchHandle.value,
    onChange: (event, newValue) => {
      searchHandle.setValue(newValue as string);
      searchHandle.handleSearch(newValue as string);
    },
  });
  const hasSearchText = useSearchParams().get('q');

  return (
    <section className='sticky top-0 z-[1000]'>
      <div {...getRootProps()}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchHandle.handleSearch(searchHandle.value);
          }}
        >
          <Input
            {...getInputProps()}
            className='bg-transparent text-24 font-normal placeholder:font-light placeholder:text-grey'
            placeholder='검색어를 입력하세요'
            value={searchHandle.value}
            rightComponent={
              hasSearchText ? (
                <button type='button' onClick={() => searchHandle.setValue('')}>
                  <SvgIcon
                    aria-labelledby='검색어 지우기'
                    height='24'
                    id='menu-out'
                    role='img'
                    width='24'
                  />
                </button>
              ) : (
                <button
                  type='submit'
                  onClick={() => searchHandle.handleSearch(searchHandle.value)}
                >
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
              'border-b border-b-white px-16 py-12 text-24 font-semibold leading-24 text-white',
              [hasSearchText && 'border-none bg-green-200']
            )}
            onChange={searchHandle.handleChange}
          />
        </form>
      </div>
      {groupedOptions.length > 0 && (
        <ul
          {...getListboxProps()}
          className='absolute w-full bg-green-400 py-16 text-20 font-normal leading-32 text-green-100'
        >
          {(groupedOptions as string[]).map((option, index) => (
            <li
              className='cursor-pointer px-16 py-8 text-left hover:bg-green-300 aria-selected:bg-green-300 [&.Mui-focusVisible]:bg-green-300 [&.Mui-focused]:bg-green-300'
              key={index}
              {...getOptionProps({ option, index })}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SearchForm;
