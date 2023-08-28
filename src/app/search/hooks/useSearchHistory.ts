'use client';

import { useCallback } from 'react';

import { useLocalStorage } from '@/common/hooks';

const LIMIT = 10;
const HISTORY_KEY = 'blossom-flower-search-history';

export const useSearchHistory = () => {
  const [history, setHistory] = useLocalStorage<string[]>(HISTORY_KEY, []);
  const add = useCallback(
    (keyword: string) => {
      if (!keyword || !keyword.trim()) return;

      setHistory((prevHistory) => {
        const clone = new Set(prevHistory);
        if (clone.has(keyword)) {
          clone.delete(keyword);
          clone.add(keyword);
          return Array.from(clone.values());
        }

        if (prevHistory.length < LIMIT) return prevHistory.concat(keyword);
        return prevHistory.slice(1).concat(keyword);
      });
    },
    [setHistory]
  );

  const remove = useCallback(
    (keyword: string) => {
      setHistory((prevHistory) => {
        const clone = new Set(prevHistory);
        clone.delete(keyword);
        return Array.from(clone.values());
      });
    },
    [setHistory]
  );

  return { history, add, remove } as const;
};
