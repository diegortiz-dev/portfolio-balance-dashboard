'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import styles from './Chart.module.css';

interface RebalanceItem {
  class: string;
  current: number;
  currentPercent: number;
  ideal: number;
  idealPercent: number;
  difference: number;
  action: 'buy' | 'sell' | 'hold';
}

interface IdealVsCurrentBarProps {
  data: RebalanceItem[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color, marginBottom: '0.25rem' }}>
            {entry.name}: R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function IdealVsCurrentBar({ data }: IdealVsCurrentBarProps) {
  // Transform data for the chart
  const chartData = data.map(item => ({
    class: item.class,
    current: item.current,
    ideal: item.ideal,
  }));

  return (
    <motion.div 
      className={styles.chartContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Atual vs Ideal</h3>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255, 255, 255, 0.1)" 
              vertical={false}
            />
            <XAxis 
              dataKey="class" 
              stroke="#a5b4fc" 
              style={{ fontSize: 12, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            />
            <YAxis 
              stroke="#a5b4fc" 
              style={{ fontSize: 12, fontWeight: 600 }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                fontSize: '12px',
                fontWeight: 600
              }}
              formatter={(value) => <span style={{ color: '#e2e8f0' }}>{value}</span>}
            />
            <Bar 
              dataKey="current" 
              fill="url(#colorCurrent)" 
              name="Atual" 
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            />
            <Bar 
              dataKey="ideal" 
              fill="url(#colorIdeal)" 
              name="Ideal" 
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
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
