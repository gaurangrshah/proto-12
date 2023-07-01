import { allPages } from 'lib/notion/cms';
import type { Pages } from 'lib/notion/schema';

export async function getServerSideProps() {
  const results = await allPages();
  // console.log('🚀 | file: blog.tsx:6 | results:', JSON.stringify(results));

  return {
    props: {
      results: results?.length ? (results as Pages) : null,
    },
  };
}

export default function Blog({ results }: { results: Pages }) {
  return (
    <pre className="text-sm">
      <code>{JSON.stringify(results, null, 2)}</code>
    </pre>
  );
}
