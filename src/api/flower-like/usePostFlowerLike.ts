import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useGetContentById } from '../content';
import { authHttp } from '../core/axios';
import { useGetFlowerLikes } from './useGetFlowerLikes';

export const usePostFlowerLike = (flowerId: number, isCheck: boolean) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () =>
      authHttp.post(`/flower-like/flower/${flowerId}`, {
        data: { isCheck: !isCheck },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useGetFlowerLikes.queryKey });
      queryClient.invalidateQueries({
        queryKey: useGetContentById.queryKey(flowerId),
      });
    },
  });
  const handleFlowerLike = () => {
    mutate();
  };
  return {
    handleFlowerLike,
  };
};
