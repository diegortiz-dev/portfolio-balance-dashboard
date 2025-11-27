import "@/app/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { BarChart3, PieChart, Settings, TrendingUp } from "lucide-react";
import styles from './layout.module.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Investment Dashboard",
  description: "Portfolio Rebalance Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div style={{display: 'flex', minHeight: '100vh'}}>
          
          {/* Sidebar */}
          <aside style={{
            width: '280px',
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              padding: '2rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp style={{color: '#818cf8'}} size={28} />
                </div>
                <div>
                  <h1 style={{
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: '#FFFFFF', 
                    lineHeight: '1.2'
                  }}>Portfolio</h1>
                  <p style={{
                    fontSize: '0.875rem', 
                    color: '#94a3b8', 
                    fontWeight: '500'
                  }}>Dashboard</p>
                </div>
              </div>
            </div>

            <nav style={{padding: '1.5rem 1rem'}}>
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
          <main style={{
            flex: 1, 
            padding: '2.5rem', 
            background: '#0f1419'
          }}>
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
