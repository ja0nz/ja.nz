import { z, defineCollection } from "astro:content";

const contentFM = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    draft: z.boolean(),
    id: z.number(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  long: contentFM,
  short: contentFM,
};
