'use client';

import { QueryAsyncBoundary } from '@suspensive/react-query';
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
      <header className='flex justify-between bg-green-200 p-16'>
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
          {editMode && (
            <button
              disabled={select.isEmpty}
              onClick={() => {
                deleteFlowerLikes.mutate();
              }}
            >
              {select.isEmpty ? (
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
          <button
            onClick={() => {
              select.clearItems();
              handleEditMode();
            }}
          >
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
          isSelected={select.isSelected}
          onSelect={select.selectItem}
        />
      </QueryAsyncBoundary>
    </>
  );
}
