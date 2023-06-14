import { useEditableControls } from '@/hooks';
import { isBrowser, motion } from 'framer-motion';

export const Swatch: React.FC<{
  swatch: string;
  updateColor: ({ color }: { color: string }) => void;
}> = ({ swatch, updateColor }) => {
  const { ref, props: editableProps } = useEditableControls<HTMLDivElement>({
    onEnter: (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const newColor = '#' + e.currentTarget.textContent?.trim();
      if (!newColor || newColor === swatch) return;
      updateColor({
        color: newColor ?? swatch,
      });
    },
  });

  const replaced = swatch.replace('#', '');

  const handleBlur = () => {
    if (!isBrowser) return;
    // @HACK: unselects all selected text from contenteditable div
    // @SEE: https://stackoverflow.com/a/37923136
    // @SEE: #gvttuW
    window.getSelection()?.removeAllRanges();
  };

  return (
    <motion.div
      initial={{ boxShadow: '0px 0px 20px rgba(0,0,0, 0.05)' }}
      whileHover={{ boxShadow: '0px 0px 20px rgba(0,0,0, 0.25)' }}
      whileTap={{ boxShadow: '0px 0px 20px rgba(0,0,0, 0.25)' }}
      transition={{ duration: 0.33, ease: 'easeInOut', delay: 0.3 }}
      className="relative flex h-56 w-56 cursor-pointer flex-col items-center justify-center rounded-lg"
      onBlur={handleBlur}
    >
      <div className="flex h-44 w-44 items-center justify-center">
        <div className="mr-1 select-none font-dec text-5xl opacity-80">#</div>
        <div
          ref={ref}
          aria-label="hex-input"
          role="textbox"
          contentEditable={true}
          suppressContentEditableWarning={true}
          data-placeholder={replaced}
          className="z-[2] cursor-text p-1 font-dec text-5xl opacity-80 selection:bg-accent/30 selection:text-background/30"
          {...editableProps}
          onBlur={(e) => {
            if (!e.currentTarget.textContent) {
              e.currentTarget.textContent = replaced; // swatch.replace('#', '');
            }
            e.currentTarget.textContent.trim();
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {replaced}
        </div>
      </div>
    </motion.div>
  );
};
