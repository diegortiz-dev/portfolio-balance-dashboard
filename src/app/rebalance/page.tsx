'use client';

import { useState, useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useToast } from '@/components/Toast/ToastProvider';
import { RefreshCw, ArrowUp, ArrowDown, Minus, AlertTriangle, CheckCircle, TrendingUp, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useRouter } from 'next/navigation';
import styles from './Rebalance.module.css';

export default function RebalancePage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const router = useRouter();
  
  const assets = usePortfolioStore((state) => state.assets);
  const getTotalValue = usePortfolioStore((state) => state.getTotalValue);
  const getRebalanceData = usePortfolioStore((state) => state.getRebalanceData);
  
  const { showToast } = useToast();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" text="Carregando dados de rebalanceamento..." />
      </div>
    );
  }

  const total = getTotalValue();
  const rebalanceData = getRebalanceData();
  const newInvestment = parseFloat(investmentAmount) || 0;
  const totalWithInvestment = total + newInvestment;

  // Calculate rebalance suggestions including new investment
  const calculateNewAllocation = () => {
    return rebalanceData.map(item => {
      const idealValueWithInvestment = (item.idealPercent / 100) * totalWithInvestment;
      const differenceWithInvestment = idealValueWithInvestment - item.current;
      
      let action: 'buy' | 'sell' | 'hold' = 'hold';
      if (differenceWithInvestment > 50) action = 'buy';
      else if (differenceWithInvestment < -50) action = 'sell';

      return {
        ...item,
        idealWithInvestment: idealValueWithInvestment,
        differenceWithInvestment,
        actionWithInvestment: action,
      };
    });
  };

  const enhancedData = calculateNewAllocation();
  
  const needsRebalancing = rebalanceData.some(item => Math.abs(item.difference) > 50);
  const buyItems = enhancedData.filter(item => 
    newInvestment > 0 ? item.differenceWithInvestment > 50 : item.difference > 50
  );
  const sellItems = enhancedData.filter(item => 
    newInvestment > 0 ? item.differenceWithInvestment < -50 : item.difference < -50
  );
  const holdItems = enhancedData.filter(item => {
    const diff = newInvestment > 0 ? item.differenceWithInvestment : item.difference;
    return Math.abs(diff) <= 50;
  });

  if (assets.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Rebalancear</h1>
          <p className={styles.subtitle}>Otimize sua carteira de investimentos</p>
        </div>
        <EmptyState
          title="Nenhum ativo cadastrado"
          description="Adicione ativos à sua carteira para calcular o rebalanceamento."
          action={{
            label: '+ Adicionar Ativo',
            onClick: () => router.push('/assets'),
          }}
        />
      </div>
    );
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'buy':
        return <ArrowUp size={18} />;
      case 'sell':
        return <ArrowDown size={18} />;
      default:
        return <Minus size={18} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Rebalancear</h1>
          <p className={styles.subtitle}>Otimize sua carteira de investimentos</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Valor Atual</span>
            <span className={styles.summaryValue}>
              R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={`${styles.summaryIcon} ${needsRebalancing ? styles.warning : styles.success}`}>
            {needsRebalancing ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
          </div>
          <div className={styles.summaryContent}>
            <span className={styles.summaryLabel}>Status</span>
            <span className={`${styles.summaryValue} ${needsRebalancing ? styles.textWarning : styles.textSuccess}`}>
              {needsRebalancing ? 'Precisa Ajustar' : 'Equilibrada'}
            </span>
          </div>
        </div>

        <div className={`${styles.summaryCard} ${styles.investmentCard}`}>
          <div className={styles.summaryIcon}>
            <Calculator size={24} />
          </div>
          <div className={styles.investmentInput}>
            <label className={styles.investmentLabel}>Simular novo aporte</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencyPrefix}>R$</span>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="0,00"
                className={styles.input}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Investment Simulation Result */}
      {newInvestment > 0 && (
        <motion.div 
          className={styles.simulationBanner}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <RefreshCw size={20} />
          <span>
            Simulando aporte de <strong>R$ {newInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>. 
            Total projetado: <strong>R$ {totalWithInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
          </span>
        </motion.div>
      )}

      {/* Rebalancing Recommendations */}
      <div className={styles.sectionsGrid}>
        {/* Buy Section */}
        <div className={styles.section}>
          <div className={`${styles.sectionHeader} ${styles.buyHeader}`}>
            <ArrowUp size={20} />
            <h3>Comprar</h3>
            <span className={styles.sectionCount}>{buyItems.length}</span>
          </div>
          <div className={styles.sectionContent}>
            {buyItems.length === 0 ? (
              <p className={styles.emptySection}>Nenhuma compra necessária</p>
            ) : (
              buyItems.map((item, index) => (
                <motion.div
                  key={item.class}
                  className={`${styles.itemCard} ${styles.buyItem}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.itemHeader}>
                    <span className={styles.itemClass}>{item.class}</span>
                    <span className={styles.itemBadge}>
                      {getActionIcon('buy')}
                      Comprar
                    </span>
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.detailRow}>
                      <span>Atual:</span>
                      <span>R$ {item.current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Ideal:</span>
                      <span>
                        R$ {(newInvestment > 0 ? item.idealWithInvestment : item.ideal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <div className={styles.itemAction}>
                    <span className={styles.actionLabel}>Investir:</span>
                    <span className={styles.actionValue}>
                      R$ {Math.abs(newInvestment > 0 ? item.differenceWithInvestment : item.difference).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Hold Section */}
        <div className={styles.section}>
          <div className={`${styles.sectionHeader} ${styles.holdHeader}`}>
            <Minus size={20} />
            <h3>Manter</h3>
            <span className={styles.sectionCount}>{holdItems.length}</span>
          </div>
          <div className={styles.sectionContent}>
            {holdItems.length === 0 ? (
              <p className={styles.emptySection}>Nenhum ativo equilibrado</p>
            ) : (
              holdItems.map((item, index) => (
                <motion.div
                  key={item.class}
                  className={`${styles.itemCard} ${styles.holdItem}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.itemHeader}>
                    <span className={styles.itemClass}>{item.class}</span>
                    <span className={`${styles.itemBadge} ${styles.holdBadge}`}>
                      {getActionIcon('hold')}
                      Equilibrado
                    </span>
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.detailRow}>
                      <span>Atual:</span>
                      <span>{item.currentPercent.toFixed(1)}%</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Ideal:</span>
                      <span>{item.idealPercent.toFixed(1)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Sell Section */}
        <div className={styles.section}>
          <div className={`${styles.sectionHeader} ${styles.sellHeader}`}>
            <ArrowDown size={20} />
            <h3>Vender</h3>
            <span className={styles.sectionCount}>{sellItems.length}</span>
          </div>
          <div className={styles.sectionContent}>
            {sellItems.length === 0 ? (
              <p className={styles.emptySection}>Nenhuma venda necessária</p>
            ) : (
              sellItems.map((item, index) => (
                <motion.div
                  key={item.class}
                  className={`${styles.itemCard} ${styles.sellItem}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.itemHeader}>
                    <span className={styles.itemClass}>{item.class}</span>
                    <span className={`${styles.itemBadge} ${styles.sellBadge}`}>
                      {getActionIcon('sell')}
                      Vender
                    </span>
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.detailRow}>
                      <span>Atual:</span>
                      <span>R$ {item.current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Ideal:</span>
                      <span>
                        R$ {(newInvestment > 0 ? item.idealWithInvestment : item.ideal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.itemAction} ${styles.sellAction}`}>
                    <span className={styles.actionLabel}>Reduzir:</span>
                    <span className={styles.actionValue}>
                      R$ {Math.abs(newInvestment > 0 ? item.differenceWithInvestment : item.difference).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
