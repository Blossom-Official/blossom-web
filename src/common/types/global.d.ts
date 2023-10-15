declare global {
  interface Window {
    Kakao: any;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_KAKAO_REST_API_KEY: string;
    NEXT_PUBLIC_REDIRECT_URI: string;
    NEXT_PUBLIC_SERVICE_ENDPOINT: string;
    NEXT_PUBLIC_SERVICE_API_SUBFIX: string;
    NEXT_PUBLIC_ACCESS_TOKEN_KEY: string;
    NEXT_PUBLIC_REFRESH_TOKEN_KEY: string;
  }
}
