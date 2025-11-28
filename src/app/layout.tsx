import "@/app/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { BarChart3, PieChart, Settings, TrendingUp } from "lucide-react";
import styles from './layout.module.css';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollIndicator from '@/components/ScrollIndicator';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Investment Dashboard",
  description: "Portfolio Rebalance Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ScrollIndicator />
        <ParticleBackground />
        <div className={styles.layoutContainer}>
          
          {/* Sidebar */}
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
              <Link href="/dashboard" className={styles.navLink}>
                <BarChart3 size={22} /> 
                <span>Dashboard</span>
              </Link>

              <Link href="/assets" className={styles.navLink}>
                <PieChart size={22} /> 
                <span>Ativos</span>
              </Link>

              <Link href="/allocation" className={styles.navLink}>
                <Settings size={22} /> 
                <span>Alocação Ideal</span>
              </Link>
            </nav>
          </aside>

          {/* Conteúdo */}
          <main className={styles.mainContent}>
            <div className={styles.orb1} />
            <div className={styles.orb2} />
            <div className={styles.contentWrapper}>
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}
