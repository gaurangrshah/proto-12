import type { FCwChildren, WithSEO } from '@/types';

import { bebas, inter } from '@/utils/fonts';
import BaseLayout from './base.layout';

export const DefaultLayout: FCwChildren<WithSEO> = ({ children, ...props }) => {
  return (
    <BaseLayout {...props}>
      <main
        className={`my-6 p-6 ${inter.variable} ${bebas.variable} font-sans`}
      >
        {children}
      </main>
    </BaseLayout>
  );
};
