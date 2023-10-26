import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authHttp } from '../core/axios';
import { useGetFlowerDetail } from '../flower/useGetFlowerDetail';
import { useGetProfile } from '../user';
import { useGetFlowerLikes } from './useGetFlowerLikes';

export const usePostFlowerLike = (flowerId: string, isCheck: boolean) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () =>
      authHttp.post(`/flower-like/flower/${flowerId}`, {
        data: { isCheck: !isCheck },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useGetFlowerLikes.queryKey });
      queryClient.invalidateQueries({
        queryKey: useGetFlowerDetail.queryKey(flowerId),
      });
      queryClient.invalidateQueries({ queryKey: useGetProfile.queryKey });
    },
  });
  const handleFlowerLike = () => {
    mutate();
  };
  return {
    handleFlowerLike,
  };
};
