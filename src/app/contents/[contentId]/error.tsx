'use client';

import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-full flex-col items-center justify-center text-16-light-24 text-grey'>
      <h2>
        {isAxiosError(error) && error.response?.status == 404
          ? error.response?.data.message
          : 'Something is wrong!'}
      </h2>
      <button
        onClick={() => {
          router.back();
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
}
