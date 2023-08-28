import { useSuspenseQuery } from '@suspensive/react-query';

import { authHttp } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetFlowerLikeById = (flowerId: number) => {
  return useSuspenseQuery({
    queryKey: useGetFlowerLikeById.queryKey(flowerId),
    queryFn: () => useGetFlowerLikeById.queryFn(flowerId),
    select: (response) => {
      const { data } = response.data;
      return data;
    },
  });
};

interface Response {
  isCheck: boolean;
}
useGetFlowerLikeById.queryKey = (flowerId: number) =>
  ['flower-likes', flowerId] as const;
useGetFlowerLikeById.queryFn = (flowerId: number) =>
  authHttp.get<RequestSuccess<Response>>(`/flower-like/flower/${flowerId}`);
