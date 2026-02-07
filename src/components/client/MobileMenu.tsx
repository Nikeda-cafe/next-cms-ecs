'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useUiStore } from '@/stores/uiStore';

import styles from './mobile-menu.module.css';

import type { Route } from 'next';

type NavItem = {
  href: Route;
  label: string;
};

type Props = {
  links: NavItem[];
};

const MobileMenu = ({ links }: Props) => {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu, closeMenu } = useUiStore();

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <div>
      <button type="button" onClick={toggleMenu} aria-expanded={isMenuOpen}>
        {isMenuOpen ? 'メニューを閉じる' : 'メニュー'}
      </button>
      {isMenuOpen && (
        <>
          <div className={styles.backdrop} onClick={closeMenu} aria-hidden />
          <div className={styles.menu}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
