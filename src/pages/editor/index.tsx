import '@/components/shortcuts';
import type { GetServerSideProps } from 'next';
import { PaletteProvider } from '@/contexts/palette.context';
import { queryClient } from '@/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  CustomDropdownMenu,
  DropdownItems,
  DropdownMenuCheckboxItem,
} from 'components/ui/dropdown-menu';
import { CustomTooltip } from 'components/ui/tooltip';
import { usePrefs } from 'lib/nedb/queries';
import { cn } from 'lib/utils';
import { ArrowLeftRightIcon, MessageSquarePlusIcon } from 'lucide-react';

import { DefaultLayout } from '@/components/_scaffold/layouts';
import { ColorMixIcon } from '@/components/icons/color-mix';
import { Palette } from '@/components/palette';
import { Shortcuts } from '@/components/shortcuts';

import { useLocalStorage } from '@/hooks/use-local-storage';

interface EditorProps {
  paletteString: string;
}

const EditorPage: React.FC<EditorProps> = ({ paletteString }) => {
  const [reorder, setReorder] = useLocalStorage('reorder', false);
  const { data: prefs } = usePrefs();

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
            Reorder Swatches
          </CustomTooltip>,
          <CustomTooltip
            key="mode"
            trigger={{
              Component: (
                <CustomDropdownMenu
                  trigger={{
                    Component: (
                      <button className="btn btn-square bg alpha">
                        <ColorMixIcon
                          className={cn(
                            'h-5 w-5 fill-current text-foreground-invert'
                          )}
                        />
                      </button>
                    ),
                    props: {},
                  }}
                >
                  <DropdownItems label="Color Modes">
                    <DropdownMenuCheckboxItem checked={prefs?.mode === 'hex'}>
                      Hex
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={false}
                      className="text-muted"
                      disabled
                    >
                      <div className="flex-center justify-between gap-4">
                        <p>RGB</p>
                        <p className="ml-2 rounded-sm bg-accent p-1 text-xs font-semibold text-foreground-invert">
                          soon
                        </p>
                      </div>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={false}
                      className="text-muted"
                      disabled
                    >
                      <div className="flex-center justify-between gap-4">
                        <p>HSL</p>
                        <p className="ml-2 rounded-sm bg-accent p-1 text-xs font-semibold text-foreground-invert">
                          soon
                        </p>
                      </div>
                    </DropdownMenuCheckboxItem>
                  </DropdownItems>
                </CustomDropdownMenu>
              ),
              props: {
                onClick: () => console.log('mode', prefs?.mode),
              },
            }}
          >
            Color Mode
          </CustomTooltip>,
          <Shortcuts key="shortcuts" className={`text-foreground-invert`} />,
          <CustomTooltip
            key="feedback"
            trigger={{
              Component: (
                <button className="btn btn-square bg alpha">
                  <MessageSquarePlusIcon
                    size={18}
                    className={cn('text-foreground-invert')}
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
