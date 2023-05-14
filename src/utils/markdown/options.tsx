import Image from 'next/image';
import Link from 'next/link';

const overrides = {
  a: Link,
  img: {
    component: (props: React.ComponentProps<'img'>) => (
      <Image
        src={String(props.src ?? '')}
        width={Number(props.width ?? 200)}
        height={Number(props.height ?? 75)}
        alt={String(props.alt ?? '')}
      />
    ),
  },
};

export const options = { overrides };
