import type { ComponentType } from 'react';
import { extractPageComponents } from '@/pages/posts';

import type { ResultWithChildren, _Component } from './schema';

export type MarkdownComponentProps = {
  elements: (string | null)[] | undefined;
  title?: string | null;
  cover?: string | null;
  icon?: string | null;
  kids?: (
    | {
        Kid?: ComponentType<MarkdownComponentProps>;
        block?: ResultWithChildren;
      }
    | undefined
  )[];
};

export function componentToMarkdownElements(component: _Component) {
  const els = ['heading_1', 'heading_2', 'heading_3', 'paragraph'];
  if (component?.child_page) {
    return component?.child_page?.results
      ?.map((element) => {
        if (els.includes(String(element?.type))) {
          return element[element?.type as keyof typeof element] as string;
        }
        return null;
      })
      .filter(Boolean);
  }
}

export function kidToMarkdownElements(component: _Component) {
  const els = ['heading_1', 'heading_2', 'heading_3', 'paragraph'];
  if (component?.child_page) {
    return component?.child_page?.results
      ?.map((element) => {
        if (els.includes(String(element?.type))) {
          return element[element?.type as keyof typeof element] as string;
        }
        return null;
      })
      .filter(Boolean);
  }
}

export function extractKidComponents(
  component: ResultWithChildren,
  components: Record<
    string,
    ({ elements, kids }: MarkdownComponentProps) => JSX.Element
  >
) {
  const els = ['heading_1', 'heading_2', 'heading_3', 'paragraph'];
  if (component?.child_page) {
    return component?.children?.results
      ?.map((element) => {
        console.log('🚀 | file: helpers.ts:37 | element:', element);
        const componentKey = element.child_page
          ?.title as keyof typeof components;
        console.log('🚀 | file: helpers.ts:46 | componentKey:', componentKey);
        if (componentKey) {
          if (element?.has_children && element.type === 'child_page') {
            if (components[componentKey]) {
              const Component = components[
                componentKey
              ] as ComponentType<MarkdownComponentProps>;
              if (Component) {
                const comp = Object.assign(
                  {},
                  Component && { Kid: Component },
                  {
                    block: element,
                  }
                );
                return comp;
              }
            }
          }

          if (components[componentKey]) {
            const Component = components[
              componentKey
            ] as ComponentType<MarkdownComponentProps>;
            if (Component) {
              const comp = Object.assign({}, Component && { Kid: Component }, {
                block: element,
              });
              console.log('🚀 | file: helpers.ts:57 | comp:', comp);
              return comp;
            }
          }
          // if (els.includes(String(element?.type))) {
          //   return element[element?.type as keyof typeof element] as string;
          // }
        }
        return null;
      })
      .filter(Boolean);
  }
}
