import { z } from 'zod';

export const userPrefSchema = z.object({
  mode: z.string().optional(),
});

export type UserPref = z.infer<typeof userPrefSchema>;
