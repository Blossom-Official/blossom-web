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
      // const { data } = response.data;
      const { data } = mockData;
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

const imageUrl = 'https://source.unsplash.com/random/300×300';

const mockData = {
  code: '',
  message: '',
  data: {
    totalCount: 3,
    flowers: [
      {
        flowerId: 1,
        koreanName: '은방울 꽃',
        englishName: 'LILY OF THE VALLEY',
        imageUrl,
      },
      {
        flowerId: 2,
        koreanName: '산데르소니아',
        englishName: 'SANDERSONIA',
        imageUrl,
      },
      {
        flowerId: 4,
        koreanName: '리시언더스',
        englishName: 'PRAIRIE GENTIAN',
        imageUrl,
      },
    ],
  },
};
