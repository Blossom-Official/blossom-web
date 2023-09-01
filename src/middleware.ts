import { type NextRequest, NextResponse } from 'next/server';

const categories = ['ALL', 'LOVE', 'THANKS', 'CHEERING', 'CELEBRATE'];

const hasValidCategory = (category: string) => categories.includes(category);

export default function middleware(req: NextRequest) {
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
}
