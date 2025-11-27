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
              stroke="#94a3b8" 
              style={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#94a3b8" 
              style={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                background: 'rgba(30, 41, 59, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                color: '#FFFFFF'
              }}
            />
            <Legend 
              wrapperStyle={{
                fontSize: '12px'
              }}
            />
            <Bar 
              dataKey="current" 
              fill="#818cf8" 
              name="Atual" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="ideal" 
              fill="#34d399" 
              name="Ideal" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
