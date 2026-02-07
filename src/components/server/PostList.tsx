import styles from './post-list.module.css';

import type { RemotePost } from '@/types';

type Props = {
  posts: RemotePost[];
};

const PostList = ({ posts }: Props) => {
  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <article key={post.id} className={styles.item}>
          <p className={styles.meta}>投稿者ID: {post.userId}</p>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.body}>{post.body}</p>
        </article>
      ))}
    </div>
  );
};

export default PostList;
