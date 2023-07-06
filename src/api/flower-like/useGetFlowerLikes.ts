import { useSuspenseQuery } from '@suspensive/react-query';

import { authHttp } from '../core/axios';
import { RequestSuccess } from '../core/types';

const imageUrl = 'https://source.unsplash.com/random/300×300';

export const useGetFlowerLikes = () => {
  return useSuspenseQuery({
    queryKey: useGetFlowerLikes.queryKey,
    queryFn: useGetFlowerLikes.queryFn,
    select: (response) => {
      const { data } = response.data;
      // return data;
      return {
        totalCount: 2,
        flowers: [
          {
            flowerId: 1,
            koreanName: '물망초',
            englishName: 'FORGET ME NOT',
            imageUrl,
          },
          {
            flowerId: 2,
            koreanName: '안개꽃',
            englishName: 'COMMON GYPSOPHILA',
            imageUrl,
          },
        ],
      };
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
