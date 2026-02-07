import { aboutValues } from '@/lib/constants';

import styles from './page.module.css';

import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About | Next CMS Starter',
  description: '開発チームと本スターターの背景をご紹介します。',
};

const AboutPage = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.panel}>
        <h1>このプロジェクトについて</h1>
        <p>
          Next CMS Starterは、App RouterとRSCを日常的に扱うチームのために作られたNext.jsの土台です。
          プロトタイプから本番まで、一貫したDXを提供することを目的としています。
        </p>
        <ul className={styles.list}>
          <li>RSCのベストプラクティスを吸収できる構造</li>
          <li>Lint / Test / E2E を標準化したCI想定</li>
          <li>CMSや外部APIとの接続を見据えた疎結合な設計</li>
        </ul>
      </section>
      <section className={styles.panel}>
        <h2>価値観</h2>
        {aboutValues.map((value) => (
          <article key={value.title}>
            <h3>{value.title}</h3>
            <p>{value.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AboutPage;
