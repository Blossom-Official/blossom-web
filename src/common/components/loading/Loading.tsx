'use client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import lottie from 'lottie-web/build/player/lottie_light.min.js';
import { useEffect, useRef } from 'react';

import loading from './loading.json';

const Loading = () => {
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadingAnimation = lottie.loadAnimation({
      container: loadingRef.current as HTMLDivElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loading,
    });

    return () => {
      loadingAnimation?.destroy();
    };
  }, []);

  return <div ref={loadingRef} />;
};

export default Loading;
