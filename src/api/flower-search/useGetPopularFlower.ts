import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestState } from '../core/types';

export const useGetPopularFlower = () => {
  return useSuspenseQuery({
    queryKey: useGetPopularFlower.queryKey,
    queryFn: useGetPopularFlower.queryFn,
    select: (response) => {
      const { data } = response.data;
        return data && data.populars.length !== 0 ? data.populars : null;
    },
  });
};

type Response = {
  populars: string[];
};

useGetPopularFlower.queryKey = ['popular-flower'] as const;
useGetPopularFlower.queryFn = () =>
  http.get<RequestState<Response>>('/flower-search/popular');
