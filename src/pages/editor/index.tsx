import '@/components/shortcuts';
import type { GetServerSideProps } from 'next';
import { PaletteProvider } from '@/contexts/palette.context';
import { queryClient } from '@/utils';
import { QueryClientProvider } from '@tanstack/react-query';

import { DefaultLayout } from '@/components/_scaffold/layouts';
import { Palette } from '@/components/palette';
import { Shortcuts } from '@/components/shortcuts';

interface EditorProps {
  paletteString: string;
}

const EditorPage: React.FC<EditorProps> = ({ paletteString }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultLayout full title="Palette Editor | Swatchr">
        <PaletteProvider colors={paletteString}>
          <Palette />
        </PaletteProvider>
        <Shortcuts className="fixed right-16 top-10" />
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
