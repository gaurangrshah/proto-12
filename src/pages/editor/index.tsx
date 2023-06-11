import '@/components/shortcuts';
import type { GetServerSideProps } from 'next';
import { PaletteProvider } from '@/contexts/palette.context';
import { queryClient } from '@/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { cn } from 'lib/utils';
import { ArrowLeftRightIcon } from 'lucide-react';

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
      <DefaultLayout full title="Palette Editor | Swatchr">
        <PaletteProvider colors={paletteString}>
          <Palette reorder={reorder} />
        </PaletteProvider>
        <Shortcuts className={`fixed right-16 top-10 text-foreground-invert`} />
        <button
          aria-label="reorder"
          className={'btn btn-square bg alpha fixed right-24 top-10 mr-2'}
          onClick={() => setReorder(!reorder)}
        >
          <ArrowLeftRightIcon
            size={20}
            className={cn('text-foreground-invert', reorder && 'text-accent')}
          />
        </button>
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
