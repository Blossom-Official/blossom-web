"use client";

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-center bg-[url('/images/background-image.png')] px-20">
        {children}
      </section>
    </>
  );
}
