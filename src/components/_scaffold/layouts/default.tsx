import type { FCwChildren, WithSEO } from '@/types';

import { bebas, inter } from '@/utils/fonts';
import BaseLayout from './base';

export const DefaultLayout: FCwChildren<
  WithSEO & { full?: boolean; btns: React.ReactNode[] }
> = ({ full, children, ...props }) => {
  return (
    <BaseLayout {...props}>
      <main
        className={`${full ? '' : 'my-6 p-6'} ${inter.variable} ${
          bebas.variable
        } flex-center relative flex-col font-sans`}
      >
        {children}
      </main>
    </BaseLayout>
  );
};