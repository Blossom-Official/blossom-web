'use client';

export default function LikesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex h-full min-h-full flex-col'>{children}</section>
  );
}
