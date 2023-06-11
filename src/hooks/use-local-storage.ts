import { useEffect, useState } from 'react';
import { isBrowser } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';

type ReturnValue<T> = [T, (value: T) => void];

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): ReturnValue<T> {
  const [value, setValue] = useState<T>(() => {
    if (!isBrowser) return initialValue;
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
    queryClient.invalidateQueries([key]);
  }, [key, value, queryClient]);

  return [value, setValue];
}
