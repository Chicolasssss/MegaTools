import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('MegaTools Team'),
    tags: z.array(z.string()).default([])
  })
});

const toolsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tools" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    icon: z.string(),
    seoTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  })
});

const categoriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/categories" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  })
});

const guidesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    pubDate: z.date(),
    author: z.string().default('MegaTools Team')
  })
});

const referencesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/references" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
  })
});

export const collections = {
  'blog': blogCollection,
  'tools': toolsCollection,
  'categories': categoriesCollection,
  'guides': guidesCollection,
  'references': referencesCollection,
};
