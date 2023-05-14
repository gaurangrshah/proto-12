import type { FCwChildren, WithSEO } from '@/types';

import { bebas, inter } from '@/utils/fonts';
import BaseLayout from './base.layout';

export const DefaultLayout: FCwChildren<WithSEO> = ({ children, ...props }) => {
  return (
    <BaseLayout {...props}>
      <main className={`${bebas.className} my-6 p-6`}>
        <div className={`${inter.className}`}>{children}</div>
      </main>
    </BaseLayout>
  );
};
