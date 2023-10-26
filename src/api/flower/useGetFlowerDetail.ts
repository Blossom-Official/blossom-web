import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetFlowerDetail = (flowerId: string) => {
  return useSuspenseQuery({
    queryKey: useGetFlowerDetail.queryKey(flowerId),
    queryFn: () => useGetFlowerDetail.queryFn(flowerId),
    select: (response) => {
      const { data } = response.data;
      return data;
    },
  });
};

interface Response {
  koreanName: string;
  englishName: string;
  images: string[];
  familyName: string;
  times: number[];
  languages: string[];
  tags: string[];
  additionalInformation: string;
  fitName: string;
  fitInformation: string;
  cares: string[];
  betterTogethers: {
    flowerId: number;
    koreanName: string;
    englishName: string;
    imageUrl: string;
  }[];
  contents: {
    contentId: number;
    imageUrl: string;
    title: string;
    subtitle: string;
  }[];
}

useGetFlowerDetail.queryKey = (flowerId: string) =>
  ['flower', flowerId] as const;

useGetFlowerDetail.queryFn = (flowerId: string) =>
  http.get<RequestSuccess<Response>>(`/flower/${flowerId}`);
