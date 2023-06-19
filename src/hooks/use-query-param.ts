import type { ParsedUrlQueryInput } from 'querystring';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

export function useQueryParam<T>(
  queryKey: string
): [T | undefined, (newValue: T) => void] {
  const router = useRouter();
  const queryValue = router.query[queryKey] as T | undefined;
  const [parsed, setParsed] = useState<T | undefined>();

  const updateQueryValue = useCallback(
    (newValue: T) => {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            [queryKey]: JSON.stringify(newValue as string[]),
          } as ParsedUrlQueryInput,
        },
        undefined,
        { shallow: true }
      );
    },
    [router, queryKey]
  );

  useEffect(() => {
    setParsed(JSON.parse(queryValue as string) as T);
  }, [queryValue]);

  useEffect(() => {
    const handlePopstate = () => {
      let newQueryValue = router.query[queryKey] as string | undefined | T;
      if (newQueryValue !== queryValue) {
        newQueryValue = JSON.parse(newQueryValue as string) as T;
        updateQueryValue(newQueryValue);
        setParsed(newQueryValue);
      }
      return;
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [router, queryKey, queryValue, updateQueryValue]);

  return useMemo(() => [parsed, updateQueryValue], [parsed, updateQueryValue]);
}
