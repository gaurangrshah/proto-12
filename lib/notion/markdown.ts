import { APIErrorCode, Client, isNotionClientError } from '@notionhq/client';
import {
  type BlockObjectResponse,
  type PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

const client = new Client({
  auth: process.env.NOTION_API_SECRET,
});

const n2m = new NotionToMarkdown({ notionClient: client });

export function handleNotionErrors(error: any) {
  if (isNotionClientError(error)) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error('Database not found');
    } else if (error.code === APIErrorCode.Unauthorized) {
      console.error('Unauthorized: Check Notion Config');
    }
  } else {
    console.error(error);
  }
}

export function getPageDetails(page: any) {
  // Partial<PageObjectResponse>
  // transforms page details
  try {
    if (page?.id) {
      const transformedPage = {
        id: page?.id,
        title: page?.properties.name?.title[0]?.text?.content ?? null,
        cover: page?.cover?.external?.url ?? null,
        icon: (page?.icon?.emoji || page?.icon?.external?.url) ?? null,
        status: page?.properties?.status?.status?.name ?? null,
        kind: page?.properties?.kind?.multi_select.map(
          (item: { id: string; name: string; color: string }) => item.name
        ),
        path: page?.properties?.path?.rich_text[0]?.plain_text ?? null,
      };

      return transformedPage;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getDatabase(databaseId: string) {
  try {
    const response = await client.databases.query({
      database_id: databaseId,
    });
    return response;
  } catch (error) {
    handleNotionErrors(error);
  }
}

export async function getMarkdownPageBlocks() {
  try {
    const response = await getDatabase(String(process.env.NOTION_DATABASE_ID));

    if (response) {
      const pages = await Promise.all(
        response.results.map(async (result) => {
          const page: Partial<PageObjectResponse> = await client.pages.retrieve(
            {
              // returns page details and properties.
              page_id: result?.id,
            }
          );

          const details = getPageDetails(page);

          let components: Record<string, any> = {};
          if (details?.status === 'published') {
            const res = await client.blocks.children.list({
              block_id: details?.id,
            });

            if (res) components = res;
          }

          if (components && Object.keys(components)?.length) {
            components = await Promise.all(
              components.results.map(
                async (block: Partial<BlockObjectResponse>) => {
                  if (
                    block &&
                    block.type === 'paragraph' &&
                    !block.paragraph?.rich_text.length
                  ) {
                    // avoid operating on empty paragraph blocks
                    return null;
                  }
                  if (block.type === 'child_page') {
                    const child = await client.blocks.children.list({
                      block_id: String(block.id),
                    });
                    const kids = await n2m.blocksToMarkdown(child.results, 30);
                    (block as any).kids = kids;
                  }
                  return block;
                }
              )
            );
          }

          if (components) (page as any).components = components;
          return page;
        })
      );
      console.log(pages);
      return pages ?? [];
    }
  } catch (error) {
    handleNotionErrors(error);
  }
}
