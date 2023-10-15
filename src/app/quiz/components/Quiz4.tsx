'use client';

import clsx from 'clsx';

import { HandleSelectFn, Options } from '../hooks';

const quiz4 = [
  {
    id: 1,
    label: '빨강, 주황',
    value: 'RED_ORANGE',
    colors: ['#FD7672', '#FF7744'],
  },
  { id: 2, label: '노랑', value: 'YELLOW', colors: ['#FFCE00'] },
  { id: 3, label: '초록', value: 'GREEN', colors: ['#8EB35A'] },
  {
    id: 4,
    label: '파랑, 보라',
    value: 'BLUE_PURPLE',
    colors: ['#7A7EA4', '#976489'],
  },
  { id: 5, label: '분홍', value: 'PINK', colors: ['#FFCBF1'] },
  {
    id: 6,
    label: '무채색',
    value: 'ACHROMATIC',
    colors: ['#FFFFFF', '#868686', '#000000'],
  },
] as const;

interface Quiz4Props {
  value: Options['color'];
  onSelect: HandleSelectFn;
  onClickNext?: () => void;
}

const Quiz4 = ({ value: selectedValue, onSelect, onClickNext }: Quiz4Props) => {
  return (
    <ul className='grid grid-cols-2 gap-12 text-white'>
      {quiz4.map(({ id, label, value, colors }) => {
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
                onSelect('color', value, { onChangeSelection: onClickNext })
              }
            >
              <div className='absolute right-16 top-12 flex gap-8'>
                {colors.map((color, index) => (
                  <div
                    className='h-30 w-30'
                    key={index}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className='absolute bottom-12 left-16 text-24 font-bold leading-32'>
                {label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Quiz4;
