import Footer from '@/components/server/Footer';
import Header from '@/components/server/Header';

import { siteMetadata } from '@/lib/constants';

import '@/styles/globals.css';
import styles from './layout.module.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div className={styles.shell}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
