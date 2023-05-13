import { useState } from 'react';
import { colorApiSchema } from '@/utils';
import type { ColorApiSchema } from '@/utils';
import { useQuery } from '@tanstack/react-query';

const getColor = async (hex: string) => {
  const response = await fetch(
    `https://www.thecolorapi.com/id?hex=${hex.replace('#', '')}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export function useColorApi(color: string) {
  const [info, setInfo] = useState<ColorApiSchema | null>(null);
  const query = useQuery(['color', color], () => getColor(color ?? '#BADA55'), {
    enabled: !!color,
    onSuccess(data) {
      try {
        const valid = colorApiSchema.parse(data);
        setInfo(valid);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return {
    ...query,
    data: info,
  };
}
