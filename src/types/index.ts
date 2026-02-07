export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  body: string[];
};

export type RemotePost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
