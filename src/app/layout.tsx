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
        <div style={{display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 2}}>
          
          {/* Sidebar */}
          <aside style={{
            width: '280px',
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.7) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRight: '1px solid rgba(99, 102, 241, 0.2)',
            boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              padding: '2rem 1.5rem',
              borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, transparent 100%)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.2) inset',
                  border: '1px solid rgba(99, 102, 241, 0.3)'
                }}>
                  <TrendingUp style={{color: '#a5b4fc', filter: 'drop-shadow(0 0 8px rgba(129, 140, 248, 0.6))'}} size={28} />
                </div>
                <div>
                  <h1 style={{
                    fontSize: '1.5rem', 
                    fontWeight: '800', 
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #a5b4fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em'
                  }}>Portfolio</h1>
                  <p style={{
                    fontSize: '0.875rem', 
                    color: '#818cf8', 
                    fontWeight: '600',
                    letterSpacing: '0.05em'
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
            background: 'transparent',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0
            }} />
            <div style={{
              position: 'absolute',
              bottom: '10%',
              left: '10%',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}
