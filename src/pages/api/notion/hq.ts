import type { NextApiHandler } from 'next';
import { allPublishedComponents, convertPage } from 'lib/notion/cms';
import type { Pages } from 'lib/notion/schema';
import { pagesSchema } from 'lib/notion/schema';
import type { ZodError } from 'zod';

const handler: NextApiHandler<any> = async (req, res) => {
  // const data = await allPublishedComponents();
  const data = await convertPage('c4412d68-df66-4274-b883-e4cb3b2a0ff0', true);

  res.status(200).json(data as any);
};

// const handler: NextApiHandler<Pages | ZodError> = async (req, res) => {
//   const data = await allPublishedContent();

//   const result = pagesSchema.safeParse(data);

//   if (result.success) {
//     res.status(200).json(data as Pages);
//   } else {
//     res.status(500).json(result.error);
//   }
// };

export default handler;
