'use client';

import clsx from 'clsx';

import { Photo } from '@/common/components/photo';

import { OptionKey, Options } from '../hooks';

interface Quiz1Props {
  value: Options['relationship'];
  onSelect: <T extends OptionKey>(key: T, value: Options[T]) => void;
}

const quiz1 = [
  { id: 1, imageUrl: '/images/flower-1.png', label: '친구', value: 'FRIEND' },
  { id: 2, imageUrl: '/images/flower-1.png', label: '연인', value: 'LOVER' },
  { id: 3, imageUrl: '/images/flower-1.png', label: '가족', value: 'FAMILY' },
  {
    id: 4,
    imageUrl: '/images/flower-1.png',
    label: '지인',
    value: 'ACQUAINTANCE',
  },
] as const;

const Quiz1 = ({ value: selectedValue, onSelect }: Quiz1Props) => {
  return (
    <ul className='grid grid-cols-2 grid-rows-2 gap-12 text-white'>
      {quiz1.map(({ id, imageUrl, label, value }) => {
        return (
          <li
            key={id}
            className={clsx(
              selectedValue === value ? 'bg-green-100' : 'bg-green-200'
            )}
          >
            <button
              className='relative h-full w-full'
              type='button'
              onClick={() => onSelect('relationship', value)}
            >
              <Photo alt={label} className='h-222' src={imageUrl} />
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
