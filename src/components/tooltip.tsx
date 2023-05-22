import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export const Tooltip: React.FC<{
  content: React.ReactNode;
  children: React.ReactNode;
}> = ({ content, children }) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal className="font-[var(--inter-font)]">
          <TooltipPrimitive.Content
            className="select-none rounded-[4px] bg-background px-[15px] py-[10px] font-sans text-[15px] leading-none text-foreground shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=boTooltipPrimitiveom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
          >
            <div className="font-sans">{content}</div>
            <TooltipPrimitive.Arrow className="fill-background" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
