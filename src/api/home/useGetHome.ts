import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetHome = () => {
  return useSuspenseQuery({
    queryKey: useGetHome.queryKey,
    queryFn: useGetHome.queryFn,
    staleTime: Infinity,
    select: (response) => {
      const { data } = response.data;
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
