import { blogPosts } from '@/lib/constants';

import type { BlogPost } from '@/types';

const simulateDelay = async () => new Promise((resolve) => setTimeout(resolve, 80));

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  await simulateDelay();
  return blogPosts;
};

export const fetchBlogPost = async (slug: string): Promise<BlogPost | undefined> => {
  await simulateDelay();
  return blogPosts.find((post) => post.slug === slug);
};
