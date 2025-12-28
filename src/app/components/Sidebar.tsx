'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, PieChart, Settings, TrendingUp, RefreshCw } from 'lucide-react';
import styles from '../layout.module.css';

const navItems = [
  { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { href: '/assets', icon: PieChart, label: 'Ativos' },
  { href: '/allocation', icon: Settings, label: 'Alocação Ideal' },
  { href: '/rebalance', icon: RefreshCw, label: 'Rebalancear' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <TrendingUp className={styles.logoSvg} size={28} />
          </div>
          <div>
            <h1 className={styles.logoTitle}>Portfolio</h1>
            <p className={styles.logoSubtitle}>Dashboard</p>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <p className={styles.footerText}>© 2025 Portfolio Balance</p>
      </div>
    </aside>
  );
}
