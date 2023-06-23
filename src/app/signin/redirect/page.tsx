'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { AuthService, http } from '@/api/core/axios';
import { BaseResponse } from '@/api/core/types';

interface Response {
  accessToken: string;
  refreshToken: string;
}

export default function Signin() {
  const router = useRouter();

  useEffect(() => {
    async function processKakaoRedirect() {
      const code = new URLSearchParams(location.search).get('code') ?? '';
      if (code) {
        const kakaoAccessToken = await getKakaoToken(code);
        if (kakaoAccessToken) {
          await http
            .post<BaseResponse<Response>>('/auth/login', {
              data: { socialType: 'KAKAO', token: kakaoAccessToken },
            })
            .then(({ data }) => {
              const {
                data: { accessToken, refreshToken },
              } = data;
              AuthService.setAccessToken(accessToken);
              AuthService.setRefreshToken(refreshToken);

              router.push('/');
            })
            .catch((error) => {
              if (error.response.data?.code === 'N002') {
                // 회원가입이 안된 유저
                http
                  .post<BaseResponse<Response>>('/auth/signup', {
                    data: { socialType: 'KAKAO', token: kakaoAccessToken },
                  })
                  .then(({ data }) => {
                    const {
                      data: { accessToken, refreshToken },
                    } = data;
                    AuthService.setAccessToken(accessToken);
                    AuthService.setRefreshToken(refreshToken);

                    router.push('/');
                  })
                  .catch((signupError) => {
                    console.error(signupError);
                  });
              }
            });
        }
      }
    }
    processKakaoRedirect();
  }, [router]);

  return <></>;
}

const getKakaoToken = async (code: string) => {
  const response = await fetch(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${
      process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
    }&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_REDIRECT_URI
    )}&code=${code}`,
    { method: 'POST' }
  );
  const { access_token: token } = await response.json();

  return token;
};
