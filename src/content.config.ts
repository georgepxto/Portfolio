import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      order: z.number(),
      featured: z.boolean().default(false),
      meta: z.string(),
      year: z.union([z.string(), z.number()]).transform(String),
      client: z.string(),
      role: z.string(),
      status: z.string(),
      stack: z.array(z.string()),
      summary: z.string(),
      url: z.url().optional(),
      cover: image().optional(),
    }),
});

export const collections = { projects };
