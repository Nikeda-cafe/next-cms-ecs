import Link from 'next/link';

import { fetchBlogPosts } from '@/lib/fetcher';

import styles from './page.module.css';

import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | Next CMS Starter',
  description: 'RSCやCMS連携に関するトピックを発信するブログです。',
};

const BlogPage = async () => {
  const posts = await fetchBlogPosts();

  return (
    <div>
      <h1>ブログ</h1>
      <p>設計と運用のナレッジを少しずつ公開しています。</p>
      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.slug} className={styles.post}>
            <p className={styles.date}>
              {post.publishedAt}・{post.readingTime}
            </p>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div className={styles.tagList}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/blog/${post.slug}`}>記事を読む</Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
