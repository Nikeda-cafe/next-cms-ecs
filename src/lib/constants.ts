import type { BlogPost } from '@/types';
import type { Metadata, Route } from 'next';

export const siteMetadata: Metadata = {
  title: 'Next CMS Starter',
  description: 'App Router + RSC を前提にした拡張可能なCMS連携デモサイト',
  metadataBase: new URL('https://next-cms.local'),
};

export const navItems: Array<{ label: string; href: Route }> = [
  { label: 'ホーム', href: '/' as Route },
  { label: 'About', href: '/about' as Route },
  { label: 'Contact', href: '/contact' as Route },
  { label: 'Blog', href: '/blog' as Route },
  { label: 'Posts', href: '/posts' as Route },
];

export const heroHighlights = [
  {
    title: 'App Router ベース',
    description: 'レイアウト共有やRoute HandlerなどNext.js 14の機能を網羅。',
  },
  {
    title: 'RSCファースト',
    description: '取得データはServer Component側で集約し、必要な箇所だけClient化。',
  },
  {
    title: 'ZustandでUI制御',
    description: 'モバイルメニューなどのブラウザ依存状態のみを軽量に管理。',
  },
];

export const contactInfo = {
  email: 'hello@next-cms.dev',
  phone: '+81-3-1234-5678',
  location: 'Tokyo, Remote-friendly',
  officeHours: 'Mon - Fri / 10:00 - 18:00 JST',
};

export const aboutValues = [
  {
    title: 'Jamstack & Headless',
    content:
      'ヘッドレスCMSやGraphQL APIとの接続を想定したモジュール構成で、迅速に実案件へ展開できます。',
  },
  {
    title: 'DXを支える設計',
    content:
      'Lint/Format/Test を標準化し、プロダクトチーム間で再利用しやすいNext.jsスターターです。',
  },
  {
    title: 'コンテンツ運用に最適',
    content:
      'ブログやLPなどの追加にも柔軟に対応。将来的にCMS連携をしても破綻しづらい構造です。',
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'rsc-design-notes',
    title: 'RSC構成の設計ノート',
    description: 'App RouterでServer Componentを中心に据える際の考慮点を整理しました。',
    author: 'Kana Engineer',
    publishedAt: '2024-05-12',
    readingTime: '6 min',
    tags: ['RSC', 'App Router', 'Architecture'],
    body: [
      'Next.js 14でRSCを採用する場合、UIレイヤーの責務をServer/Clientで明確に切り分ける必要があります。',
      'Zustandなどのクライアント状態は局所化し、データ取得はRSC経由で実施するのが基本です。',
    ],
  },
  {
    slug: 'content-modeling-checklist',
    title: 'CMS連携のコンテンツモデリングTips',
    description: 'コンテンツ設計段階で確認したいチェックリストをまとめました。',
    author: 'Sara Content Lead',
    publishedAt: '2024-04-30',
    readingTime: '5 min',
    tags: ['CMS', 'Content Design'],
    body: [
      'API設計とCMSのモデリングは同時進行で考えると整合性がとりやすくなります。',
      'Webサイトの将来のページ構成を見据えて階層や分類を設計しましょう。',
    ],
  },
  {
    slug: 'playwright-e2e-guide',
    title: 'Playwrightで始めるE2Eテスト',
    description: '主要導線をPlaywrightで担保する際のベストプラクティス。',
    author: 'Taku QA',
    publishedAt: '2024-03-18',
    readingTime: '7 min',
    tags: ['Testing', 'Playwright'],
    body: [
      'E2EテストはHappyパスを重視し、ユースケース単位で独立させると保守しやすくなります。',
      'CIでは動画やトレースを保存し、ナレッジの共有に役立てましょう。',
    ],
  },
];
