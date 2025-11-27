'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { CHART_COLORS } from '@/constants';
import { ChartData } from '@/types';
import styles from './Chart.module.css';

interface AssetPieChartProps {
  data: ChartData[];
}

export default function AssetPieChart({ data }: AssetPieChartProps) {
  return (
    <motion.div 
      className={styles.chartContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className={styles.chartTitle}>Distribuição da Carteira</h3>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data as any}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props: any) => {
              const { name, percent } = props;
              return (
                <text
                  x={props.x}
                  y={props.y}
                  fill="#FFFFFF"
                  textAnchor={props.x > props.cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  style={{ fontSize: 12, fontWeight: 600 }}
                >
                  {`${name} ${((percent || 0) * 100).toFixed(0)}%`}
                </text>
              );
            }}
            outerRadius={90}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CHART_COLORS[index % CHART_COLORS.length]}

              />
            ))}
          </Pie>
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
              fontSize: '12px',
              fontWeight: 500
            }}
          />
        </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
