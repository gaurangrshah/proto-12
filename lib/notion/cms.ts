import { APIErrorCode, Client, isNotionClientError } from '@notionhq/client';
import {
  AppendBlockChildrenResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  ParagraphBlockObjectResponse,
  PartialPageObjectResponse,
  type BlockObjectResponse,
  type PageObjectResponse,
  type PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import {
  BlockAttributes,
  ListBlockChildrenResponseResult,
} from 'notion-to-md/build/types';

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

export async function pageSearch(title: string) {
  try {
    const res = await client.search({
      query: 'home',
      filter: {
        value: 'page',
        property: 'object',
      },
    });
    return res;
  } catch (error) {
    handleNotionErrors(error);
  }
}

export function getPageDetails(page: any) {
  // @FIXME: @TYPE: Partial<PageObjectResponse>
  // transforms page details
  try {
    if (page?.id) {
      const transformedPage = {
        id: page?.id,
        title: page?.properties?.name?.title[0]?.text?.content ?? null,
        cover: page?.cover?.external?.url?.split('?')[0] ?? null,
        icon: (page?.icon?.emoji || page?.icon?.external?.url) ?? null,
        status: page?.properties?.status?.status?.name ?? null,
        kind: page?.properties?.kind?.multi_select?.length
          ? page?.properties?.kind?.multi_select.map(
              (item: { id: string; name: string; color: string }) => item.name
            )
          : null,
        path: page?.properties?.path?.rich_text[0]?.plain_text ?? null,
        created: page?.created_time ?? null,
        last_edited: page?.last_edited_time ?? null,
        archived: page?.archived ?? false,
        url: page?.url ?? null,
      };

      return transformedPage;
    }
  } catch (error) {
    console.error(error);
  }
}

type ComponentDetails = {
  id: string;
  created?: string;
  last_edited?: string;
  archived?: boolean;
  url?: string;
  title: string;
  cover?: string;
  icon?: string;
  parent: {
    id: string;
    name?: string;
    type?: string;
  };
  hasChildren?: boolean;
  paragraph?: string;
  heading_1?: string;
  heading_2?: string;
  heading_3?: string;
  bulleted_list_item?: string;
  numbered_list_item?: string;
  image?: string;
  components?: ComponentDetails[];
  results?: ComponentDetails[];
};

export function getComponentDetails(
  blockPage: any,
  parent: string
): ComponentDetails {
  // try {
  if (blockPage?.id) {
    const title =
      (blockPage?.child_page?.title ||
        blockPage?.properties?.title?.title[0]?.text.content) ??
      null;
    const cover = blockPage?.cover?.external?.url?.split('?')[0] ?? null;
    const icon =
      (blockPage?.icon?.emoji || blockPage?.icon?.external?.url) ?? null;
    const _parent = {
      ...blockPage?.parent,
      name: parent ?? null,
    };

    return Object.assign(
      {},
      {
        id: blockPage?.id ?? null,
        created: blockPage?.created_time ?? null,
        last_edited: blockPage?.last_edited_time ?? null,
        archived: blockPage?.archived ?? false,
        url: blockPage?.url ?? null,
      },
      title && { title },
      cover && { cover },
      icon && { icon },
      _parent && { parent: _parent },
      blockPage?.has_children && {
        has_children: blockPage?.has_children ?? false,
      },
      blockPage?.paragraph && { paragraph: blockPage?.paragraph },
      blockPage?.heading_1 && { heading_1: blockPage?.heading_1 },
      blockPage?.heading_2 && { heading_2: blockPage?.heading_2 },
      blockPage?.heading_3 && { heading_3: blockPage?.heading_3 },
      blockPage?.bulleted_list_item && {
        bulleted_list_item: blockPage?.bulleted_list_item,
      },
      blockPage?.numbered_list_item && {
        numbered_list_item: blockPage?.numbered_list_item,
      },
      blockPage?.image && { image: blockPage?.image },
      blockPage && { components: blockPage?.components }
    );
  }
  return blockPage;
  // } catch (error) {
  //   handleNotionErrors(error);
  // }
}

export type PageDetails =
  | (ReturnType<typeof getPageDetails> & {
      components?: ReturnType<typeof getComponentDetails>[] | any; // @TODO: @FIXME: @TYPE
    })
  | undefined;

export type ChildDetails =
  | (ReturnType<typeof getComponentDetails> & {
      children?: AppendBlockChildrenResponse[] | any; // @TODO: @FIXME: @TYPE
    })
  | null
  | undefined;

export async function iterateComponents(
  components: ListBlockChildrenResponseResult[],
  parentTitle: string,
  recursive = false
) {
  if (components?.length) {
    const elements = ['paragraph', 'heading_1', 'heading_2', 'heading_3'];
    return await Promise.all(
      components
        .map(async (child) => {
          const kidComponents: ListBlockChildrenResponse =
            await client.blocks.children.list({
              block_id: child.id,
            });

          if (
            (child as ParagraphBlockObjectResponse).type === 'paragraph' &&
            !(child as ParagraphBlockObjectResponse).paragraph.rich_text.length
          ) {
            // remove empty paragraphs
            return null;
          }

          if (elements.includes((child as BlockObjectResponse).type)) {
            child = {
              ...child,
              [(child as BlockObjectResponse).type]: await n2m.blockToMarkdown(
                child
              ),
            };
          }
          child = getComponentDetails(child, parentTitle ?? null) as any;

          if (kidComponents.results?.length) {
            const nestedChildren = await Promise.all(
              kidComponents.results
                .map(async (kid) => {
                  if ((kid as BlockObjectResponse).has_children) {
                    // get page details for child pages
                    let page:
                      | PartialPageObjectResponse
                      | ReturnType<typeof getPageDetails> =
                      await client.pages.retrieve({ page_id: kid?.id });

                    // transform page details
                    page = getPageDetails(page);
                    return {
                      // return child page + components
                      ...page,
                      components: await iterateComponents(
                        kidComponents.results,
                        (child as BlockObjectResponse & { title: string })
                          .title,
                        recursive
                      ),
                    };
                  }

                  // remove empty paragraphs
                  if ((kid as BlockObjectResponse).type === 'paragraph') {
                    if (
                      !(kid as ParagraphBlockObjectResponse).paragraph.rich_text
                        .length
                    ) {
                      return null;
                    }
                  }
                  // transform element blocks to markdown
                  if (elements.includes((kid as BlockObjectResponse).type)) {
                    return {
                      ...kid,
                      [(kid as BlockObjectResponse).type]:
                        await n2m.blockToMarkdown(kid),
                    };
                  }
                })
                .filter(Boolean)
            );

            (kidComponents as any).results = nestedChildren.filter(Boolean);
          }

          return Object.assign(
            {},
            child,
            kidComponents.results?.length && {
              components: kidComponents.results,
            }
          );
        })
        .filter(Boolean)
    );
  }
  return null;
}

export async function convertPage(pageId: string, recursive = false) {
  try {
    // get page from notion client by id
    const page: Partial<PageObjectResponse> = await client.pages.retrieve({
      page_id: pageId,
    });

    const pageTitle =
      (page as any)?.properties?.title?.title[0]?.plain_text ?? null;

    // transform page details
    const details: ChildDetails = getComponentDetails(page, pageTitle ?? null);
    // get all first-level children of page (results)
    let components:
      | (
          | ListBlockChildrenResponseResult
          // | (PartialBlockObjectResponse & BlockAttributes & 0) // return from component details
          // | null
          | any
        )[]
      | null = (
      await client.blocks.children.list({
        block_id: pageId,
      })
    ).results;

    components = await iterateComponents(components, pageTitle, recursive);

    return Object.assign({}, details, components?.length && { components });
  } catch (error) {
    handleNotionErrors(error);
  }
}

export async function allPages() {
  const response = await getDatabase(String(process.env.NOTION_DATABASE_ID));

  if (response) {
    const pages = await Promise.all(
      response.results.map(async (result) => {
        return await convertPage(result?.id);
      })
    );

    return pages;
  } else return [];
}

// export async function pagesToComponents(
//   pageId: string,
//   filterChildren = false
// ) {
//   // convert raw top-level notion page to a component block
//   try {
//     let response: any = await client.blocks.children.list({
//       block_id: pageId,
//     });

//     if (filterChildren) {
//       // all top level pages represent a component in the UI (i.e. childpage = component)
//       // filter out any blocks that do not have children (those blocks are not components)
//       response = response.results.filter((result: any) => result.has_children);
//     }

//     return response;
//   } catch (error) {
//     handleNotionErrors(error);
//   }
// }

// export async function getComponentsDetails(blockId: string, recursive = false) {
//   // recursive block will return page blocks + page details for each child page
//   // ** can be made recursive with the recursive flag.
//   try {
//     let response: any = await client.blocks.children.list({
//       block_id: blockId,
//     });

//     const elements = ['heading_1', 'heading_2', 'heading_3', 'paragraph'];

//     // convert text blocks to markdown
//     response.results = await Promise.all(
//       response.results.map(async (result: any) => {
//         if (elements.includes(result.type)) {
//           if (result[result.type].rich_text[0]?.plain_text) {
//             // avoid operating on empty blocks
//             result[result.type] = await n2m.blockToMarkdown(result);
//           }
//         }
//         return result;
//       })
//     );

//     const parentId = response.results[0].parent.page_id;
//     if (parentId) {
//       // add in page details for each of the blocks (includes cover / icons / title)
//       response.page = getPageDetails(
//         await client.pages.retrieve({ page_id: parentId })
//       );
//     }
//     if (recursive) {
//       // recursively iterate over each block and return all children block if they exist
//       if (response.results) {
//         response = {
//           ...response,
//           results: await Promise.all(
//             response.results.map(async (result: any) => {
//               if (result.has_children) {
//                 // return Object.assign(result, {children: (await getComponentsDetails(result.id)).results })
//                 result.children = await getComponentsDetails(result.id, true);
//                 return result;
//               }
//               return result;
//             })
//           ),
//         };
//       }
//     }
//     return response;
//   } catch (error) {
//     handleNotionErrors(error);
//   }
// }

// export async function allPublishedContent() {
//   try {
//     const response = await getDatabase(String(process.env.NOTION_DATABASE_ID));

//     if (response) {
//       const pages = await Promise.all(
//         response.results.map(async (result) => {
//           const page: Partial<PageObjectResponse> = await client.pages.retrieve(
//             {
//               // returns page details and properties.
//               page_id: result?.id,
//             }
//           );
//           const details = getPageDetails(page);
//           let components: (PartialBlockObjectResponse | BlockObjectResponse)[] =
//             [];
//           if (details?.status === 'published') {
//             // ensure pages are published
//             // get block objects for each child of all published pages
//             components = await pagesToComponents(String(details?.id), true);
//           }

//           let blocksByPage: any = [];
//           if (components.length) {
//             blocksByPage = await Promise.all(
//               components.map(async (child: any) => {
//                 return {
//                   [child.type]: Object.assign(
//                     {},
//                     child.child_page.title
//                       ? { title: child.child_page.title }
//                       : {},
//                     await getComponentsDetails(String(child.id), true)
//                   ),
//                 };
//               })
//             );
//           }
//           (details as any).components = blocksByPage;
//           return details;
//         })
//       );
//       return pages;
//     }
//     return [];
//   } catch (error) {
//     handleNotionErrors(error);
//   }
// }

// export async function componentToMarkdown(
//   block: ListBlockChildrenResponseResult
// ) {
//   const elements = ['paragraph', 'heading_1', 'heading_2', 'heading_3'];

//   const item = block as BlockObjectResponse;

//   if (!item.archived) {
//     if (item.type && elements.includes(item.type)) {
//       if (
//         item.type === 'paragraph' &&
//         !(item as any).paragraph.rich_text.length
//       ) {
//         // remove empty paragraphs
//         return null;
//       }

//       return {
//         id: item?.id ?? null,
//         type: item.type,
//         [item.type]: await n2m.blockToMarkdown(block),
//       };
//     }
//   }
//   return block;
// }
