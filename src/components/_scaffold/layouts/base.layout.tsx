import type { FCwChildren, WithSEO } from '@/types';
import { SEOConfig } from '@/utils';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';

import { ThemeToggle } from '../ui/theme-toggle';

const BaseLayout: FCwChildren<WithSEO> = ({ title, description, children }) => {
  return (
    <ThemeProvider
      attribute="class"
      // defaultTheme="system"
      // enableSystem
      // enableColorScheme
    >
      <NextSeo {...SEOConfig} title={title} description={description} />
      <ThemeToggle />
      {children}
    </ThemeProvider>
  );
};

export default BaseLayout;
