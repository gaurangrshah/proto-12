import type { FCwChildren, WithSEO } from '@/types';
import { SEOConfig } from '@/utils';
import { NextSeo } from 'next-seo';

import { ThemeToggle } from '../ui/theme-toggle';

const BaseLayout: FCwChildren<WithSEO> = ({ title, description, children }) => {
  return (
    <>
      <NextSeo {...SEOConfig} title={title} description={description} />
      <ThemeToggle />
      {children}
    </>
  );
};

export default BaseLayout;
