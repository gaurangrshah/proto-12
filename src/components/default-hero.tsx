import Link from 'next/link';
import type { MarkdownComponentProps } from 'lib/notion/helpers';
import { cn } from 'lib/utils';
import Markdown from 'markdown-to-jsx';

export function DefaultHero({
  elements,
  cover,
  title,
}: MarkdownComponentProps) {
  return (
    <div
      className={cn(
        title,
        'flex h-screen w-full flex-col justify-center bg-cover bg-center bg-no-repeat lg:flex-row lg:items-center'
      )}
      style={{
        backgroundImage: `url(${cover})`,
      }}
    >
      {/* <div className="before:absolute before:inset-0 before:z-0 before:bg-gradient-to-tr before:from-gray-950 before:to-transparent" /> */}
      <div className="container z-[1] mx-auto max-w-6xl px-4">
        <div className="flex h-full w-full flex-col justify-center">
          {elements?.length
            ? elements.map((element, i) => {
                return (
                  <Markdown
                    key={i}
                    options={{
                      overrides: {
                        Link: Link,
                        span: (props) => <p {...props} />,
                      },
                    }}
                  >
                    {element as string}
                  </Markdown>
                );
              })
            : null}
        </div>
      </div>
      <div className="hidden w-full md:block" aria-hidden />
    </div>
  );
}
