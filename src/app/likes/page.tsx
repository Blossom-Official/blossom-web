'use client';

import { QueryAsyncBoundary } from '@suspensive/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useDeleteFlowerLikes, useGetFlowerLikes } from '@/api/flower-like';
import { Photo } from '@/common/components/photo';
import { SvgIcon } from '@/common/components/svg-icon';
import { useToggle } from '@/common/hooks';

const mapToArray = (arg: Map<unknown, unknown>) => {
  return Array.from(arg.keys());
};

export default function LikesPage() {
  const [editMode, handleEditMode] = useToggle();
  const [selectedItems, setSelectedItems] = useState<Map<number, number>>(
    new Map()
  );
  const router = useRouter();

  const deleteFlowerLikes = useDeleteFlowerLikes(
    mapToArray(selectedItems) as number[]
  );
  useEffect(() => {
    setSelectedItems(new Map());
  }, [editMode]);

  const selectItem = (flowerId: number) => {
    setSelectedItems((prevItems) => {
      const clone = new Map(prevItems);
      if (clone.has(flowerId)) clone.delete(flowerId);
      else clone.set(flowerId, flowerId);
      return clone;
    });
  };

  const isSelected = (flowerId: number) => selectedItems.has(flowerId);

  return (
    <>
      <header className='flex justify-between bg-green-200 p-16'>
        <div className='flex gap-12'>
          {editMode ? (
            <div className='text-16-light-24 text-white'>
              {selectedItems.size}개 선택 됨
            </div>
          ) : (
            <>
              <Link href='/'>
                <SvgIcon height='24' id='left-arrow' width='24' />
              </Link>
              <div className='font-lemon-milk text-16-light-24 text-white'>
                LIKES
              </div>
            </>
          )}
        </div>

        <div className='flex gap-12'>
          {editMode && (
            <button
              disabled={selectedItems.size === 0}
              onClick={() => {
                deleteFlowerLikes.mutate();
              }}
            >
              {selectedItems.size === 0 ? (
                <SvgIcon
                  height='24'
                  id='trash-can'
                  stroke='#bcbcbc'
                  width='24'
                />
              ) : (
                <SvgIcon
                  height='24'
                  id='trash-can'
                  stroke='#ffcbf1'
                  width='24'
                />
              )}
            </button>
          )}
          <button className='' onClick={handleEditMode}>
            <SvgIcon height='24' id='pencil' width='24' />
          </button>
        </div>
      </header>

      <QueryAsyncBoundary
        rejectedFallback={(boundary) => (
          <button onClick={boundary.reset}>Try again</button>
        )}
        onError={() => router.push('/signin')}
      >
        <LikesList
          editMode={editMode}
          isSelected={isSelected}
          onSelect={selectItem}
        />
      </QueryAsyncBoundary>
    </>
  );
}

interface LikesListProps {
  editMode: boolean;
  onSelect: (flowerId: number) => void;
  isSelected: (flowerId: number) => boolean;
}

const LikesList = ({ editMode, onSelect, isSelected }: LikesListProps) => {
  const flowerLikes = useGetFlowerLikes();

  return (
    <div className='grow p-20 text-white'>
      {flowerLikes.data.flowers.length === 0 ? (
        <p className='flex h-full items-center justify-center text-16-light-24 text-grey'>
          아직 찜한 꽃이 없어요!
        </p>
      ) : (
        <>
          {!editMode && (
            <div className='mb-12 text-14-light-24'>
              총 {flowerLikes.data.totalCount}건
            </div>
          )}
          <ul className='grid grid-cols-2 gap-20'>
            {flowerLikes.data.flowers.map((flower) => {
              return (
                <li data-item-id={flower.flowerId} key={flower.flowerId}>
                  <button
                    disabled={!editMode}
                    onClick={() => onSelect(flower.flowerId)}
                  >
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
                      <div
                        className={clsx([
                          isSelected(flower.flowerId)
                            ? 'absolute inset-0 flex items-center justify-center bg-black/70'
                            : 'hidden',
                        ])}
                      >
                        <SvgIcon height='24' id='done' role='img' width='24' />
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
