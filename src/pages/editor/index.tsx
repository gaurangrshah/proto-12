import type { GetServerSideProps } from 'next';
import { PaletteProvider } from '@/contexts/palette.context';

import { DefaultLayout } from '@/components/_scaffold/layouts';
import { Palette } from '@/components/palette';

interface EditorProps {
  paletteString: string;
}

const EditorPage: React.FC<EditorProps> = ({ paletteString }) => {
  return (
    <DefaultLayout full title="Palette Editor | Swatchr">
      <PaletteProvider colors={paletteString}>
        <Palette />
      </PaletteProvider>
    </DefaultLayout>
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
