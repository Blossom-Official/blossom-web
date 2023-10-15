'use client';

import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useState } from 'react';

import { SvgIcon } from '@/common/components/svg-icon';

const images = [
  '/images/flower-4.png',
  '/images/flower-5.png',
  '/images/flower-6.png',
];

const RandomFlower = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef] = useKeenSlider(
    {
      slides: images.length,
      loop: true,
      drag: false,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
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
          }, 300);
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
    <div
      className='relative mx-auto flex h-300 max-h-300 w-250 max-w-250 items-center justify-center overflow-hidden'
      ref={sliderRef}
    >
      {images.map((src, index) => (
        <div
          className='absolute top-0 h-full w-full'
          key={index}
          style={{ opacity: currentSlide === index ? 1 : 0 }}
        >
          <Image
            fill
            alt={`flower-${index + 4}`}
            className='w-250'
            src={src}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
      <SvgIcon className='relative' height='80' id='question-mark' width='42' />
    </div>
  );
};

export default RandomFlower;
