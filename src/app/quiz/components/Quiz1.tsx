'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { HandleSelectFn, Options } from '../hooks';

const quiz1 = [
  {
    id: 1,
    imageUrl: '/images/quiz1/friend.png',
    selectedImageUrl: '/images/quiz1/friend-selected.png',
    label: '친구',
    value: 'FRIEND',
  },
  {
    id: 2,
    imageUrl: '/images/quiz1/lover.png',
    selectedImageUrl: '/images/quiz1/lover-selected.png',
    label: '연인',
    value: 'LOVER',
  },
  {
    id: 3,
    imageUrl: '/images/quiz1/family.png',
    selectedImageUrl: '/images/quiz1/family-selected.png',
    label: '가족',
    value: 'FAMILY',
  },
  {
    id: 4,
    imageUrl: '/images/quiz1/acquaintance.png',
    selectedImageUrl: '/images/quiz1/acquaintance-selected.png',
    label: '지인',
    value: 'ACQUAINTANCE',
  },
] as const;

interface Quiz1Props {
  value: Options['relationship'];
  onSelect: HandleSelectFn;
  onClickNext?: () => void;
}

const Quiz1 = ({ value: selectedValue, onSelect, onClickNext }: Quiz1Props) => {
  return (
    <ul className='grid grid-cols-2 grid-rows-2 gap-12 text-white'>
      {quiz1.map(({ id, imageUrl, selectedImageUrl, label, value }) => {
        return (
          <li
            key={id}
            className={clsx(
              'h-222',
              selectedValue === value ? 'bg-green-100' : 'bg-green-200'
            )}
          >
            <button
              className='relative h-full w-full'
              type='button'
              onClick={() =>
                onSelect('relationship', value, {
                  onChangeSelection: onClickNext,
                })
              }
            >
              <Image
                fill
                alt={label}
                src={selectedValue === value ? selectedImageUrl : imageUrl}
                style={{ objectFit: 'cover' }}
              />
              <span className='absolute bottom-16 left-20 text-24 font-bold leading-32'>
                {label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Quiz1;
