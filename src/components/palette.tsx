import { usePaletteState } from '@/contexts/palette.context';

import { SwatchWrapper } from './swatch';

export const Palette: React.FC = () => {
  const { palette } = usePaletteState();
  return (
    <div className="palette flex-responsive-full">
      {palette?.length
        ? palette.map((swatch, i) => {
            return <SwatchWrapper key={swatch} index={i} swatch={swatch} />;
          })
        : null}
    </div>
  );
};
