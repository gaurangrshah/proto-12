import type { NextApiHandler } from 'next';
import { NotionAPI } from 'notion-client';
import { getAllPagesInSpace, parsePageId, uuidToId } from 'notion-utils';

const handler: NextApiHandler = async (req, res) => {
  const notion = new NotionAPI({
    activeUser: process.env.NOTION_USER_ID,
    authToken: process.env.NOTION_V2_TOKEN,
  });

  const getPage = async (notionUrl: string) => {
    const pageId = parsePageId(notionUrl);
    return notion.getPage(pageId);
  };

  const page = await getPage(
    'https://www.notion.so/gs-proto/70faa5a6e4ef4608bb6468027970f3f5?v=183235def10d47c88683eb9772b81f8c'
  );

  const root = {
    pageId: Object.keys(page.block)[0],
    spaceId: Object.keys((page as any).space)[0],
  };

  const space = await getAllPagesInSpace(
    root.pageId!,
    root.spaceId,
    notion.getPage.bind(notion)
  );

  const pages = Object.keys(space)
    .map((id) => {
      const block = Object.assign({}, space[id]?.block);
      return Object.values(block)
        .map((block) => {
          if (block.value.type === 'page') {
            return {
              id: block.value.id,
              type: block.value.type,
              properties: block.value.properties,
              content: block.value.content,
            };
          }
        })
        .filter(Boolean);
    })
    .flat();

  const p = await notion.getBlocks((pages as any)[0].content);

  res.status(200).json({
    page,
    // data: space,
    // kids: kids.filter(Boolean),
    kids: [],
  });
};

export default handler;
