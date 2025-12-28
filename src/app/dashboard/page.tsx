'use client';

import { useEffect, useState } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { ChartData } from '@/types';
import StatsCard from './components/StatsCard';
import AssetPieChart from './components/AssetPieChart';
import IdealVsCurrentBar from './components/IdealVsCurrentBar';
import RebalanceSummary from './components/RebalanceSummary';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  
  const assets = usePortfolioStore((state) => state.assets);
  const getTotalValue = usePortfolioStore((state) => state.getTotalValue);
  const getRebalanceData = usePortfolioStore((state) => state.getRebalanceData);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" text="Carregando dashboard..." />
      </div>
    );
  }

  const total = getTotalValue();
  const rebalanceData = getRebalanceData();
  
  const pieData: ChartData[] = Object.entries(
    assets.reduce((acc: Record<string, number>, asset) => {
      acc[asset.class] = (acc[asset.class] || 0) + asset.value;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const classCount = new Set(assets.map(a => a.class)).size;
  
  // Calculate variation (simulated for now)
  const variation = assets.length > 0 ? ((Math.random() * 10) - 3).toFixed(2) : '0.00';
  const variationPositive = parseFloat(variation) >= 0;

  // Calculate most valuable asset
  const mostValuableAsset = assets.length > 0 
    ? assets.reduce((max, asset) => asset.value > max.value ? asset : max, assets[0])
    : null;

  if (assets.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Visão geral da sua carteira de investimentos</p>
        </div>
        <EmptyState
          title="Nenhum ativo cadastrado"
          description="Adicione seus primeiros ativos para começar a visualizar sua carteira de investimentos."
          action={{
            label: '+ Adicionar Ativo',
            onClick: () => router.push('/assets'),
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Visão geral da sua carteira de investimentos</p>
      </div>

      <div className={styles.statsGrid}>
        <StatsCard 
          title="Total Investido" 
          value={`R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          trend={variationPositive ? 'up' : 'down'}
          trendValue={`${variationPositive ? '+' : ''}${variation}%`}
        />
        <StatsCard 
          title="Ativos" 
          value={assets.length.toString()} 
          subtitle={mostValuableAsset ? `Maior: ${mostValuableAsset.name}` : undefined}
        />
        <StatsCard 
          title="Classes" 
          value={classCount.toString()} 
          subtitle={`de ${Object.keys(usePortfolioStore.getState().allocation).length} configuradas`}
        />
        <StatsCard 
          title="Média por Ativo" 
          value={`R$ ${(total / assets.length).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        />
      </div>

      <div className={styles.chartsGrid}>
        <AssetPieChart data={pieData} total={total} />
        <IdealVsCurrentBar data={rebalanceData} />
      </div>

      <RebalanceSummary data={rebalanceData} />
    </div>
  );
}
