import Link from 'next/link';

import { heroHighlights } from '@/lib/constants';
import { fetchBlogPosts } from '@/lib/fetcher';

import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const posts = await fetchBlogPosts();
  const featuredPosts = posts.slice(0, 2);

  return (
    <div>
      <section className={styles.hero}>
        <div>
          <p>Next.js App Router / RSC Starter</p>
          <h1 className={styles.title}>
            CMS連携を前提にしたモダンなWebサイトのベースを今すぐ構築
          </h1>
          <p>
            Lint/Format/Test/E2Eまで揃ったスターターキット。RSCファーストで拡張しやすい
            情報設計を採用しています。
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/contact" className={styles.primaryCta}>
              相談してみる
            </Link>
            <Link href="/blog" className={styles.secondaryCta}>
              ブログを見る
            </Link>
          </div>
        </div>
        <div className={styles.highlights}>
          {heroHighlights.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>最新記事</h2>
        <div className={styles.highlights}>
          {featuredPosts.map((post) => (
            <article key={post.slug} className={styles.card}>
              <p className={styles.muted}>{post.publishedAt}</p>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <Link href={`/blog/${post.slug}`}>詳しく読む →</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
