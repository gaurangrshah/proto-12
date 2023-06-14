import { useEffect, useState } from 'react';

type CSSVariableHookResult = [string | null, (newValue: string) => void];

export const useCSSVariable = ({
  variableName,
  ref,
  defaultValue,
}: {
  variableName: string;
  ref?: React.RefObject<HTMLElement>;
  defaultValue?: string;
}): CSSVariableHookResult => {
  const [value, setValue] = useState<string | null>(null);

  const updateValue = (newValue: string) => {
    const target = ref?.current || document.documentElement;
    target.style.setProperty(variableName, newValue);
  };

  useEffect(() => {
    const handleVariableChange = (event: TransitionEvent | Event) => {
      if (
        event.target instanceof HTMLElement &&
        event instanceof TransitionEvent &&
        event.propertyName === variableName
      ) {
        setValue(event.target.style.getPropertyValue(variableName));
      }
    };

    const target = ref?.current || document.documentElement;
    target.addEventListener('transitionend', handleVariableChange);
    target.addEventListener('DOMContentLoaded', handleVariableChange);

    return () => {
      target.removeEventListener('transitionend', handleVariableChange);
      target.removeEventListener('DOMContentLoaded', handleVariableChange);
    };
  }, [variableName, ref]);

  useEffect(() => {
    const target = ref?.current || document.documentElement;
    const computedValue =
      getComputedStyle(target).getPropertyValue(variableName);
    setValue(computedValue || defaultValue || null);
  }, [variableName, ref, defaultValue]);

  return [value, updateValue];
};
