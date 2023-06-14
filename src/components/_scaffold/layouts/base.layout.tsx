import type { FCwChildren, WithSEO } from '@/types';
import { SEOConfig } from '@/utils';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';

import { ThemeToggle } from '../ui/theme-toggle';

const BaseLayout: FCwChildren<WithSEO & { btns: React.ReactNode[] }> = ({
  title,
  description,
  btns,
  children,
}) => {
  return (
    <ThemeProvider
      attribute="class"
      // defaultTheme="system"
      // enableSystem
      // enableColorScheme
    >
      <NextSeo {...SEOConfig} title={title} description={description} />
      <div className="fixed right-6 top-6 z-10 flex items-center justify-between gap-2">
        {btns?.map((btn, i) => (
          <div key={i}>{btn}</div>
        ))}
        <ThemeToggle />
      </div>
      {children}
    </ThemeProvider>
  );
};

export default BaseLayout;
