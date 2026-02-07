import { notFound } from 'next/navigation';

import { fetchBlogPost } from '@/lib/fetcher';

import styles from './page.module.css';

import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    return {
      title: '記事が見つかりません',
      description: '指定された記事は削除された可能性があります。',
    };
  }

  return {
    title: `${post.title} | Next CMS Starter`,
    description: post.description,
  };
};

const BlogDetailPage = async ({ params }: PageProps) => {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.wrapper}>
      <header>
        <p className={styles.meta}>
          <span>{post.publishedAt}</span>
          <span>{post.readingTime}</span>
          <span>{post.author}</span>
        </p>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div className={styles.tagList}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </header>
      <section className={styles.content}>
        {post.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>
    </article>
  );
};

export default BlogDetailPage;
