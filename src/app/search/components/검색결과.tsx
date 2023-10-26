'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useGetFlowerSearch } from '@/api/flower-search';
import { Photo } from '@/common/components/photo';

import Chip from './Chip';

const 검색결과 = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get('q');
  const flowerSearch = useGetFlowerSearch(searchText as string);
  const router = useRouter();

  if (flowerSearch.data.type === 'empty') {
    return (
      <section className='flex w-full grow items-center justify-center p-20 text-24 font-medium leading-24 text-grey'>
        검색.. 결과,, 결과가 없어요.,..? 아놔
      </section>
    );
  }
  const {
    data: { flowerTags, flowers, contentSummaryInfos },
  } = flowerSearch;
  return (
    <>
      <section className='p-20'>
        <ul className='flex flex-wrap gap-12 text-12 font-light leading-24 text-green-100'>
          {flowerTags.map((flower, index) => (
            <li key={index}>
              <Chip
                className='border-yellow text-yellow'
                key={index}
                label={`#${flower}`}
                onClick={() => router.push(`/search?q=${flower}`)}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className='p-20'>
        <h3 className='mb-16 border-b-2 border-white font-lemon-milk text-16 font-normal leading-24 text-white'>
          FLOWERS
        </h3>
        <ul className='grid grid-cols-2 gap-20 text-white'>
          {flowers.map((flower) => (
            <li data-item-id={flower.flowerId} key={flower.flowerId}>
              <Link href={`/flowers/${flower.flowerId}`}>
                <div className='relative'>
                  <Photo
                    alt={flower.koreanName}
                    height='98'
                    src={flower.imageUrl}
                    width='158'
                  />
                  <div className='absolute bottom-8 left-8 flex flex-col text-left'>
                    <span className='text-14-regular-24'>
                      {flower.koreanName}
                    </span>
                    <span className='font-lemon-milk text-10-regular-12'>
                      {flower.englishName}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className='p-20'>
        <h3 className='mb-16 border-b-2 border-white font-lemon-milk text-16 font-normal leading-24 text-white'>
          CONTENTS
        </h3>
        <ul className='flex flex-col gap-20 text-white'>
          {contentSummaryInfos.map((content) => (
            <li data-item-id={content.contentId} key={content.contentId}>
              <Link href={`/contents/${content.contentId}`}>
                <div className='relative'>
                  <Photo
                    alt='temp'
                    height='98'
                    src={content.imageUrl}
                    width='158'
                  />
                  <div className='absolute bottom-8 left-8 flex flex-col gap-4 p-12 text-left'>
                    <span className='text-16 font-medium leading-24'>
                      {content.subtitle}
                    </span>
                    <span className='font-lemon-milk text-30 font-medium leading-32'>
                      {content.title}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default 검색결과;
