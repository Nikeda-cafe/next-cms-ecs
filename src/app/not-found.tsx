import Link from 'next/link';

const NotFound = () => {
  return (
    <div>
      <h1>ページが見つかりません</h1>
      <p>URLをご確認いただくか、トップページへお戻りください。</p>
      <Link href="/">トップに戻る</Link>
    </div>
  );
};

export default NotFound;
