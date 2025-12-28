import "@/app/globals.css";
import { Inter } from "next/font/google";
import styles from './layout.module.css';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollIndicator from '@/components/ScrollIndicator';
import { ToastProvider } from '@/components/Toast/ToastProvider';
import Sidebar from './components/Sidebar';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Investment Dashboard | Portfolio Balance",
  description: "Gerencie sua carteira de investimentos com rebalanceamento inteligente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ToastProvider>
          <ScrollIndicator />
          <ParticleBackground />
          <div className={styles.layoutContainer}>
            
            {/* Sidebar */}
            <Sidebar />

            {/* Conteúdo */}
            <main className={styles.mainContent}>
              <div className={styles.orb1} />
              <div className={styles.orb2} />
              <div className={styles.contentWrapper}>
                {children}
              </div>
            </main>

          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
