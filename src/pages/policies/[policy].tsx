import type { GetStaticPaths, GetStaticPropsContext, NextPage } from 'next';
import { getMarkdownFileContent, getMarkdownFiles } from '@/utils';
import Markdown from 'markdown-to-jsx';

import { DefaultLayout } from '@/components/_scaffold/layouts';

import { ROUTES } from '@/utils/routes';

const PolicyPage: NextPage<{ content: string; policy: string }> = ({
  content,
}) => {
  return (
    <DefaultLayout>
      <div className="prose prose-xl p-4">
        {content ? (
          <Markdown options={{ wrapper: 'main' }}>{content}</Markdown>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default PolicyPage;

export async function getStaticProps(
  context: GetStaticPropsContext<{ policy: string }>
) {
  const policy = context.params?.policy as string;
  // prefetch `file.by filename`
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
