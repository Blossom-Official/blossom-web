'use client';

import { useCallback } from 'react';

import { useLocalStorage } from '@/common/hooks';

const LIMIT = 10;
export const HISTORY_KEY = 'blossom-flower-search-history';

export const useSearchHistory = () => {
  const [history, setHistory] = useLocalStorage<string[]>(
    'blossom-flower-search-history',
    []
  );
  const add = useCallback(
    (keyword: string) => {
      if (!keyword || !keyword.trim()) return;

      setHistory((prevHistory) => {
        const prevHistorySet = new Set(prevHistory);
        if (prevHistorySet.has(keyword)) {
          prevHistorySet.delete(keyword);
          prevHistorySet.add(keyword);
          return Array.from(prevHistorySet.values());
        }

        if (prevHistory.length < LIMIT) return prevHistory.concat(keyword);
        return prevHistory.slice(1).concat(keyword);
      });
    },
    [setHistory]
  );

  return { history, add } as const;
};
