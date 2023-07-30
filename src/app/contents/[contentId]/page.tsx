'use client';

import 'keen-slider/keen-slider.min.css';

import { Suspense } from '@suspensive/react';

import { Contents } from './components';

export default function ContentsPage({
  params,
}: {
  params: { contentId: string };
}) {
  return (
    <>
      <Suspense.CSROnly>
        <Contents contentId={params.contentId} />
      </Suspense.CSROnly>
    </>
  );
}
