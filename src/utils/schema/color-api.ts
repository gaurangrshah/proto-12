import * as z from 'zod';

export const colorApiSchema = z.object({
  hex: z.object({ value: z.string(), clean: z.string() }),
  rgb: z.object({
    value: z.string(),
    fraction: z.object({
      r: z.number().nullable(),
      g: z.number().nullable(),
      b: z.number().nullable(),
    }),
    r: z.number().nullable(),
    g: z.number().nullable(),
    b: z.number().nullable(),
  }),
  hsl: z.object({
    value: z.string(),
    fraction: z.object({
      h: z.number().nullable(),
      s: z.number().nullable(),
      l: z.number().nullable(),
    }),
    h: z.number().nullable(),
    s: z.number().nullable(),
    l: z.number().nullable(),
  }),
  hsv: z.object({
    value: z.string(),
    fraction: z.object({
      h: z.number().nullable(),
      s: z.number().nullable(),
      v: z.number().nullable(),
    }),
    h: z.number().nullable(),
    s: z.number().nullable(),
    v: z.number().nullable(),
  }),
  name: z.object({
    value: z.string(),
    closest_named_hex: z.string(),
    exact_match_name: z.boolean(),
    distance: z.number(),
  }),
  cmyk: z.object({
    value: z.string(),
    fraction: z.object({
      c: z.number().nullable(),
      m: z.number().nullable(),
      y: z.number().nullable(),
      k: z.number().nullable(),
    }),
    c: z.number().nullable(),
    m: z.number().nullable(),
    y: z.number().nullable(),
    k: z.number().nullable(),
  }),
  XYZ: z.object({
    value: z.string(),
    fraction: z.object({ X: z.number(), Y: z.number(), Z: z.number() }),
    X: z.number(),
    Y: z.number(),
    Z: z.number(),
  }),
  image: z.object({
    bare: z.string(),
    named: z.string(),
  }),
  contrast: z.object({
    value: z.string(),
  }),
  _links: z.object({
    self: z.object({ href: z.string() }),
  }),
  embedded: z.any({}),
});

// q: how do i covert this schema to a type?
export type ColorApiSchema = z.infer<typeof colorApiSchema>;
