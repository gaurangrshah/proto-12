'use client';

import * as React from 'react';
import { getContrastColor, isDev } from '@/utils';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from 'lib/utils';
import { Check, ChevronRight, Circle } from 'lucide-react';

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-foreground data-[state=open]:bg-accent',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in slide-in-from-left-1',
      className
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80',
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold text-foreground',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-foreground/30',
        className
      )}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

export type ContextMenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  sub?: ContextMenuItem[];
  shortcut?: string;
  active?: boolean;
};

export type ContextMenuProps = {
  items: ContextMenuItem[];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof ContextMenuContent>;

export const CustomContextMenuItem: React.FC<{ item: ContextMenuItem }> = ({
  item,
}) => (
  <ContextMenuItem asChild>
    {item?.sub ? (
      <CustomContextMenuSub
        sub={item.sub}
        label={item?.label}
        icon={item?.icon}
      />
    ) : (
      <div
        className="flex-center-full"
        onClick={item?.onClick ? item?.onClick : undefined}
      >
        {item?.icon ? <div className="mr-2">{item.icon}</div> : null}
        <ContextMenuLabel className="text-xs">{item.label}</ContextMenuLabel>
        {item?.href ? <a>{item.href}</a> : null}
        {item?.shortcut ? (
          <div className="border-muted ml-3 rounded-md border p-1 text-xs text-card-foreground group-data-[disabled]:text-foreground/30 group-data-[highlighted]:text-popover-foreground">
            {item.shortcut}
          </div>
        ) : null}
      </div>
    )}
  </ContextMenuItem>
);

export const CustomContextMenuSub: React.FC<{
  sub: ContextMenuItem['sub'];
  label: string;
  icon?: React.ReactNode;
}> = ({ sub, label, icon }) => {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>
        {icon ? <div className="mr-4">{icon}</div> : null}
        {label}
        <div className="ml-auto pl-5 text-foreground group-data-[disabled]:text-foreground/40 group-data-[highlighted]:text-foreground">
          <ChevronRightIcon />
        </div>
      </ContextMenuSubTrigger>
      <ContextMenuSubContent>
        {sub?.length ? (
          sub.map((item) => (
            <CustomContextMenuItem key={item.label} item={item} />
          ))
        ) : (
          <ContextMenuLabel>No Actions Available</ContextMenuLabel>
        )}
      </ContextMenuSubContent>
      <ContextMenuSeparator />
    </ContextMenuSub>
  );
};

export const CustomContextMenu: React.FC<
  ContextMenuProps & { swatch: string }
> = ({ title, items, swatch, children, ...props }) => {
  if (isDev) return <>{children}</>;
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="font-sans" {...props}>
        <>
          {title ? (
            <>
              <ContextMenuLabel
                className="flex w-full justify-between"
                style={{
                  backgroundColor: swatch,
                  color: getContrastColor(swatch ?? '#BADA55'),
                }}
              >
                <p className="text-sm">{title}</p>
                <p className="text-sm">{swatch}</p>
              </ContextMenuLabel>
              <ContextMenuSeparator />
            </>
          ) : null}
          {items?.length ? (
            items.map((item) => (
              <CustomContextMenuItem key={item.label} item={item} />
            ))
          ) : (
            <ContextMenuLabel>No Actions Available</ContextMenuLabel>
          )}
        </>
      </ContextMenuContent>
    </ContextMenu>
  );
};
