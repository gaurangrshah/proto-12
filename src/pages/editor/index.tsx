import type { GetServerSideProps } from 'next';
import { convertPalette } from '@/utils';

import { DefaultLayout } from '@/components/_scaffold/layouts';
import { PaletteEditor } from '@/components/palette';

interface EditorProps {
  colors: string[];
}

const EditorPage: React.FC<EditorProps> = ({ colors }) => {
  return (
    <DefaultLayout full title="Palette Editor | Swatchr">
      <PaletteEditor colors={colors} />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<EditorProps> = async (
  ctx
) => {
  const colors = convertPalette.parse(ctx?.query?.colors as string);

  return {
    props: {
      colors: colors?.length ? colors : ['#BADA55'],
    },
  };
};

export default EditorPage;
