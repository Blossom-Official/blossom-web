import { type NextRequest, NextResponse } from 'next/server';

const categories = ['ALL', 'LOVE', 'THANKS', 'CHEERING', 'CELEBRATE'];

const serviceEndpoint = process.env.NEXT_PUBLIC_SERVICE_ENDPOINT;
const serviceSubfix = process.env.NEXT_PUBLIC_SERVICE_API_SUBFIX;

const accessTokenKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY;

const hasValidCategory = (category: string) => categories.includes(category);

export default async function middleware(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category');

  if (req.nextUrl.pathname.startsWith('/category')) {
    if ((category && !hasValidCategory(category)) || !category) {
      // if the category is invalid, we can redirect as /category?category=ALL
      return NextResponse.redirect(
        new URL('/category?category=ALL', req.nextUrl)
      );
    }
    // if the category is valid, we can return early and let the request continue
    return NextResponse.next();
  }

  const hasBlossomAccessToken = req.cookies.has(accessTokenKey);
  const accessTokenCookie = req.cookies.get(accessTokenKey);

  if (req.nextUrl.pathname.startsWith('/signin')) {
    if (hasBlossomAccessToken) {
      if (await isValidAccessToken(accessTokenCookie!.value)) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
      }
      req.cookies.delete(accessTokenKey);
      req.cookies.delete(refreshTokenKey);

      return NextResponse.next();
    }
  }

  if (req.nextUrl.pathname.startsWith('/likes')) {
    if (hasBlossomAccessToken) {
      if (!(await isValidAccessToken(accessTokenCookie!.value))) {
        req.cookies.delete(accessTokenKey);
        req.cookies.delete(refreshTokenKey);
        return NextResponse.redirect(new URL('/', req.nextUrl));
      }

      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
}

/**
 * 사용자 프로필을 조회해 access token 유효 여부를 판단하는 함수
 */
const isValidAccessToken = async (token: string) => {
  try {
    const response = await fetch(
      `${serviceEndpoint}${serviceSubfix}/user/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      return true;
    }
  } catch (err) {
    return false;
  }
};
