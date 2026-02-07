# ビルドステージ
FROM node:24.2.0-alpine AS builder

WORKDIR /app

# 依存関係ファイルをコピーしてインストール
COPY package.json package-lock.json ./
RUN npm ci --only=production=false

# ソースコードをコピー
COPY . .

# Next.jsのビルドを実行
RUN npm run build

# 本番ステージ
FROM node:24.2.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone Outputから必要なファイルをコピー
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 非rootユーザーに切り替え
USER nextjs

# ポートを公開
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# アプリケーションを起動
CMD ["node", "server.js"]
