import Link from 'next/link';

import MobileMenu from '@/components/client/MobileMenu';

import { navItems, siteMetadata } from '@/lib/constants';

import styles from './header.module.css';

const siteTitle = typeof siteMetadata.title === 'string' ? siteMetadata.title : 'Next CMS';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.siteName}>
        {siteTitle}
      </Link>
      <nav className={styles.navLinks} aria-label="主要ナビゲーション">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navLink}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.mobileTrigger}>
        <MobileMenu links={navItems} />
      </div>
    </header>
  );
};

export default Header;
