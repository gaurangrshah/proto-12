import type { FCwChildren } from '@/types';
import { Popover as Popper, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export const Popover: FCwChildren<{
  btnProps: Omit<React.ComponentProps<'button'>, 'ref'>;
  btnLabel: string;
  closable?: boolean;
  overlay?: boolean;
}> = ({ btnProps, btnLabel, closable, overlay, children }) => {
  return (
    <Popper className="relative">
      <Popper.Button {...btnProps}>
        {btnLabel}{' '}
        <ChevronDownIcon className="transition-transform ui-open:rotate-180 ui-open:transform ui-open:duration-200 ui-open:ease-out" />
      </Popper.Button>
      {overlay ? (
        <Popper.Overlay className="fixed inset-0 bg-black opacity-30" />
      ) : null}
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popper.Panel className="bg-background_ absolute z-10 text-foreground_">
          {closable
            ? ({ close }) => (
                <div className="relative h-16 w-24">
                  {children}
                  <button
                    className="absolute right-4 top-4"
                    onClick={() => close()}
                  >
                    close
                  </button>
                </div>
              )
            : children}
        </Popper.Panel>
      </Transition>
    </Popper>
  );
};
