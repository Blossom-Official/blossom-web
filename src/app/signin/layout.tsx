'use client';

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>{children}</section>
    </>
  );
}
