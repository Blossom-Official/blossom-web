import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

export type Empty = 'empty';
export type Exist = 'exist';

export const useGetFlowerSearch = (keyword: string) => {
  return useSuspenseQuery({
    queryKey: useGetFlowerSearch.queryKey(keyword),
    queryFn: () => useGetFlowerSearch.queryFn(keyword),
    select: (response) => {
      const { data } = response.data;
      const { flowerTags, flowers, contentSummaryInfos } = data;
      if (
        flowerTags.length === 0 &&
        flowers.length === 0 &&
        contentSummaryInfos.length === 0
      ) {
        return { type: 'empty' as Empty, ...data };
      }
      return { type: 'exist' as Exist, ...data };
    },
  });
};

interface Response {
  flowerTags: string[];
  flowers: {
    flowerId: number;
    koreanName: string;
    englishName: string;
    imageUrl: string;
  }[];
  contentSummaryInfos: {
    contentId: number;
    imageUrl: string;
    title: string;
    subtitle: string;
  }[];
}

useGetFlowerSearch.queryKey = (keyword: string) =>
  ['flower-search', keyword] as const;
useGetFlowerSearch.queryFn = (keyword: string) =>
  http.get<RequestSuccess<Response>>('/flower-search/flowers', {
    params: { searchText: keyword },
  });
