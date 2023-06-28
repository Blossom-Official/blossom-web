import { useSuspenseQuery } from '@suspensive/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { authHttp } from '../core/axios';
import { RequestError, RequestState } from '../core/types';

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

export const useGetProfile = () => {
  const queryClient = useQueryClient();
  return useSuspenseQuery({
    queryKey: useGetProfile.queryKey,
    queryFn: useGetProfile.queryFn,
    select: (response) => {
      const {
        data: { data },
      } = response;
      return data;
    },
    onError: (error: AxiosError<RequestError>) => {
      console.log(error.response);
      queryClient.setQueryData(useGetProfile.queryKey, error.response);
    },
  });
};

useGetProfile.queryKey = ['profile'] as const;
useGetProfile.queryFn = () =>
  authHttp.get<RequestState<Response>>('/user/profile');
