'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import Link from 'next/link';

import { useGetFlowerDetail } from '@/api/flower';
import { useGetFlowerLikeById, usePostFlowerLike } from '@/api/flower-like';
import { Photo } from '@/common/components/photo';
import { SvgIcon } from '@/common/components/svg-icon';

import { Header } from './components';

const FlowerDetailPage = ({ params }: { params: { flowerId: string } }) => {
  return (
    <>
      <Header />
      <Suspense>
        <Contents flowerId={params.flowerId} />
      </Suspense>
    </>
  );
};

export default FlowerDetailPage;

interface Props {
  flowerId: string;
}
const Contents = ({ flowerId }: Props) => {
  const { data: flowerDetail } = useGetFlowerDetail(flowerId);

  return (
    <section className='pb-20 text-white'>
      <section className='relative'>
        <ul className='flex overflow-x-auto'>
          {flowerDetail.images.map((image, index) => {
            return (
              <li key={index}>
                <Photo
                  alt={flowerDetail.koreanName}
                  className='h-260 w-200'
                  src={image}
                />
              </li>
            );
          })}
        </ul>
        <h1 className='absolute bottom-8 left-20'>
          <p className='text-24 font-bold leading-32'>
            {flowerDetail.koreanName}
          </p>
          <p className='font-lemon-milk text-30 font-medium leading-32'>
            {flowerDetail.englishName}
          </p>
        </h1>
        <div className='absolute bottom-8 right-20'>
          <ErrorBoundary fallback={<></>}>
            <Suspense.CSROnly>
              <LikeButton flowerId={flowerId} />
            </Suspense.CSROnly>
          </ErrorBoundary>
        </div>
      </section>
      <section className='mt-20 px-20'>
        <h3 className='mb-16 border-b font-lemon-milk text-16 leading-24'>
          DETAILS
        </h3>
        <div className='flex'>
          <ul className='grow text-grey'>
            <li className='flex items-center text-center'>
              <span className='text-14 font-semibold leading-24'>과명</span>
              <span className='mx-8 h-12 w-px bg-grey' />
              <span className='text-14 font-light leading-20'>
                {flowerDetail.familyName}
              </span>
            </li>
            <li className='flex items-center text-center'>
              <span className='text-14 font-semibold leading-24'>개화시기</span>
              <span className='mx-8 h-12 w-px bg-grey' />
              <span className='text-14 font-light leading-20'>
                {flowerDetail.times[0]}월 ~ {flowerDetail.times[1]}월
              </span>
            </li>
            <li className='flex items-center text-center'>
              <span className='text-14 font-semibold leading-24'>꽃말</span>
              <span className='mx-8 h-12 w-px bg-grey' />
              <span className='text-14 font-light leading-20'>
                {flowerDetail.languages.join(', ')}
              </span>
            </li>
          </ul>
          <ul className='flex gap-2'>
            {flowerDetail.tags.map((tag, index) => {
              return (
                <li
                  className='text-14 font-light leading-20 text-yellow'
                  key={index}
                >
                  #{tag}
                </li>
              );
            })}
          </ul>
        </div>
        <p className='text-12 leading-20 text-green-100'>
          ※ {flowerDetail.additionalInformation}
        </p>
      </section>

      <section className='mt-20 px-20'>
        <h3 className='mb-16 border-b font-lemon-milk text-16 leading-24'>
          HOW TO
        </h3>
        <div>
          <p className='text-14 font-semibold leading-24'>
            <span className='text-pink-100'>{flowerDetail.fitName}</span> 이(가)
            잘 어울리는 꽃이네요!
          </p>
          <p className='text-14 font-light leading-24'>
            {flowerDetail.fitInformation}
          </p>
          <ol className='mt-20 list-decimal pl-16'>
            {flowerDetail.cares.map((care, index) => {
              return (
                <li className='text-14 font-light leading-20' key={index}>
                  {care}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className='mt-20 px-20'>
        <h3 className='mb-16 border-b font-lemon-milk text-16 leading-24'>
          BETTER TOGETHER
        </h3>
        <ul className='grid grid-cols-2 gap-20'>
          {flowerDetail.betterTogethers.map((flower) => {
            return (
              <li data-item-id={flower.flowerId} key={flower.flowerId}>
                <Link className='relative' href={`/flowers/${flower.flowerId}`}>
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
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className='mt-20 px-20'>
        <h3 className='mb-16 border-b font-lemon-milk text-16 leading-24'>
          CONTENTS
        </h3>
        <ul className='flex flex-col gap-20'>
          {flowerDetail.contents.map((content) => (
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
    </section>
  );
};

const LikeButton = ({ flowerId }: { flowerId: string }) => {
  const {
    data: { isCheck },
  } = useGetFlowerLikeById(Number(flowerId));
  const { handleFlowerLike } = usePostFlowerLike(Number(flowerId), isCheck);
  return (
    <button className='' type='button' onClick={handleFlowerLike}>
      <SvgIcon
        fill={`${isCheck ? '#FFCBF1' : 'none'}`}
        height='24'
        id='heart'
        width='24'
      />
    </button>
  );
};
