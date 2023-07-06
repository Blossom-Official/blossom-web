import { useSuspenseQuery } from '@suspensive/react-query';

import { authHttp } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetFlowerLikes = () => {
  return useSuspenseQuery({
    queryKey: useGetFlowerLikes.queryKey,
    queryFn: useGetFlowerLikes.queryFn,
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
useGetFlowerLikes.queryKey = ['flower-likes'] as const;
useGetFlowerLikes.queryFn = () =>
  authHttp.get<RequestSuccess<Response>>('/flower-like/flower');
