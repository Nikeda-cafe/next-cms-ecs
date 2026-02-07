import Link from 'next/link';

import { navItems } from '@/lib/constants';

import styles from './footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span>© {year} Next CMS Starter</span>
      <div className={styles.links}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
