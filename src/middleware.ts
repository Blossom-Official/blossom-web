import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { PROXY_PREFIX } from "@/common/constants";

const serviceEndpoint = process.env.NEXT_PUBLIC_SERVICE_ENDPOINT;
const serviceSubfix = process.env.NEXT_PUBLIC_SERVICE_API_SUBFIX;
const isProd = process.env.NODE_ENV === "production";
const preventedPaths = ["/signin"];

interface AuthResponse {
  code: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export async function middleware(request: NextRequest) {
  const blossomToken = request.cookies.get(
    process.env.NEXT_PUBLIC_BLOSSOM_TOKEN_KEY
  );
  const isProxy = request.nextUrl.pathname.startsWith(PROXY_PREFIX);

  /**
   * NOTE: 모든 백엔드 API는 /proxy 를 거쳐감
   * TODO: accessToken 만료 시 refresh 요청할 수 있도록 로직 작성 필요
   */
  if (isProxy) {
    const { search } = request.nextUrl;
    const pathname = request.nextUrl.pathname.substring(PROXY_PREFIX.length);
    const destination = `${serviceEndpoint}${pathname}${search}`;
    const headers = new Headers(request.headers);
    if (blossomToken) {
      headers.set("Authorization", `Bearer ${blossomToken.value}`);
    }

    return NextResponse.rewrite(destination, { request: { headers } });
  }

  // 로그인 리다이렉트
  if (request.nextUrl.pathname.startsWith("/signin/redirect")) {
    const code = request.nextUrl.searchParams.get("code") ?? "";
    if (code) {
      const kakaoAccessToken = await getKakaoToken(code);
      if (kakaoAccessToken) {
        try {
          const body = {
            socialType: "KAKAO",
            token: kakaoAccessToken,
          };
          const response = await fetch(
            `${serviceEndpoint}${serviceSubfix}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );
          // 404여도 저절로 error를 던지지 않음
          // 대신 response.ok를 이용함
          const { code, data }: AuthResponse = await response.json();
          if (!response.ok) {
            throw new Error(code);
          }
          const isJwtVerified = Boolean(data.accessToken);

          const nextUrl = request.nextUrl.clone();
          nextUrl.pathname = isJwtVerified ? "/" : "/signin";
          nextUrl.search = "";
          const redirectResponse = NextResponse.redirect(nextUrl);
          if (isJwtVerified) {
            redirectResponse.cookies.set(
              process.env.NEXT_PUBLIC_BLOSSOM_TOKEN_KEY,
              data.accessToken,
              {
                httpOnly: true,
                sameSite: "strict",
                path: "/",
                secure: isProd,
              }
            );
          }
          return redirectResponse;
        } catch (error: any) {
          // NOTE: 로그인 에러 처리
          if (error.message === "N002") {
            // 회원이 아님 -> 회원가입 요청 보냄
            try {
              const body = {
                socialType: "KAKAO",
                token: kakaoAccessToken,
              };
              const response = await fetch(
                `${serviceEndpoint}${serviceSubfix}/auth/signup`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
                }
              );

              const { code, data }: AuthResponse = await response.json();
              if (!response.ok) {
                throw new Error(code);
              }
              const isJwtVerified = Boolean(data.accessToken);

              const nextUrl = request.nextUrl.clone();
              nextUrl.pathname = isJwtVerified ? "/" : "signin";
              nextUrl.search = "";
              const redirectResponse = NextResponse.redirect(nextUrl);

              if (isJwtVerified) {
                redirectResponse.cookies.set(
                  process.env.NEXT_PUBLIC_BLOSSOM_TOKEN_KEY,
                  data.accessToken,
                  {
                    httpOnly: true,
                    sameSite: "strict",
                    path: "/",
                    secure: isProd,
                  }
                );
              }
              return redirectResponse;
            } catch (error) {
              // TODO: 회원가입 에러 처리
            }
          } else {
            request.nextUrl.pathname = "/";
            request.nextUrl.search = "";
            return NextResponse.redirect(request.nextUrl);
          }
        }
      }
    }
  }

  if (request.nextUrl.pathname.startsWith("/logout")) {
    const nextUrl = request.nextUrl.clone();
    nextUrl.pathname = "/";
    nextUrl.search = "";

    const response = NextResponse.redirect(nextUrl);
    response.cookies.set(process.env.NEXT_PUBLIC_BLOSSOM_TOKEN_KEY, "", {
      expires: new Date("Thu, 01 Jan 1999 00:00:10 GMT"),
    });

    return response;
  }

  // 토근이 있을 경우
  if (blossomToken) {
    if (
      preventedPaths.reduce(
        (acc, path) => acc || request.nextUrl.pathname.includes(path),
        false
      )
    ) {
      const nextUrl = request.nextUrl.clone();
      nextUrl.pathname = "/";
      nextUrl.search = "";

      return NextResponse.redirect(nextUrl);
    }
  }
}

const getKakaoToken = async (code: string) => {
  const response = await fetch(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${
      process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
    }&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_REDIRECT_URI
    )}&code=${code}`,
    { method: "POST" }
  );
  const { access_token: token } = await response.json();

  return token;
};
