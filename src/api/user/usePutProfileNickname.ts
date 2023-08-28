import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { authHttp } from '../core/axios';
import { useGetProfile } from './useGetProfile';

export const usePutProfileNickname = (nickname: string) => {
  const queryClient = useQueryClient();
  const profileNickname = useMutation({
    mutationFn: () =>
      authHttp.put('/user/profile/nickname', {
        data: {
          nickname,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useGetProfile.queryKey });
    },
  });

  const handleSubmit = useCallback(() => {
    if (!nickname || !nickname.trim()) return;
    if (nickname.length > 5) return;

    profileNickname.mutate();
  }, [profileNickname, nickname]);

  return { handleSubmit };
};
