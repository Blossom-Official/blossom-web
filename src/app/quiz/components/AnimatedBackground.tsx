'use client';

import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useState } from 'react';

const images = [
  '/images/flower-1.png',
  '/images/flower-2.png',
  '/images/flower-3.png',
];

const AnimatedBackground = () => {
  const [opacities, setOpacities] = useState<number[]>([]);

  const [sliderRef] = useKeenSlider(
    {
      slides: images.length,
      loop: true,
      drag: false,
      detailsChanged(s) {
        const newOpacities = s.track.details.slides.map(
          (slide) => slide.portion
        );
        setOpacities(newOpacities);
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
          }, 3000);
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
    <div className='relative h-[100dvh] overflow-hidden' ref={sliderRef}>
      {images.map((src, index) => (
        <div
          className='absolute top-0 h-full w-full'
          key={index}
          style={{ opacity: opacities[index] }}
        >
          <Image
            fill
            alt={`flower-${index + 1}`}
            src={src}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
