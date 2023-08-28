import clsx from 'clsx';

import { useGetFlowerLikes } from '@/api/flower-like';
import { Photo } from '@/common/components/photo';
import { SvgIcon } from '@/common/components/svg-icon';

interface LikesListProps {
  editMode: boolean;
  onSelect: (flowerId: number) => void;
  isSelected: (flowerId: number) => boolean;
}

const LikesList = ({ editMode, onSelect, isSelected }: LikesListProps) => {
  const flowerLikes = useGetFlowerLikes();

  return (
    <div className='grow p-20 text-white'>
      {flowerLikes.data.flowers.length === 0 ? (
        <p className='flex h-full items-center justify-center text-16-light-24 text-grey'>
          아직 찜한 꽃이 없어요!
        </p>
      ) : (
        <>
          {!editMode && (
            <div className='mb-12 text-14-light-24'>
              총 {flowerLikes.data.totalCount}건
            </div>
          )}
          <ul className='grid grid-cols-2 gap-20'>
            {flowerLikes.data.flowers.map((flower) => {
              return (
                <li data-item-id={flower.flowerId} key={flower.flowerId}>
                  <button
                    disabled={!editMode}
                    onClick={() => onSelect(flower.flowerId)}
                  >
                    <div className='relative'>
                      <Photo
                        alt={flower.koreanName}
                        height='98'
                        src={flower.imageUrl}
                        width='158'
                      />
                      <div className='absolute bottom-8 left-8 flex flex-col text-left'>
                        <span className='text-14-regular-24'>
                          {flower.koreanName}
                        </span>
                        <span className='font-lemon-milk text-10-regular-12'>
                          {flower.englishName}
                        </span>
                      </div>
                      <div
                        className={clsx([
                          isSelected(flower.flowerId)
                            ? 'absolute inset-0 flex items-center justify-center bg-black/70'
                            : 'hidden',
                        ])}
                      >
                        <SvgIcon height='24' id='done' role='img' width='24' />
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default LikesList;
