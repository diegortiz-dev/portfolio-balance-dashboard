'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { CHART_COLORS } from '@/constants';
import { ChartData } from '@/types';
import styles from './Chart.module.css';

interface AssetPieChartProps {
  data: ChartData[];
  total?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className={styles.customTooltip}>
        <p className={styles.tooltipLabel}>{data.name}</p>
        <p className={styles.tooltipValue}>
          R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <p className={styles.tooltipPercent}>
          {((data.payload.percent || 0) * 100).toFixed(1)}% da carteira
        </p>
      </div>
    );
  }
  return null;
};

export default function AssetPieChart({ data, total = 0 }: AssetPieChartProps) {
  return (
    <motion.div 
      className={styles.chartContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Distribuição da Carteira</h3>
        {total > 0 && (
          <span className={styles.chartBadge}>
            R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        )}
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data as any}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props: any) => {
              const { name, percent, cx, cy, midAngle, innerRadius, outerRadius } = props;
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              
              if (percent < 0.05) return null;
              
              return (
                <text
                  x={x}
                  y={y}
                  fill="#FFFFFF"
                  textAnchor={x > cx ? 'start' : 'end'}
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
            strokeWidth={2}
            stroke="rgba(15, 23, 42, 0.8)"
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{
              fontSize: '12px',
              fontWeight: 600
            }}
            formatter={(value) => <span style={{ color: '#e2e8f0' }}>{value}</span>}
          />
        </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
