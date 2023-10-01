import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import SuperJSON from 'superjson';

import { getBaseUrl } from '@documenso/lib/universal/get-base-url';

import { AppRouter } from '../server/router';

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,

  links: [
    loggerLink({
      enabled: (opts) =>
        (!process.env.VERCEL && typeof window !== 'undefined') ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

export { TRPCClientError } from '@trpc/client';
