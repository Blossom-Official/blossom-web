import { useSuspenseQuery } from '@suspensive/react-query';

import { authHttp } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetFlowerLikeById = (
  flowerId: number,
  options?: { enabled: boolean }
) => {
  return useSuspenseQuery({
    queryKey: useGetFlowerLikeById.queryKey(flowerId),
    queryFn: () => useGetFlowerLikeById.queryFn(flowerId),
    select: (response) => {
      const { data } = response.data;
      return data;
    },
    ...options,
  });
};

interface Response {
  isCheck: boolean;
}
useGetFlowerLikeById.queryKey = (flowerId: number) =>
  ['flower-likes', flowerId] as const;
useGetFlowerLikeById.queryFn = (flowerId: number) =>
  authHttp.get<RequestSuccess<Response>>(`/flower-like/flower/${flowerId}`);
