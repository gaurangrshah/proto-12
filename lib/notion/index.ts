import { APIErrorCode, Client } from '@notionhq/client';
import {
  type BlockObjectResponse,
  type ListBlockChildrenResponse,
  type RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import type { ListBlockChildrenResponseResults } from 'notion-to-md/build/types';
import { getBlockCollectionId, uuidToId } from 'notion-utils';

export type _Block = {
  id: string;
  parent: string;
  Component?: string | undefined;
  //   icon?: string;
  //   cover?: string;
  props?: {
    heading_1?: string;
    heading_2?: string;
    heading_3?: string;
    paragraph?: string;
    markdown?: {
      type: string;
      blockId: string;
      parent: string;
      children: any[];
    };
    image?: {
      src: string;
      caption?: string;
    };
  };
};

export type Rich_Text = {
  type: 'text';
  text: {
    content: string;
    link: string | null;
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  };
};

export type PAGE = {
  object: string; // "page"
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string; // "user"
    id: string;
  };
  last_edited_by: {
    object: string; // "user"
    id: string;
  };
  cover: {
    type: string; // "external"
    external: {
      url: string;
    };
  };
  icon: {
    type: string; // "emoji"
    emoji: string;
  };
  parent: {
    type: string; // "database_id"
    database_id: string;
  };
  archived: false;
  properties: {
    status: {
      id: string;
      type: 'status';
      status: { id: string; name: string; color: string };
      kind: {
        id: string;
        type: 'multi_select';
        multi_select: { id: string; name: string; color: string }[];
      };
      path: {
        id: string;
        type: 'rich_text';
        rich_text: Rich_Text[];
        // rich_text: RichTextItemResponse[];
      };
      name: {
        id: 'title';
        type: 'title';
        title: Rich_Text[];
        // rich_text: RichTextItemResponse[];
      };
    };
  };
};

type ListItem = {
  rich_text: RichTextItemResponse[];
  color: any;
};

const client = new Client({
  auth: process.env.NOTION_API_SECRET,
});

const n2m = new NotionToMarkdown({ notionClient: client });

export async function getDatabase(databaseId: string) {
  const response = await client.databases.query({
    database_id: databaseId,
  });
  return response;
}

export async function getPage(pageId: string, options: any) {
  const response = await client.pages.retrieve({
    page_id: pageId,
    ...options,
  });
  return response;
}

export async function getPageBlocks(pageId: string) {
  const response = await client.blocks.children.list({
    block_id: pageId,
  });

  return response;
}

export async function blocksToMarkdown(blocks: ListBlockChildrenResponse) {
  return await Promise.all(
    blocks?.results?.map(async (block: Partial<BlockObjectResponse>) => {
      if (block.type === 'child_page') {
        const blocks = await client.blocks.children.list({
          block_id: String(block.id),
        });
        const parent = await n2m.blocksToMarkdown(blocks.results);
        return {
          id: block.id,
          Component: block.child_page?.title,
          parent: parent
            .map((item: any) => {
              if (item) return item.parent;
            })
            .join('\n'),
        };
      }
      return null;
    })
  );
}

export async function getBlockChildren(
  blockId: string,
  totalPage: number | null
) {
  const result: ListBlockChildrenResponseResults = [];
  let pageCount = 0;
  let start_cursor = undefined;

  do {
    const response = (await client.blocks.children.list({
      block_id: blockId,
      start_cursor,
    })) as ListBlockChildrenResponse;

    result.push(...response.results);

    start_cursor = response.next_cursor;
    pageCount++;
  } while (start_cursor && (totalPage === null || pageCount < totalPage));

  modifyNumberedListObject(result);
  return result;
}

export function modifyNumberedListObject(
  blocks: ListBlockChildrenResponseResults
) {
  let numberedListIndex = 0;

  for (const block of blocks) {
    if ('type' in block && block.type === 'numbered_list_item') {
      if (
        (block.numbered_list_item as ListItem & { number: number }).number ===
        undefined
      ) {
        // block.numbered_list_item.number = 0;
        block.numbered_list_item = Object.assign(block.numbered_list_item, {
          number: 0,
        });
      }
      (block.numbered_list_item as ListItem & { number: number }).number =
        ++numberedListIndex;
    } else {
      numberedListIndex = 0;
    }
  }
}

export async function notionBlocksToMarkdwnContent(
  pageId: string,
  childId: string
) {
  const blocks = await getBlockChildren(pageId, 50);

  const markdown = (await n2m.blocksToMarkdown(blocks)).filter(
    (item) => item.blockId === childId
  )[0];
  return markdown;
}

export async function resultsToProps(
  results: ListBlockChildrenResponseResults
) {
  return await Promise.all(
    results?.map(async (block: Partial<BlockObjectResponse>) => {
      if (block.has_children && block.type === 'child_page') {
        const _blocks = await getBlockChildren(String(block.id), 50);

        const currentBlock: _Block = {
          id: String(block.id),
          Component: block.child_page?.title.toString(),
          // @ts-expect-error page_id type mismatch
          parent: block.parent?.page_id.toString(),
          props: Object.assign({}, ...(await convertBlocksToContent(_blocks))),
        };

        return currentBlock;
      }
      return null;
    })
  );
}

export async function convertBlocksToContent(
  blocks: ListBlockChildrenResponseResults
) {
  const elements = ['heading_1', 'heading_2', 'heading_3', 'paragraph'];

  return await Promise.all(
    blocks.map(async (child: any) => {
      if (child.type === 'image') {
        return {
          image: {
            // caption: child.image?.caption,
            src: child.image[child.image?.type]?.url.toString(),
          },
        };
      }

      if (child.type === 'icon') {
        // @TODO: handle icon type
        console.log('🔴 found icon', child);
        return {};
      }

      if (elements.includes(child.type)) {
        if (child[child.type].rich_text[0]) {
          if (child.type === 'paragraph') {
            return {
              markdown: await notionBlocksToMarkdwnContent(
                child.parent.page_id,
                child.id
              ),
            };
          }
          return {
            [child.type]: child[child.type].rich_text[0]?.plain_text
              .toString()
              .trim(),
          };
        }
        return {};
      }

      return {};
    })
  );
}

export async function getNotionPageBlocks(pageId: string) {
  const blocks = await getPageBlocks(String(pageId));

  return blocks;
}

export async function posts() {
  try {
    const response = await getDatabase(String(process.env.NOTION_DATABASE_ID));

    // retrieve first page from notion database
    const page = await getPage(String(response.results[0]?.id), {
      property: 'status',
      rich_text: {
        equals: 'published',
      },
    });

    const blocks = await getPageBlocks(String(page.id));

    return (await blocksToMarkdown(blocks)).filter(Boolean);
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error(error.body);
    } else console.error(error);
  }
}

export async function post(id: string) {
  try {
    return await client.blocks.children.list({
      block_id: id,
    });
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error(error.body);
    } else console.error(error);
  }
}

export async function getNotionPagesContent() {
  try {
    const response = await getDatabase(String(process.env.NOTION_DATABASE_ID));
    // retrieve first page from notion database
    const page = await getPage(String(response.results[0]?.id), {
      property: 'status',
      rich_text: {
        equals: 'published',
      },
    });
    const blocks = await getNotionPageBlocks(page.id);
    const props = (await resultsToProps(blocks.results)).filter(Boolean);

    return props;
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error(error.body);
    } else console.error(error);
  }
}
