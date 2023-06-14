import { Popover } from '@headlessui/react';

const SHORTCUT_MODIFIERS = {
  alt: '⌥',
  shift: '⇧',
  ctrl: '⌃',
  meta: '⌘',
};

export type ShortcutItem = {
  modifier?: keyof typeof SHORTCUT_MODIFIERS;
  keyName: string;
  combo?: boolean;
  action: string;
};

const SWATCH_ACTIONS: ShortcutItem[] = [
  {
    action: 'Generate Random Color',
    keyName: 'Space',
  },
];

const PALETTE_NAVIGATION: ShortcutItem[] = [
  {
    action: 'Next Swatch',
    keyName: '▶',
    modifier: 'alt',
    combo: true,
  },
  {
    action: 'Prev Swatch',
    keyName: '▶',
    modifier: 'alt',
    combo: true,
  },
];

export const StandardShortcutItem = ({
  modifier,
  keyName,
  combo = false,
  action,
}: ShortcutItem) => {
  return (
    <li className="flex h-auto w-full items-center justify-between">
      <p className="text-sm">{action}</p>
      <div className="flex-center gap-2 text-foreground">
        {combo && modifier && (
          <div className="flex-center h-6 w-6 rounded-md border bg-background/30 p-1 py-2 text-sm font-bold shadow-md">
            {SHORTCUT_MODIFIERS[modifier]}
          </div>
        )}
        <>
          {combo && <>+</>}
          <div className="flex-center h-6 w-full rounded-md border bg-background/30 px-2 text-sm font-semibold shadow-md">
            {keyName}
          </div>
        </>
      </div>
    </li>
  );
};

export const ShortCut = ({
  title,
  shortcuts,
  info,
}: {
  title: string;
  shortcuts: ShortcutItem[];
  info?: React.ReactNode;
}) => {
  return (
    <ul className="flex-response flex-col gap-y-3 text-foreground">
      <li className="mb-3 flex h-auto w-full items-center justify-between border-b border-border/20 text-foreground/60">
        <p className="text-sm">{title}</p>
      </li>
      {info && <li className="mb-3">{info}</li>}
      {shortcuts.map((shortcut) => (
        <StandardShortcutItem key={shortcut.action} {...shortcut} />
      ))}
    </ul>
  );
};

export const Shortcuts = (props: React.ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <Popover className="relative">
        <Popover.Button className="btn btn-square bg alpha">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
            className="h-5 w-5 fill-current"
          >
            <path d="M223.51,48h-191A16.51,16.51,0,0,0,16,64.49v127A16.51,16.51,0,0,0,32.49,208h191A16.51,16.51,0,0,0,240,191.51v-127A16.51,16.51,0,0,0,223.51,48ZM224,191.51a.49.49,0,0,1-.49.49h-191a.49.49,0,0,1-.49-.49v-127a.49.49,0,0,1,.49-.49h191a.49.49,0,0,1,.49.49ZM208,128a8,8,0,0,1-8,8H56a8,8,0,0,1,0-16H200A8,8,0,0,1,208,128Zm0-32a8,8,0,0,1-8,8H56a8,8,0,0,1,0-16H200A8,8,0,0,1,208,96ZM72,160a8,8,0,0,1-8,8H56a8,8,0,0,1,0-16h8A8,8,0,0,1,72,160Zm96,0a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,160Zm40,0a8,8,0,0,1-8,8h-8a8,8,0,0,1,0-16h8A8,8,0,0,1,208,160Z"></path>
          </svg>
        </Popover.Button>
        <Popover.Panel className="absolute z-10 w-64 -translate-x-[calc(100%-30px)] rounded-md bg-white p-4 text-foreground shadow-lg dark:bg-gray-800">
          <h3 className="mb-3 text-base font-bold text-foreground/30">
            Keyboard Shortcuts
          </h3>
          <div className="flex-flex-col space-y-3">
            <ShortCut
              title="Palette Navigation"
              shortcuts={PALETTE_NAVIGATION}
              info={
                <div className="rounded-md bg-foreground/10 px-1 py-2 text-xs text-popover-foreground">
                  <span className="font-bold">☝️</span> <span>Use</span>{' '}
                  <span className="h-6 rounded-md border border-border px-2 py-1 text-sm font-semibold shadow-md">
                    Tab
                  </span>{' '}
                  <span>to cycle all elements</span>
                </div>
              }
            />
            <ShortCut title="Swatch Actions" shortcuts={SWATCH_ACTIONS} />
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
