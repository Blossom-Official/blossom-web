"use client";

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-center bg-green-800 px-20">
        {children}
      </section>
    </>
  );
}
