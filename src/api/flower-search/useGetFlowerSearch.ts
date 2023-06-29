import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import {  RequestState } from '../core/types';

export const useGetFlowerSearch = (keyword: string) => {

  return useSuspenseQuery({
    queryKey: useGetFlowerSearch.queryKey(keyword),
    queryFn: () => useGetFlowerSearch.queryFn(keyword),
    enabled: !!keyword,
    select: (response) => {
      const { data } = response.data;
      return data && data.flowers.length !== 0
        ? data.flowers.map((flower) => ({
            flowerId: flower.flowerId,
            koreanName: flower.koreanName,
          }))
        : null;
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
  contentSummaryInfos: { contentId: number; imageUrl: string }[];
}

useGetFlowerSearch.queryKey = (keyword: string) =>
  ['flower-search', keyword] as const;
useGetFlowerSearch.queryFn = (keyword: string) =>
  http.get<RequestState<Response>>('/flower-search/flowers', {
    params: { searchText: keyword },
  });
