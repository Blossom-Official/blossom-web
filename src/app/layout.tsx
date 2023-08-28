import './globals.css';

import localFont from 'next/font/local';

import { OverlayProvider } from '@/common/hooks';
import { QueryClientProvider } from '@/common/react-query';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

const lemonMilk = localFont({
  src: [
    {
      path: '../../public/fonts/LEMONMILK-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Light.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-lemon-milk',
});

export const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  weight: '100 900',
  display: 'swap',
  declarations: [{ prop: 'unicode-range', value: 'U+0041-005A, U+0061-007A' }],
  variable: '--font-pretendardVariable',
});

export const metadata = {
  title: 'Blossom',
  description: '선물하고 싶은 꽃을 추천합니다',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <link as='image' href='/sprite.svg' rel='preload' type='image/svg+xml' />
      <body className={`${lemonMilk.variable} ${pretendard.variable}`}>
        <QueryClientProvider>
          <main className='relative mx-auto h-fit min-h-full max-w-[44rem] bg-green-400 font-pretendard shadow-lg'>
            <OverlayProvider>{children}</OverlayProvider>
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
