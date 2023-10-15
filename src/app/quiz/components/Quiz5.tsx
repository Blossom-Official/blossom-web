'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { HandleSelectFn, Options } from '../hooks';

const quiz5 = [
  {
    id: 1,
    label: '봄',
    value: 'SPRING',
    imageUrl: '/images/quiz5/spring.png',
    selectedImageUrl: '/images/quiz5/spring-selected.png',
  },
  {
    id: 2,
    label: '여름',
    value: 'SUMMER',
    imageUrl: '/images/quiz5/summer.png',
    selectedImageUrl: '/images/quiz5/summer-selected.png',
  },
  {
    id: 3,
    label: '가을',
    value: 'AUTUMN',
    imageUrl: '/images/quiz5/autumn.png',
    selectedImageUrl: '/images/quiz5/autumn-selected.png',
  },
  {
    id: 4,
    label: '겨울',
    value: 'WINTER',
    imageUrl: '/images/quiz5/winter.png',
    selectedImageUrl: '/images/quiz5/winter-selected.png',
  },
] as const;

interface Quiz5Props {
  value: Options['season'];
  onSelect: HandleSelectFn;
  onClickNext?: () => void;
}

const Quiz5 = ({ value: selectedValue, onSelect, onClickNext }: Quiz5Props) => {
  return (
    <ul className='grid grid-cols-2 gap-12 text-white'>
      {quiz5.map(({ id, imageUrl, selectedImageUrl, label, value }) => {
        return (
          <li
            key={id}
            className={clsx(
              selectedValue === value ? 'bg-green-100' : 'bg-green-200',
              'h-222'
            )}
          >
            <button
              className='relative h-full w-full'
              type='button'
              onClick={() =>
                onSelect('season', value, { onChangeSelection: onClickNext })
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

export default Quiz5;
