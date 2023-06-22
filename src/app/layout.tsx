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
      style: 'bold',
    },
    {
      path: '../../public/fonts/LEMONMILK-Light.otf',
      weight: '300',
      style: 'light',
    },
  ],
  display: 'swap',
  declarations: [{ prop: 'unicode-range', value: 'U+0041-005A, U+0061-007A' }],
  variable: '--font-lemon-milk',
});

export const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-pretendardVariable',
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <OverlayProvider>
            <main className='relative mx-auto min-h-[100vh] max-w-[44rem] bg-white font-pretendard shadow-lg'>
              {children}
            </main>
          </OverlayProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
