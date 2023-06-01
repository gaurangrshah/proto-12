'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from 'lib/utils';

const Provider = TooltipPrimitive.Provider;

const Root = TooltipPrimitive.Root;

const Trigger = TooltipPrimitive.Trigger;

const Portal = TooltipPrimitive.Portal;

const Arrow = TooltipPrimitive.Arrow;

const Content = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
      className
    )}
    {...props}
  />
));
Content.displayName = TooltipPrimitive.Content.displayName;

const Tooltip = { Root, Trigger, Content, Arrow, Portal, Provider };

export default Tooltip;

export type TooltipProps = {
  trigger: {
    Component: React.ReactNode;
    props: React.ComponentPropsWithoutRef<typeof Trigger>;
  };
  children: React.ReactNode;
  offset?: number;
} & React.ComponentPropsWithoutRef<typeof Content>;

export const CustomTooltip: React.FC<TooltipProps> = ({
  offset = 10,
  trigger,
  children,
  ...props
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger className="btn bg alpha" {...trigger.props}>
          {trigger.Component}
        </Tooltip.Trigger>
        <Tooltip.Content className="p-2 text-sm" sideOffset={offset} {...props}>
          {children}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
export const PortalTooltip: React.FC<TooltipProps> = ({
  offset = 10,
  trigger,
  children,
  ...props
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger {...trigger.props}>
          {trigger.Component}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-popover p-2 text-sm"
            sideOffset={offset}
            {...props}
          >
            {children}
            <TooltipPrimitive.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
