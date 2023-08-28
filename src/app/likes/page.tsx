'use client';

import { QueryAsyncBoundary } from '@suspensive/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useDeleteFlowerLikes } from '@/api/flower-like';
import { SvgIcon } from '@/common/components/svg-icon';
import { useToggle } from '@/common/hooks';

import { LikesList } from './components';
import { useSelectItem } from './hooks';

export default function LikesPage() {
  const router = useRouter();
  const [editMode, handleEditMode] = useToggle();
  const select = useSelectItem();
  const deleteFlowerLikes = useDeleteFlowerLikes(select.items);

  return (
    <>
      <header className='flex justify-between bg-[#3E482F]/80 p-16'>
        <div className='flex gap-12'>
          {editMode ? (
            <div className='text-16-light-24 text-white'>
              {select.count}개 선택 됨
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
          <button
            onClick={() => {
              select.clearItems();
              handleEditMode();
            }}
          >
            {editMode ? (
              <SvgIcon
                aria-labelledby='편집 모드 닫기'
                height='24'
                id='menu-out'
                role='img'
                width='24'
              />
            ) : (
              <SvgIcon height='24' id='pencil' width='24' />
            )}
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
          isSelected={select.isSelected}
          onSelect={select.selectItem}
        />
      </QueryAsyncBoundary>

      {editMode && (
        <button
          disabled={select.isEmpty}
          className={clsx(
            'fixed inset-x-0 bottom-0 h-80',
            select.isEmpty ? 'bg-[#3E482F]/80' : 'bg-pink-100'
          )}
          onClick={() => {
            if (
              confirm('정말 삭제할까요?\n한 번 삭제하면 복구가 되지 않아요!')
            ) {
              deleteFlowerLikes.mutate();
            }
          }}
        >
          {select.isEmpty ? (
            <SvgIcon
              className='m-auto [&_*]:stroke-green-100'
              height='24'
              id='trash-can'
              width='24'
            />
          ) : (
            <SvgIcon
              className='m-auto [&_*]:stroke-pink-200'
              height='24'
              id='trash-can'
              width='24'
            />
          )}
        </button>
      )}
    </>
  );
}
