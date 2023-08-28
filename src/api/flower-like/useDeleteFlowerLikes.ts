import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authHttp } from '../core/axios';
import { useGetFlowerLikes } from './useGetFlowerLikes';

export const useDeleteFlowerLikes = (flowerIds: number[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      authHttp.delete('/flower-like/flower', {
        data: {
          flowerIds,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useGetFlowerLikes.queryKey });
    },
  });
};
