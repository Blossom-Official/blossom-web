import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetContentById = (contentId: number) => {
  return useSuspenseQuery({
    queryKey: useGetContentById.queryKey(contentId),
    queryFn: () => useGetContentById.queryFn(contentId),
    select: (response) => {
      // const { data } = response.data;
      const { data } = mockData;
      return data;
    },
  });
};

interface Response {
  contentId: number;
  postedAt: Date;
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

useGetContentById.queryKey = (id: number) => ['contents', id] as const;
useGetContentById.queryFn = (id: number) =>
  http.get<RequestSuccess<Response>>(`/content/${id}`);

const imageUrl = 'https://source.unsplash.com/random/300×300';

const mockData = {
  code: '',
  message: '',
  data: {
    contentId: 1,
    postedAt: '2023-06-27',
    subtitle: '봄에는 꽃과 함께 기분전환',
    title: 'ONE DAY CLASS',
    description:
      '이번 봄에는 Blossom이 추천해 주는 꽃꽂이 원 데이 클래스를 경험해 보는 건 어때요? 봄과 어울리는 다양한 꽃들로 칙칙한 나의 일상을 칠해보세요. 꽃 다발 하나로 바뀌는 방 분위기에 놀라게 될 거예요!',
    contentImageUrl: imageUrl,
    totalPage: 5,
    contentDetailInfos: [
      {
        title: '클래스 아홈',
        subtitle: '서울 성동구 성수일로3길 5-15',
        description:
          '꽃꽂이의 핵심이자 기초인 꽃다발(handtied)을 만들기 위한 수업이에요. 가장 기본인 라운드 형태의 꽃다발을 제작하고, 포장하는 방법을 배워요.',
        contentImageUrl: imageUrl,
        hasLink: true,
        linkUrl: 'https://www.class-arum.co.kr/Home/?idx=7',
      },
      {
        title: '블루 에떼',
        subtitle: '서울 마포구 독막로9길 41 1,2층(서교동)',
        description:
          '1층은 꽃집, 2층은 카페/펍으로 운영하고 있는 곳이에요. 방문하면 꽃을 주는 카페로 유명하지만, 전문 플로리스트가 진행하는 플라워 클래스로 꽃을 손질하는 방법부터 포장하는 방법까지 디테일하게 설명을 들을 수 있어요!',
        contentImageUrl: imageUrl,
        hasLink: false,
        linkUrl: null,
      },
      {
        title: '마모아띠에',
        subtitle: '서울 성동구 상원길 22 3층',
        description:
          '평범한 꽃꽂이가 질린다면? 케이커리의 케이크에 플라워를 디자인하여 데코를 하는 수업도 있어요! 내가 직접 디자인한 플라워를 케이크에 얹을 수 있다니 너무 낭만적이지 않나요?',
        contentImageUrl: imageUrl,
        hasLink: true,
        linkUrl: 'https://www.mamoitie.kr/shop_view/?idx=47',
      },
      {
        title: '무아 플라워스튜디오',
        subtitle: '서울 종로구 필운대로 51 3층',
        description:
          '핸드타이드, 화병 꽂이, 화기 꽂이, 서머 바스켓, 플라워 박스까지! 주말 오전과 오후에 항상 열려있는 무아의 원 데이 클래스에서 만들어보고 시도해 보고 싶었던 꽃 디자인을 모두 체험해 보아요!',
        contentImageUrl: imageUrl,
        hasLink: true,
        linkUrl: 'https://www.instagram.com/mua_flowerstudio/',
      },
    ],
    more: [
      {
        contentId: 1,
        imageUrl: imageUrl,
        title: '무아 플라워스튜디오',
        subtitle: '무아 플라워스튜디오',
      },
      {
        contentId: 2,
        imageUrl: imageUrl,
        title: '무아 플라워스튜디오',
        subtitle: '무아 플라워스튜디오',
      },
    ],
  },
};
