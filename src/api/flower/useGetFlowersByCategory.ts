import { useSuspenseQuery } from '@suspensive/react-query';
import { useSearchParams } from 'next/navigation';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

const DEFAULT = 'ALL';

export const useGetFlowersByCategory = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || DEFAULT;

  return useSuspenseQuery({
    queryKey: useGetFlowersByCategory.queryKey(category),
    queryFn: () => useGetFlowersByCategory.queryFn(category),
    select: (response) => {
      const { data } = response.data;
      return data;
    },
  });
};

interface Response {
  totalCount: number;
  flowers: {
    flowerId: number;
    koreanName: string;
    englishName: string;
    imageUrl: string;
  }[];
}

useGetFlowersByCategory.queryKey = (category: string) =>
  ['flower-by-category', category] as const;

useGetFlowersByCategory.queryFn = (category: string) => {
  return http.get<RequestSuccess<Response>>(`/flower?category=${category}`);
};
