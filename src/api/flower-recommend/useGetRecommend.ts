import { useSuspenseQuery } from '@suspensive/react-query';

import { Options } from '@/app/quiz/hooks';

import { authHttp } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetRecommend = (options: Options) => {
  return useSuspenseQuery({
    queryKey: useGetRecommend.queryKey(options),
    queryFn: () => useGetRecommend.queryFn(options),
    select: (response) => {
      const { data } = response.data;
      return data;
    },
  });
};

interface Response {
  nickname: string;
  flowerId: number;
  koreanName: string;
  englishName: string;
  imageUrl: string;
}
useGetRecommend.queryKey = (options: Options) =>
  ['flower-recommend', options] as const;
useGetRecommend.queryFn = (options: Options) =>
  authHttp.get<RequestSuccess<Response>>('/flower-recommend/flower', {
    params: options,
  });
