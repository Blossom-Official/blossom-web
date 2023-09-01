import Link from 'next/link';
import { Fragment } from 'react';

import { Response } from '@/api/home';
import { Photo } from '@/common/components/photo';

interface PopularFlowersProps {
  flowers: Response['flowers'];
}
const PopularFlowers = ({ flowers }: PopularFlowersProps) => {
  return (
    <>
      <ul className='grid grid-cols-2 grid-rows-2 gap-8'>
        {flowers.map((flower, index) => {
          return (
            <Fragment key={flower.flowerId}>
              {index === 0 && (
                <li className='relative col-span-2'>
                  <Link href={`/flowers/${flower.flowerId}`}>
                    <Photo
                      alt={flower.koreanName}
                      height={108}
                      sizes='(max-width: 440px): 100vw, 440px'
                      src={flower.imageUrl}
                      width={335}
                    />
                    <div className='absolute inset-0 flex flex-col justify-between p-12'>
                      <span className='font-lemon-milk text-30 font-light leading-32'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className='text-24 font-bold leading-32'>
                        {flower.koreanName}
                      </span>
                    </div>
                  </Link>
                </li>
              )}
              {index !== 0 && (
                <li className='relative'>
                  <Link href={`/flowers/${flower.flowerId}`}>
                    <Photo
                      alt={flower.koreanName}
                      height={44}
                      sizes='(max-width: 440px): 50vw, 200px'
                      src={flower.imageUrl}
                      width={164}
                    />
                    <div className='absolute inset-0 flex gap-9 p-12'>
                      <span className='font-lemon-milk text-16 leading-24'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className='text-16 font-medium leading-24'>
                        {flower.koreanName}
                      </span>
                    </div>
                  </Link>
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default PopularFlowers;
