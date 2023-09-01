import { useSuspenseQuery } from '@suspensive/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { authHttp } from '../core/axios';
import { RequestError, RequestState } from '../core/types';

export const useGetProfile = () => {
  const queryClient = useQueryClient();
  return useSuspenseQuery({
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

type Response = {
  nickname: string;
  isDefaultProfileImage: boolean;
  profileImageUrl: string;
  flowers: {
    flowerId: number;
    koreanName: string;
    englishName: string;
    imageUrl: string;
  }[];
} | null;

useGetProfile.queryKey = ['profile'] as const;
useGetProfile.queryFn = () =>
  authHttp.get<RequestState<Response>>('/user/profile');
