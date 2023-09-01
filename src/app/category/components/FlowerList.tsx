'use client';

import Link from 'next/link';

import { useGetFlowersByCategory } from '@/api/flower';
import { Photo } from '@/common/components/photo';

const FlowerList = () => {
  const { data: flowerByCategory } = useGetFlowersByCategory();

  return (
    <div className='grow p-20 text-white'>
      {flowerByCategory.flowers.length === 0 ? (
        <p className='flex h-full items-center justify-center text-16-light-24 text-grey'>
          아직 찜한 꽃이 없어요!
        </p>
      ) : (
        <>
          <div className='mb-12 text-14-light-24'>
            총 {flowerByCategory.totalCount}건
          </div>
          <ul className='grid grid-cols-2 gap-20'>
            {flowerByCategory.flowers.map((flower) => {
              return (
                <li data-item-id={flower.flowerId} key={flower.flowerId}>
                  <Link
                    className='relative'
                    href={`/flowers/${flower.flowerId}`}
                  >
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
        </>
      )}
    </div>
  );
};

export default FlowerList;
