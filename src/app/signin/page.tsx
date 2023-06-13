'use client';

import { useRouter } from 'next/navigation';

export default function Signin() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/api/auth/signin');
  };

  return (
    <>
      <button onClick={handleButtonClick}>카카오 로그인</button>
    </>
  );
}
