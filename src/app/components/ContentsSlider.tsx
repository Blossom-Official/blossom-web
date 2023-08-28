import clsx from 'clsx';
import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';
import { useState } from 'react';

import { Response } from '@/api/home';
import { Photo } from '@/common/components/photo';

interface ContentsSliderProps {
  contents: Response['contents'];
}

const ContentsSlider = ({ contents }: ContentsSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout: NodeJS.Timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  return (
    <div className='relative'>
      <ul className='keen-slider' ref={sliderRef}>
        {contents.map((content) => {
          return (
            <li
              className='keen-slider__slide'
              data-item-id={content.contentId}
              key={content.contentId}
            >
              <Link href={`/contents/${content.contentId}`}>
                <div className='relative'>
                  <Photo
                    alt='temp'
                    height='98'
                    src={content.imageUrl}
                    width='158'
                  />
                  <div className='absolute bottom-8 left-8 flex flex-col gap-4 p-12 text-left'>
                    <span className='text-16 font-medium leading-24'>
                      {content.subtitle}
                    </span>
                    <span className='font-lemon-milk text-30 font-medium leading-32'>
                      {content.title}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {loaded && instanceRef.current && (
        <div className='absolute left-20 top-16 flex gap-5'>
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                className={clsx(
                  'h-4 w-4 rounded-full opacity-50',
                  currentSlide === idx ? 'bg-green-100' : 'bg-white'
                )}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentsSlider;
