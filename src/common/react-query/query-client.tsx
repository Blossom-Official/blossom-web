'use client';

import type { DehydratedState } from '@tanstack/react-query';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface Props {
  hydrateState?: DehydratedState;
  children: ReactNode;
}

const QueryClientProvider = ({ hydrateState, children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            useErrorBoundary: true,
            staleTime: 1000 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <TanStackQueryClientProvider client={queryClient}>
      <Hydrate state={hydrateState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </TanStackQueryClientProvider>
  );
};
export default QueryClientProvider;
