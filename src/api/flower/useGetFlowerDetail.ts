import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useGetFlowerDetail = (flowerId: string) => {
  return useSuspenseQuery({
    queryKey: useGetFlowerDetail.queryKey(flowerId),
    queryFn: () => useGetFlowerDetail.queryFn(flowerId),
    select: (response) => {
      // const { data } = response.data;
      const { data } = mockData;
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

const imageUrl = 'https://source.unsplash.com/random/300×300';

const mockData = {
  code: '',
  message: '',
  data: {
    koreanName: '은방울 꽃',
    englishName: 'LILY OF THE VALLEY',
    images: [imageUrl, imageUrl, imageUrl],
    familyName: '백합과',
    times: [5, 6],
    languages: ['순결', '다시 찾은 행복'],
    tags: ['행복', '사랑', '연인'],
    additionalInformation:
      '꽃과 잎에 독성이 있으므로 꽃 장식을 한 후에는 손을 씻어야 한다.',
    fitName: '압화',
    fitInformation:
      '일주일간 책 사이에 꽂아두면 돼요, 압화 전용 시트가 있다면 사용해주세요!',
    cares: [
      '첫번째 순서입니다.',
      '두번째 순서입니다.',
      '세번째 순서입니다.',
      '네번째 순서입니다.',
    ],
    betterTogethers: [
      {
        flowerId: 2,
        koreanName: '산데르소니아',
        englishName: 'SANDERSONIA',
        imageUrl: imageUrl,
      },
      {
        flowerId: 3,
        koreanName: '레우코코리네',
        englishName: 'GLORY OF THE SUN',
        imageUrl: imageUrl,
      },
    ],
    contents: [
      {
        contentId: 1,
        imageUrl: imageUrl,
        title: 'ONE DAY CLASS',
        subtitle: '봄에는 꽃과 함께 기분전환',
      },
    ],
  },
};
