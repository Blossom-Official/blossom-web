'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { HandleSelectFn, Options } from '../hooks';

const quiz2 = [
  {
    id: 1,
    imageUrl: '/images/quiz2/twenty.png',
    selectedImageUrl: '/images/quiz2/twenty-selected.png',
    label: '20대',
    value: 'TWENTY',
  },
  {
    id: 2,
    imageUrl: '/images/quiz2/thirty.png',
    selectedImageUrl: '/images/quiz2/thirty-selected.png',
    label: '30대',
    value: 'THIRTY',
  },
  {
    id: 3,
    imageUrl: '/images/quiz2/forty.png',
    selectedImageUrl: '/images/quiz2/forty-selected.png',
    label: '40대',
    value: 'FORTY',
  },
  {
    id: 4,
    imageUrl: '/images/quiz2/above.png',
    selectedImageUrl: '/images/quiz2/above-selected.png',
    label: '그 이상',
    value: 'ABOVE',
  },
] as const;

interface Quiz2Props {
  value: Options['age'];
  onSelect: HandleSelectFn;
  onClickNext?: () => void;
}

const Quiz2 = ({ value: selectedValue, onSelect, onClickNext }: Quiz2Props) => {
  return (
    <ul className='flex flex-1 flex-col gap-12 text-white'>
      {quiz2.map(({ id, imageUrl, selectedImageUrl, label, value }) => {
        return (
          <li
            key={id}
            className={clsx(
              'h-112',
              selectedValue === value ? 'bg-green-100' : 'bg-green-200'
            )}
          >
            <button
              className='relative h-full w-full'
              type='button'
              onClick={() =>
                onSelect('age', value, { onChangeSelection: onClickNext })
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

export default Quiz2;
