'use client';

import { useEffect, useState } from 'react';
import { Asset, Allocation, ChartData, RebalanceData } from '@/types';
import { API_ROUTES } from '@/constants';
import { calculateRebalance } from '@/lib/calculations/rebalance';
import StatsCard from './components/StatsCard';
import AssetPieChart from './components/AssetPieChart';
import IdealVsCurrentBar from './components/IdealVsCurrentBar';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [allocation, setAllocation] = useState<Allocation>({});
  const [rebalanceData, setRebalanceData] = useState<RebalanceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [assetsRes, allocationRes] = await Promise.all([
        fetch(API_ROUTES.ASSETS),
        fetch(API_ROUTES.ALLOCATION)
      ]);
      const assetsData = await assetsRes.json();
      const allocationData = await allocationRes.json();
      setAssets(assetsData);
      setAllocation(allocationData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (assets.length && Object.keys(allocation).length) {
      const current: Record<string, number> = {};
      assets.forEach(asset => {
        current[asset.class] = (current[asset.class] || 0) + asset.value;
      });
      const result = calculateRebalance(current, allocation);
      setRebalanceData(result);
    }
  }, [assets, allocation]);

  const total = assets.reduce((acc, asset) => acc + asset.value, 0);
  
  const pieData: ChartData[] = Object.entries(
    assets.reduce((acc: Record<string, number>, asset) => {
      acc[asset.class] = (acc[asset.class] || 0) + asset.value;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Visão geral da sua carteira de investimentos</p>
      </div>

      <div className={styles.statsGrid}>
        <StatsCard title="Total Investido" value={`R$ ${total.toFixed(2)}`} />
        <StatsCard title="Ativos" value={assets.length.toString()} />
        <StatsCard title="Classes" value={pieData.length.toString()} />
      </div>

      <div className={styles.chartsGrid}>
        <AssetPieChart data={pieData} />
        <IdealVsCurrentBar data={rebalanceData} />
      </div>
    </div>
  );
}
