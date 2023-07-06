'use client';

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative flex h-full min-h-full flex-col justify-center bg-[url('/images/background-image.png')] px-20">
        {children}
      </section>
    </>
  );
}
