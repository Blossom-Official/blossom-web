import { Header } from './components';

export default function RedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex min-h-screen flex-col'>
      <Header />
      {children}
    </section>
  );
}
