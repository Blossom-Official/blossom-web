import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetContentById = (contentId: string) => {
  return useSuspenseQuery({
    queryKey: useGetContentById.queryKey(contentId),
    queryFn: () => useGetContentById.queryFn(contentId),
    select: (response) => {
      const { data } = response.data;
      return data;
    },
  });
};

interface Response {
  contentId: number;
  postedAt: string;
  subtitle: string;
  title: string;
  description: string;
  contentImageUrl: string;
  totalPage: number;
  contentDetailInfos:
    | {
        title: string;
        subtitle: string;
        description: string;
        contentImageUrl: string;
        hasLink: boolean;
        linkUrl: string;
      }[]
    | never[];
  more:
    | {
        contentId: number;
        imageUrl: string;
        title: string;
        subtitle: string;
      }[]
    | never[];
}

useGetContentById.queryKey = (id: string) => ['contents', id] as const;
useGetContentById.queryFn = (id: string) =>
  http.get<RequestSuccess<Response>>(`/content/${id}`);
