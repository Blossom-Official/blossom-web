import { redirect } from 'next/navigation';

export async function GET() {
  redirect(
    `https://kauth.kakao.com/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
    }&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_REDIRECT_URI
    )}&response_type=code`
  );
}
