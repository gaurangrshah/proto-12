import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getAnonId } from '@/utils';
// import { api } from '@/utils/api';
import { analytics } from 'lib/analytics';

interface IAnalytics {
  asPath: string;
}

/**
 *
 * NOTE: add server route to get ip
 */
export const CustomAnalytics: React.FC<IAnalytics> = ({ asPath }) => {
  const { data: session, status } = useSession();
  // const { data: ip } = api.server.ip.useQuery();
  useEffect(() => {
    analytics.page();
  }, [asPath]);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      const anon = getAnonId();
      analytics.identify(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        anon!,
        {
          category: 'anon',
          label: 'anon-user',
          value: 1,
        },
        // () => console.log('Identified anon user', anon, ip)
        () => console.log('Identified anon user', anon)
      );
    }
    // }, [session, status, ip]);
  }, [session, status]);

  return null;
};
