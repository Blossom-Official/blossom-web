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
      <section className='-mt-56 w-full'>
        <Suspense>
          <Contents contentId={params.contentId} />
        </Suspense>
      </section>
    </>
  );
}
