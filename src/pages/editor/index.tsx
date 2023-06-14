import '@/components/shortcuts';
import type { GetServerSideProps } from 'next';
import { PaletteProvider } from '@/contexts/palette.context';
import { queryClient } from '@/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { CustomTooltip } from 'components/ui/tooltip';
import { cn } from 'lib/utils';
import { ArrowLeftRightIcon, MessageSquarePlusIcon } from 'lucide-react';

import { DefaultLayout } from '@/components/_scaffold/layouts';
import { Palette } from '@/components/palette';
import { Shortcuts } from '@/components/shortcuts';

import { useLocalStorage } from '@/hooks/use-local-storage';

interface EditorProps {
  paletteString: string;
}

const EditorPage: React.FC<EditorProps> = ({ paletteString }) => {
  const [reorder, setReorder] = useLocalStorage('reorder', false);

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultLayout
        full
        title="Palette Editor | Swatchr"
        btns={[
          <CustomTooltip
            key="reorder"
            trigger={{
              Component: (
                <button className="btn btn-square bg alpha">
                  <ArrowLeftRightIcon
                    size={18}
                    className={cn(
                      'text-foreground-invert',
                      reorder && 'text-accent'
                    )}
                  />
                </button>
              ),
              props: {
                onClick: () => setReorder(!reorder),
              },
            }}
          >
            Feedback
          </CustomTooltip>,
          <Shortcuts key="shortcuts" className={`text-foreground-invert`} />,
          <CustomTooltip
            key="feedback"
            trigger={{
              Component: (
                <button className="btn btn-square bg alpha">
                  <MessageSquarePlusIcon
                    size={18}
                    className={cn(
                      'text-foreground-invert',
                      reorder && 'text-accent'
                    )}
                  />
                </button>
              ),
              props: {},
            }}
          >
            Feedback
          </CustomTooltip>,
        ]}
      >
        <PaletteProvider colors={paletteString}>
          <Palette reorder={reorder} />
        </PaletteProvider>
      </DefaultLayout>
    </QueryClientProvider>
  );
};

export const getServerSideProps: GetServerSideProps<EditorProps> = async (
  ctx
) => {
  const paletteString = ctx?.query?.colors as string;

  return {
    props: {
      paletteString,
    },
  };
};

export default EditorPage;
