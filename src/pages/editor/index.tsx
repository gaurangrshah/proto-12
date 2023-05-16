import type { GetServerSideProps } from 'next';
import { convertPalette } from '@/utils';

import { DefaultLayout } from '@/components/_scaffold/layouts';
import { PaletteEditor } from '@/components/palette';

interface EditorProps {
  colors: string[];
}

const EditorPage: React.FC<EditorProps> = ({ colors }) => {
  return (
    <DefaultLayout full>
      <div className="h-screen w-full">
        <PaletteEditor colors={colors} />
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<EditorProps> = async (
  context
) => {
  const { query: ctxQuery } = context;

  const query = ctxQuery?.colors as string;

  const colors = convertPalette.parse(query);
  return {
    props: {
      colors: colors?.length ? colors : ['#BADA55'],
    },
  };
};

export default EditorPage;
