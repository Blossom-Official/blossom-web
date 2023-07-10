'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { useInputState } from '@/common/hooks';

import { useSearchHistory } from './useSearchHistory';

export const useSearchHandle = () => {
  const [value, setValue, handleChange] = useInputState('');
  const searchHistory = useSearchHistory();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? value;

  useEffect(() => {
    setValue(query);
  }, [setValue, query]);

  const handleSearch = useCallback(
    (newValue: string) => {
      router.push(`/search?q=${newValue}`);
      searchHistory.add(newValue);
    },
    [router, searchHistory]
  );

  return {
    value,
    setValue,
    handleSearch,
    handleChange,
  } as const;
};
