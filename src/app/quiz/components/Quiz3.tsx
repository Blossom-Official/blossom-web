'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { HandleSelectFn, Options } from '../hooks';

const quiz3 = [
  {
    id: 1,
    label: '인사',
    value: 'GREETING',
    imageUrl: '/images/quiz3/greeting.png',
    selectedImageUrl: '/images/quiz3/greeting-selected.png',
  },
  {
    id: 2,
    label: '존경',
    value: 'RESPECT',
    imageUrl: '/images/quiz3/respect.png',
    selectedImageUrl: '/images/quiz3/respect-selected.png',
  },
  {
    id: 3,
    label: '감사',
    value: 'THANKS',
    imageUrl: '/images/quiz3/thanks.png',
    selectedImageUrl: '/images/quiz3/thanks-selected.png',
  },
  {
    id: 4,
    label: '사랑',
    value: 'LOVE',
    imageUrl: '/images/quiz3/love.png',
    selectedImageUrl: '/images/quiz3/love-selected.png',
  },
  {
    id: 5,
    label: '위로',
    value: 'CONSOLATION',
    imageUrl: '/images/quiz3/consolation.png',
    selectedImageUrl: '/images/quiz3/consolation-selected.png',
  },
  {
    id: 6,
    label: '딱히 없음',
    value: 'NONE',
    imageUrl: '/images/quiz3/none.png',
    selectedImageUrl: '/images/quiz3/none-selected.png',
  },
] as const;

interface Quiz3Props {
  value: Options['mind'];
  onSelect: HandleSelectFn;
  onClickNext?: () => void;
}

const Quiz3 = ({ value: selectedValue, onSelect, onClickNext }: Quiz3Props) => {
  return (
    <ul className='grid grid-cols-2 gap-12 text-white'>
      {quiz3.map(({ id, imageUrl, selectedImageUrl, label, value }) => {
        return (
          <li
            key={id}
            className={clsx(
              selectedValue === value ? 'bg-green-100' : 'bg-green-200',
              'h-120'
            )}
          >
            <button
              className='relative h-full w-full'
              type='button'
              onClick={() =>
                onSelect('mind', value, { onChangeSelection: onClickNext })
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

export default Quiz3;
