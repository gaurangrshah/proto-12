import { z } from 'zod';

const resultSchema = z.object({
  id: z.string(),
  parent: z.object({
    type: z.string(),
    page_id: z.string(),
  }),
  has_children: z.boolean(),
  archived: z.boolean(),
  type: z.string().optional(),
  image: z
    .object({
      caption: z.array(z.any()),
      type: z.string(),
      external: z
        .object({
          url: z.string(),
        })
        .optional(),
    })
    .optional(),
  heading_2: z.string().optional(),
  heading_3: z.string().optional(),
  paragraph: z
    .string()
    .optional()
    .or(
      z.object({
        // this accounts for any empty paragraph blocks
        rich_text: z.array(z.any()),
        color: z.string(),
      })
    ),
  child_page: z
    .object({
      title: z.string(),
      has_children: z.boolean().optional(),
      page: z
        .object({
          id: z.string(),
          title: z.string().nullable(),
          cover: z.string().nullable(),
          icon: z.string().nullable(),
          status: z.string().nullable(),
          kind: z.string().nullable(),
          path: z.string().nullable(),
        })
        .optional(),
    })
    .optional(),
});

export type Result = z.infer<typeof resultSchema>;

const blockSchema = z.object({
  object: z.string(),
  results: z.array(resultSchema).optional(),
});

export type Block = z.infer<typeof blockSchema>;

const resultWithChildrenSchema = resultSchema.merge(
  z.object({
    // has_children: z.boolean().optional(),
    children: blockSchema.optional(),
  })
);

export type ResultWithChildren = z.infer<typeof resultWithChildrenSchema>;

const componentSchema = z
  .object({
    child_page: blockSchema.merge(
      z.object({
        title: z.string().optional(),
        has_children: z.boolean().optional(),
        children: z.array(blockSchema.optional()).nullable(),
        page: z
          .object({
            id: z.string(),
            title: z.string().nullable(),
            cover: z.string().nullable(),
            icon: z.string().nullable(),
            status: z.string().nullable(),
            kind: z.string().nullable(),
            path: z.string().nullable(),
          })
          .optional(),
      })
    ),
  })
  .optional();

export type _Component = z.infer<typeof componentSchema>;

export const pageSchema = z.object({
  id: z.string(),
  title: z.string(),
  cover: z.string().optional(),
  icon: z.string().optional(),
  status: z.string(),
  kind: z.array(z.string()),
  path: z.string().optional(),
  components: z.array(componentSchema),
  type: z.string().optional(),
  url: z.string().nullable(),
  created: z.string().nullable(),
  last_edited: z.string().nullable(),
  archived: z.boolean().optional(),
  page: z
    .object({
      id: z.string(),
      title: z.string().nullable(),
      cover: z.string().nullable(),
      icon: z.string().nullable(),
      status: z.string().nullable(),
      kind: z.string().nullable(),
      path: z.string().nullable(),
      url: z.string().nullable(),
      created: z.string().nullable(),
      last_edited: z.string().nullable(),
      archived: z.boolean().optional(),
    })
    .optional(),
});

export type Page = z.infer<typeof pageSchema>;

export const pagesSchema = z.array(pageSchema);

export type Pages = z.infer<typeof pagesSchema>;
