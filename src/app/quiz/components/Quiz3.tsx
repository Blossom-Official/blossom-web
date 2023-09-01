'use client';

import clsx from 'clsx';

import { OptionKey, Options } from '../hooks';

interface Quiz3Props {
  value: Options['mind'];
  onSelect: <T extends OptionKey>(key: T, value: Options[T]) => void;
}

const quiz3 = [
  { id: 1, label: '인사', value: 'GREETING' },
  { id: 2, label: '존경', value: 'RESPECT' },
  { id: 3, label: '감사', value: 'THANKS' },
  { id: 4, label: '사랑', value: 'LOVE' },
  { id: 5, label: '위로', value: 'CONSOLATION' },
  { id: 6, label: '딱히 없음', value: 'NONE' },
] as const;

const Quiz3 = ({ value: selectedValue, onSelect }: Quiz3Props) => {
  return (
    <ul className='grid grid-cols-2 gap-12 text-white'>
      {quiz3.map(({ id, label, value }) => {
        return (
          <li
            key={id}
            className={clsx(
              selectedValue === value ? 'bg-green-100' : 'bg-green-200',
              'h-120'
            )}
          >
            <button
              className='relative h-full w-full text-24 font-bold leading-32'
              type='button'
              onClick={() => onSelect('mind', value)}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Quiz3;
