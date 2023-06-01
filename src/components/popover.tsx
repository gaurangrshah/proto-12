import { Fragment, useRef } from 'react';
import type { FCwChildren } from '@/types';
import {
  Popover as Popper,
  Transition,
  type PopoverButtonProps,
} from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { cn } from 'lib/utils';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  className: string;
};

const timeoutDuration = 120;
export const Popover: FCwChildren<
  {
    btn: {
      label?: string;
      props?: PopoverButtonProps<'button'>;
      Component?: React.FC;
    };

    closable?: boolean;
    overlay?: boolean;
  } & React.ComponentPropsWithoutRef<(typeof Popper)['Panel']>
> = ({ btn, closable, overlay, children, ...props }) => {
  const { className, ...rest } = props;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = (isOpen: boolean) => {
    if (!timeOutRef.current) return;
    clearTimeout(timeOutRef.current);
    triggerRef.current?.focus();
    !isOpen && triggerRef.current?.click();
  };

  const handleLeave = (isOpen: boolean) => {
    timeOutRef.current = setTimeout(() => {
      triggerRef.current?.blur();
      isOpen && triggerRef.current?.click();
    }, timeoutDuration);
  };

  return (
    <Popper className="relative">
      {({ open, close }) => (
        <div
          onMouseEnter={() => handleEnter(open)}
          onMouseLeave={() => handleLeave(open)}
        >
          <Popper.Button {...btn?.props} ref={triggerRef}>
            {btn?.label ?? ''}
            {btn?.Component ? <btn.Component /> : null}
          </Popper.Button>
          {overlay ? (
            <Popper.Overlay className="before:fixed before:inset-0 before:bg-black before:opacity-30" />
          ) : null}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-5"
            enterTo="opacity-100 translate-y-3"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-5"
            leaveTo="opacity-0 translate-y-3"
          >
            <Popper.Panel
              className={cn(
                `min-w-xl min-h-36 absolute z-50 m-0 -translate-x-[calc(50%-3.5rem)] rounded-md bg-background/20 p-0 text-popover-foreground `,
                className
              )}
              {...rest}
            >
              {closable ? (
                <div className="min-w-56 relative w-full p-2">
                  <button
                    aria-label="close"
                    className="flex w-full justify-end py-1"
                    onClick={() => close()}
                  >
                    <XCircleIcon className="w-6 text-foreground-focus" />
                  </button>
                  {children}
                </div>
              ) : (
                <div className="min-w-56 relative w-full p-2">{children}</div>
              )}
            </Popper.Panel>
          </Transition>
        </div>
      )}
    </Popper>
  );
};
