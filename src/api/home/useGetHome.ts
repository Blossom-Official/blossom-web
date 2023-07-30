import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetHome = () => {
  return useSuspenseQuery({
    queryKey: useGetHome.queryKey,
    queryFn: useGetHome.queryFn,
    staleTime: Infinity,
    select: (response) => {
      // const { data } = response.data;
      const { data } = mockData;
      return data;
    },
  });
};

export interface Response {
  contents: {
    contentId: number;
    imageUrl: string;
    title: string;
    subtitle: string;
  }[];
  flowers: {
    flowerId: number;
    koreanName: string;
    englishName: string;
    imageUrl: string;
  }[];
}

useGetHome.queryKey = ['home'] as const;

useGetHome.queryFn = () => http.get<RequestSuccess<Response>>('/home');

const imageUrl = 'https://source.unsplash.com/random/300×300';

const mockData = {
  code: '',
  message: '',
  data: {
    contents: [
      {
        contentId: 1,
        imageUrl,
        title: 'ONE DAY CLASS',
        subtitle: '봄에는 꽃과 함께 기분전환',
      },
      {
        contentId: 2,
        imageUrl,
        title: 'ONE DAY CLASS',
        subtitle: '봄에는 꽃과 함께 기분전환',
      },
      {
        contentId: 3,
        imageUrl,
        title: 'ONE DAY CLASS',
        subtitle: '봄에는 꽃과 함께 기분전환',
      },
    ],
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
