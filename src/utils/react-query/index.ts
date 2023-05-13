import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set the cache time to one day (in milliseconds)
      cacheTime: 1000 * 60 * 60 * 24,
      // Set stale time to one hour (in milliseconds)
      // staleTime: 1000 * 60 * 60,
    },
  },
});

export const disableQuery = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  refetchIntervalInBackground: false,
  retry: false,
  keepPreviousData: false,
} as const;
