import { ReactNode } from 'react';

import { Header } from './components';

export default function ContentsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className='flex h-full flex-col'>
        <Header />
        {children}
      </section>
    </>
  );
}
