import type { FCwChildren, WithSEO } from '@/types';

import { bebas, inter } from '@/utils/fonts';
import BaseLayout from './base.layout';

export const DefaultLayout: FCwChildren<WithSEO> = ({ children, ...props }) => {
  return (
    <BaseLayout {...props}>
      <main
        className={`${bebas.className} font-inter flex h-screen w-full flex-col`}
      >
        <div className={`${inter.className}`}>{children}</div>
      </main>
    </BaseLayout>
  );
};
