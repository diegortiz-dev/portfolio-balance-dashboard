'use client';

import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import styles from './RebalanceSummary.module.css';

interface RebalanceItem {
  class: string;
  current: number;
  currentPercent: number;
  ideal: number;
  idealPercent: number;
  difference: number;
  action: 'buy' | 'sell' | 'hold';
}

interface RebalanceSummaryProps {
  data: RebalanceItem[];
}

export default function RebalanceSummary({ data }: RebalanceSummaryProps) {
  const needsRebalancing = data.some(item => Math.abs(item.difference) > 50);
  
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'buy':
        return <ArrowUp size={16} />;
      case 'sell':
        return <ArrowDown size={16} />;
      default:
        return <Minus size={16} />;
    }
  };

  const getActionText = (action: string, difference: number) => {
    if (action === 'buy') {
      return `Comprar R$ ${Math.abs(difference).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    } else if (action === 'sell') {
      return `Vender R$ ${Math.abs(difference).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }
    return 'Equilibrado';
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>
            <RefreshCw size={20} />
            Sugestões de Rebalanceamento
          </h3>
          <p className={styles.subtitle}>
            {needsRebalancing 
              ? 'Sua carteira precisa de ajustes para atingir a alocação ideal'
              : 'Sua carteira está bem equilibrada'}
          </p>
        </div>
        {needsRebalancing && (
          <Link href="/rebalance" className={styles.actionLink}>
            Ver Detalhes
          </Link>
        )}
      </div>

      <div className={styles.grid}>
        {data.map((item, index) => (
          <motion.div
            key={item.class}
            className={`${styles.item} ${styles[item.action]}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <div className={styles.itemHeader}>
              <span className={styles.className}>{item.class}</span>
              <span className={`${styles.actionBadge} ${styles[`badge${item.action.charAt(0).toUpperCase() + item.action.slice(1)}`]}`}>
                {getActionIcon(item.action)}
                {item.action === 'buy' ? 'Comprar' : item.action === 'sell' ? 'Vender' : 'OK'}
              </span>
            </div>
            
            <div className={styles.itemBody}>
              <div className={styles.percentages}>
                <div className={styles.percentItem}>
                  <span className={styles.percentLabel}>Atual</span>
                  <span className={styles.percentValue}>{item.currentPercent.toFixed(1)}%</span>
                </div>
                <div className={styles.percentArrow}>→</div>
                <div className={styles.percentItem}>
                  <span className={styles.percentLabel}>Ideal</span>
                  <span className={styles.percentValue}>{item.idealPercent.toFixed(1)}%</span>
                </div>
              </div>
              
              {item.action !== 'hold' && (
                <p className={styles.suggestion}>
                  {getActionText(item.action, item.difference)}
                </p>
              )}
            </div>
            
            <div className={styles.progressBar}>
              <div 
                className={styles.progressCurrent}
                style={{ width: `${Math.min(item.currentPercent, 100)}%` }}
              />
              <div 
                className={styles.progressIdeal}
                style={{ left: `${Math.min(item.idealPercent, 100)}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
