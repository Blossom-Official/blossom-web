'use client';

import clsx from 'clsx';

import { Photo } from '@/common/components/photo';

import { OptionKey, Options } from '../hooks';

interface Quiz2Props {
  value: Options['age'];
  onSelect: <T extends OptionKey>(key: T, value: Options[T]) => void;
}

const quiz2 = [
  {
    id: 1,
    imageUrl: '/images/quiz2/twenty.png',
    label: '20대',
    value: 'TWENTY',
  },
  {
    id: 2,
    imageUrl: '/images/quiz2/thirty.png',
    label: '30대',
    value: 'THIRTY',
  },
  { id: 3, imageUrl: '/images/quiz2/forty.png', label: '40대', value: 'FORTY' },
  {
    id: 4,
    imageUrl: '/images/quiz2/above.png',
    label: '그 이상',
    value: 'ABOVE',
  },
] as const;

const Quiz2 = ({ value: selectedValue, onSelect }: Quiz2Props) => {
  return (
    <ul className='flex flex-col gap-12 text-white'>
      {quiz2.map(({ id, imageUrl, label, value }) => {
        return (
          <li className='relative h-122 w-full' key={id}>
            <button
              className='h-full w-full'
              type='button'
              onClick={() => onSelect('age', value)}
            >
              <div
                className={clsx(
                  'absolute inset-0',
                  selectedValue === value ? 'bg-green-100' : 'bg-green-200'
                )}
              ></div>
              <Photo alt={label} className='h-full' src={imageUrl} />
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
