'use client';

import styles from './StatsCard.module.css';
import { TrendingUp, TrendingDown, Wallet, Layers, BarChart, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

const icons: Record<string, any> = {
  'Total Investido': Wallet,
  'Ativos': Layers,
  'Classes': TrendingUp,
  'Média por Ativo': DollarSign,
};

export default function StatsCard({ title, value, subtitle, trend, trendValue }: StatsCardProps) {
  const Icon = icons[title] || BarChart;
  
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className={styles.icon}>
        <Icon size={24} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <motion.p 
        className={styles.value}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >{value}</motion.p>
      
      {(trend || subtitle) && (
        <div className={styles.footer}>
          {trend && trendValue && (
            <span className={`${styles.trend} ${styles[trend]}`}>
              {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trendValue}
            </span>
          )}
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
      )}
    </motion.div>
  );
}
