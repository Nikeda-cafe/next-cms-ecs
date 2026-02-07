# Next.js（App Router / RSC）簡易Webサイト 仕様書

## 1. 目的
Next.js App Router を用いて、シンプルで拡張しやすいWebサイトを構築する。  
レンダリングは **RSC（React Server Components）を基本**とし、必要な箇所のみ Client Component を利用する。

---

## 2. 採用技術・前提

### 2.1 フレームワーク / 実行環境
- Framework: **Next.js（App Router）**
- Rendering: **RSC を基本（Server Component ファースト）**
- Node.js: LTS（例: 20.x 以上想定）
- Package manager: npm / pnpm / yarn のいずれか（プロジェクトで統一）

### 2.2 状態管理
- **Zustand**
  - グローバル状態は最小限にする（UI状態/クライアント専用状態中心）
  - RSC では Zustand を直接使わず、必要箇所のみ Client Component に切り出す

### 2.3 スタイリング
- **CSS Modules**
- Stylelint（CSS ModulesをLint対象に含める）

### 2.4 Lint / Format
- ESLint
- Prettier
- Stylelint

### 2.5 テスト（適切なもの）
以下を標準構成とする（Next.js/App Router と相性がよく、運用が軽い）
- **Unit / Component Test:** Vitest + React Testing Library
- **E2E Test:** Playwright

> 代替案（Jest運用に慣れている場合）: Jest + RTL + Playwright  
> 本仕様書では Vitest を推奨。

---

## 3. 画面・機能要件（簡易サイト想定）
※要件が未確定の場合でも実装しやすい最小構成を定義する。

### 3.1 ページ一覧（例）
- `/` : トップページ
- `/about` : サイト説明
- `/contact` : 問い合わせ（UIのみ / 送信は後日拡張可能）
- `/blog` : 記事一覧（ダミーデータ or 後日CMS連携）
- `/blog/[slug]` : 記事詳細

### 3.2 共通UI
- ヘッダー（サイト名、ナビゲーション）
- フッター（コピーライト、リンク）
- レイアウトは `app/layout.tsx` を基点に共通化

---

## 4. アーキテクチャ方針（RSC / Client Component）

### 4.1 基本方針
- 原則 **Server Component** でページを構成
- 以下の要件がある部品のみ `use client` を付けた Client Component にする
  - ブラウザAPI依存（localStorage / window など）
  - ユーザー操作に応じた状態変化（フォーム入力、モーダル開閉など）
  - Zustand を使用するUI状態管理

### 4.2 データ取得
- Server Component では `fetch()` を用いた取得を基本とする
- キャッシュ方針（必要に応じて選択）
  - 静的寄り: `fetch(..., { cache: "force-cache" })`
  - 動的寄り: `fetch(..., { cache: "no-store" })`
  - ISR: `next: { revalidate: n }`

### 4.3 Zustand の使いどころ
- 例: ナビゲーションの開閉、トースト、フィルタ条件など **UI状態**
- サーバーから取得するドメインデータは **RSC側で取得して props 渡し**を優先
- Client 側で保持が必要なら、Client Component 内で Zustand に投入（hydrationの責務を明確化）

---

## 5. ディレクトリ構成（案）

```text
src/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    contact/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
  components/
    server/
      Header.tsx
      Footer.tsx
    client/
      MobileMenu.tsx
      ContactForm.tsx
  stores/
    uiStore.ts
  styles/
    globals.css
  lib/
    fetcher.ts
    constants.ts
  types/
    index.ts
```

### 5.1 ルール
- `components/server`：Server Component（原則 `use client` 禁止）
- `components/client`：Client Component（ファイル先頭に `use client`）
- `stores`：Zustand store（Client からのみ参照される設計にする）
- `styles/globals.css`：全体のベース（最小限）
- 個別スタイルは CSS Modules（`*.module.css`）

---

## 6. コーディング規約（抜粋）

### 6.1 命名
- Component: PascalCase
- hooks/store: camelCase（例: `useUiStore`）
- CSS Modules: `className={styles.container}` の形式

### 6.2 import
- 絶対import（例: `@/components/...`）を推奨（tsconfig paths）
- Server/Client の境界を跨ぐ import を避ける
  - Server → Client は OK（ServerがClient部品を「使う」のはOK）
  - Client → Server は NG（RSC制約）

---

## 7. Lint / Format / Style 設定方針

### 7.1 ESLint
- Next.js推奨ルール（`next/core-web-vitals`）
- React / TypeScript（導入する場合）ルール
- import順序や未使用を検知（必要に応じて plugin 追加）

### 7.2 Prettier
- 単一のフォーマット基準として採用
- ESLintと競合しないよう連携（eslint-config-prettier）

### 7.3 Stylelint
- CSS Modules 対応（`*.module.css` を対象）
- ルールは厳しすぎない設定から開始（運用しやすさ優先）

---

## 8. テスト仕様

### 8.1 Unit / Component（Vitest + RTL）
対象：
- Client Component の表示と振る舞い
  - 例: ContactForm の入力検証、送信ボタン活性/非活性
  - 例: MobileMenu の開閉（Zustand状態含む）

方針：
- テストは「ユーザー操作」中心（実装詳細に依存しない）
- Server Component は基本テスト対象外（必要ならロジックを `lib` に分離してテスト）

### 8.2 E2E（Playwright）
対象：
- 主要導線の動作確認
  - トップ表示
  - ナビゲーション遷移
  - 問い合わせフォームの入力→確認表示（実装範囲に応じて）
  - blog一覧→詳細遷移

---

## 9. スクリプト（例）
- `dev`：開発起動
- `build`：ビルド
- `start`：本番起動
- `lint`：ESLint
- `format` / `format:check`：Prettier
- `stylelint`：Stylelint
- `test`：Vitest
- `test:e2e`：Playwright

---

## 10. 品質要件（最低限）
- パフォーマンス
  - 不要な Client 化を避ける（RSCを優先）
- アクセシビリティ
  - ボタン/リンクの適切な要素使用
  - フォーカス可能、ラベル付与（フォーム）
- SEO
  - `metadata`（タイトル/description）をページごとに設定

---

## 11. 受け入れ条件（Doneの定義）
- 指定の技術スタックで起動・ビルドが通る
- 主要ページが表示できる（/ /about /contact /blog /blog/[slug]）
- Lint/Format/Stylelint が CI 相当でパスする
- Unit/Component テストが最低限通る（代表ケース）
- E2E が最低限通る（ページ遷移の代表ケース）

---

## 12. 今後の拡張候補（任意）
- お問い合わせのAPI（Route Handler）追加
- 記事データのCMS連携（microCMS / Contentful 等）
- Storybook + Chromatic（UI運用が必要になったタイミングで）
- i18n（多言語対応）
