import { useSuspenseQuery } from '@suspensive/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { authHttp } from '../core/axios';
import { BaseResponse } from '../core/types';

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
    onError: (error: any) => {
      queryClient.setQueryData<BaseResponse<Response>>(
        useGetProfile.queryKey,
        error.response
      );
    },
  });
};

useGetProfile.queryKey = ['profile'];
useGetProfile.queryFn = () =>
  authHttp.get<BaseResponse<Response>>('/user/profile');
