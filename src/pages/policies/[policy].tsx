import React from 'react';
import type { GetStaticPaths, GetStaticPropsContext, NextPage } from 'next';
import {
  ROUTES,
  getMarkdownFileContent,
  getMarkdownFiles,
  options,
} from '@/utils';
import Markdown from 'markdown-to-jsx';

import { DefaultLayout } from '@/components/_scaffold/layouts';

const PolicyPage: NextPage<{ content: string; policy: string }> = ({
  content,
}) => {
  return (
    <DefaultLayout btns={[]}>
      <div className="prose prose-xl">
        {content ? <Markdown options={options}>{content}</Markdown> : null}
      </div>
    </DefaultLayout>
  );
};

export default PolicyPage;

export async function getStaticProps(
  context: GetStaticPropsContext<{ policy: string }>
) {
  const policy = context.params?.policy as string;
  const content = await getMarkdownFileContent(
    policy,
    `${ROUTES.DATA}/${ROUTES.POLICIES}`
  );
  return {
    props: {
      content: content.content,
      policy,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getMarkdownFiles(`${ROUTES.DATA}/${ROUTES.POLICIES}`);
  return {
    paths: res.files.map((policy: string) => ({
      params: {
        policy: policy,
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: 'blocking',
  };
};
