import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthService } from '../core/axios';
import { useGetProfile } from '../user';

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      AuthService.deleteAccessToken();
      queryClient.invalidateQueries({ queryKey: useGetProfile.queryKey });
    },
  });
};
