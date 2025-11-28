'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { RebalanceData } from '@/types';
import styles from './Chart.module.css';

interface IdealVsCurrentBarProps {
  data: RebalanceData[];
}

export default function IdealVsCurrentBar({ data }: IdealVsCurrentBarProps) {
  return (
    <motion.div 
      className={styles.chartContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className={styles.chartTitle}>Atual vs Ideal</h3>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255, 255, 255, 0.1)" 
              vertical={false}
            />
            <XAxis 
              dataKey="class" 
              stroke="#a5b4fc" 
              style={{ fontSize: 12, fontWeight: 600 }}
            />
            <YAxis 
              stroke="#a5b4fc" 
              style={{ fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip 
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.98)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '0.75rem',
                color: '#FFFFFF',
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
              }}
            />
            <Legend 
              wrapperStyle={{
                fontSize: '12px',
                fontWeight: 600
              }}
            />
            <Bar 
              dataKey="current" 
              fill="url(#colorCurrent)" 
              name="Atual" 
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="ideal" 
              fill="url(#colorIdeal)" 
              name="Ideal" 
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity={1} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="colorIdeal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
