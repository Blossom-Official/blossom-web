'use client';

import clsx from 'clsx';

import { OptionKey, Options } from '../hooks';

interface Quiz4Props {
  value: Options['vibe'];
  onSelect: <T extends OptionKey>(key: T, value: Options[T]) => void;
}

const quiz5 = [
  { id: 1, label: '차갑고 도도한', value: 'COLD_HAUGHTY' },
  { id: 2, label: '밝고 사랑스러움', value: 'BRIGHT_LOVELY' },
  { id: 3, label: '조용하고 차분한', value: 'QUIET_CALM' },
  { id: 4, label: '활동적인', value: 'ACTIVE' },
] as const;

const Quiz4 = ({ value: selectedValue, onSelect }: Quiz4Props) => {
  return (
    <ul className='grid grid-cols-2 gap-12 text-white'>
      {quiz5.map(({ id, label, value }) => {
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
              onClick={() => onSelect('vibe', value)}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Quiz4;
