import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

const imageUrl = 'https://source.unsplash.com/random/300×300';
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
      // return {
      //   type: 'exist',
      //   flowerTags: ['프로포즈', '봄'],
      //   flowers: [
      //     {
      //       flowerId: 1,
      //       koreanName: '은방울꽃',
      //       englishName: 'LILY OF THE VALLEY',
      //       imageUrl,
      //     },
      //     {
      //       flowerId: 2,
      //       koreanName: '은방울꽃',
      //       englishName: 'LILY OF THE VALLEY',
      //       imageUrl,
      //     },
      //   ],
      //   contentSummaryInfos: [
      //     {
      //       contentId: 1,
      //       imageUrl,
      //       title: 'MONODSFOE',
      //       subtitle: '은방울은방울은방울',
      //     },
      //     {
      //       contentId: 2,
      //       imageUrl,
      //       title: 'MONODSFOE',
      //       subtitle: '은방울은방울은방울',
      //     },
      //   ],
      // };
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
