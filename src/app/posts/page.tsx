import PostList from '@/components/server/PostList';

import styles from './page.module.css';

import type { RemotePost } from '@/types';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const POSTS_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

export const metadata: Metadata = {
  title: 'Posts | Next CMS Starter',
  description: 'JSONPlaceholder から取得した記事を Server Component で表示します。',
};

const fetchRemotePosts = async (): Promise<RemotePost[]> => {
  const response = await fetch(POSTS_ENDPOINT, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch remote posts');
  }

  return response.json();
};

const PostsPage = async () => {
  const posts = await fetchRemotePosts();
  const limitedPosts = posts.slice(0, 10);

  return (
    <section>
      <div className={styles.header}>
        <h1>外部APIからの投稿一覧</h1>
        <p className={styles.description}>
          JSONPlaceholderのREST APIをServer
          Componentで取得し、子コンポーネントにpropsとして渡しています。
        </p>
      </div>
      <PostList posts={limitedPosts} />
    </section>
  );
};

export default PostsPage;
