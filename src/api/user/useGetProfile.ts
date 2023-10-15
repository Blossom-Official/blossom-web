import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { authHttp } from '../core/axios';
import { RequestError, RequestState } from '../core/types';

export const useGetProfile = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: useGetProfile.queryKey,
    queryFn: useGetProfile.queryFn,
    staleTime: Infinity,
    select: (response) => {
      const { data } = response.data;
      return data;
    },
    onError: (error: AxiosError<RequestError>) => {
      queryClient.setQueryData(useGetProfile.queryKey, error.response);
    },
  });
};

export type Response = {
  nickname: string;
  isDefaultProfileImage: boolean;
  profileImageUrl: string;
  flowers: {
    flowerId: number;
    koreanName: string;
    englishName: string;
    imageUrl: string;
  }[];
};

useGetProfile.queryKey = ['profile'] as const;
useGetProfile.queryFn = () =>
  authHttp.get<RequestState<Response>>('/user/profile');
