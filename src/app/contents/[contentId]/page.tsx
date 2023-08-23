'use client';

import 'keen-slider/keen-slider.min.css';

import { Suspense } from '@suspensive/react';

import { Contents, Header } from './components';

export default function ContentsPage({
  params,
}: {
  params: { contentId: string };
}) {
  return (
    <>
      <Header />
      <Suspense.CSROnly>
        <Contents contentId={params.contentId} />
      </Suspense.CSROnly>
    </>
  );
}
