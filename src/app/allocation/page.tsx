'use client';

import { useState, useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useToast } from '@/components/Toast/ToastProvider';
import { useConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { ASSET_CLASSES } from '@/constants';
import { Target, TrendingUp, Save, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import styles from './Allocation.module.css';

export default function AllocationPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const allocation = usePortfolioStore((state) => state.allocation);
  const setAllocation = usePortfolioStore((state) => state.setAllocation);
  const updateAllocationClass = usePortfolioStore((state) => state.updateAllocationClass);
  const addAllocationClass = usePortfolioStore((state) => state.addAllocationClass);
  const removeAllocationClass = usePortfolioStore((state) => state.removeAllocationClass);
  
  const { showToast } = useToast();
  const { confirm, DialogComponent } = useConfirmDialog();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleChange = (key: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateAllocationClass(key, Math.max(0, Math.min(100, numValue)));
  };

  const handleSave = () => {
    const total = Object.values(allocation).reduce((acc, v) => acc + v, 0);
    
    if (Math.abs(total - 100) > 0.01) {
      showToast(`Total deve ser 100%. Atual: ${total.toFixed(2)}%`, 'error');
      return;
    }

    showToast('Alocação salva com sucesso!', 'success');
  };

  const handleAddClass = () => {
    if (!newClassName.trim()) {
      showToast('Digite um nome para a classe', 'warning');
      return;
    }
    
    if (allocation[newClassName.trim()]) {
      showToast('Esta classe já existe', 'warning');
      return;
    }
    
    addAllocationClass(newClassName.trim());
    setNewClassName('');
    setShowAddForm(false);
    showToast(`Classe "${newClassName.trim()}" adicionada!`, 'success');
  };

  const handleRemoveClass = async (className: string) => {
    const confirmed = await confirm(
      'Remover Classe',
      `Tem certeza que deseja remover a classe "${className}"?`,
      'warning'
    );
    
    if (confirmed) {
      removeAllocationClass(className);
      showToast(`Classe "${className}" removida!`, 'success');
    }
  };

  const handleDistributeEvenly = () => {
    const classCount = Object.keys(allocation).length;
    if (classCount === 0) return;
    
    const evenValue = Math.floor((100 / classCount) * 100) / 100;
    const remainder = 100 - (evenValue * classCount);
    
    const newAllocation = { ...allocation };
    const keys = Object.keys(newAllocation);
    keys.forEach((key, index) => {
      newAllocation[key] = index === 0 ? evenValue + remainder : evenValue;
    });
    
    setAllocation(newAllocation);
    showToast('Alocação distribuída igualmente!', 'info');
  };

  if (!isHydrated) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" text="Carregando configurações..." />
      </div>
    );
  }

  const total = Object.values(allocation).reduce((acc, v) => acc + v, 0);
  const isValid = Math.abs(total - 100) < 0.01;

  return (
    <div className={styles.container}>
      <DialogComponent />
      
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Alocação Ideal</h1>
          <p className={styles.subtitle}>Configure as porcentagens ideais para cada classe de ativo</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Target size={20} />
              Configurar Alocação
            </h3>
            <button onClick={handleDistributeEvenly} className={styles.distributeButton}>
              Distribuir Igualmente
            </button>
          </div>

          <div className={styles.allocationList}>
            <AnimatePresence>
              {Object.entries(allocation).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className={styles.allocationItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className={styles.itemInfo}>
                    <div className={styles.itemIcon}>
                      <Target size={18} />
                    </div>
                    <span className={styles.itemLabel}>{key}</span>
                  </div>
                  
                  <div className={styles.itemControls}>
                    <div className={styles.inputWrapper}>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="100"
                        value={value}
                        onChange={e => handleChange(key, e.target.value)}
                        className={styles.percentInput}
                      />
                      <span className={styles.percentSign}>%</span>
                    </div>
                    
                    <div className={styles.progressBar}>
                      <motion.div 
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(value, 100)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    {!ASSET_CLASSES.includes(key as typeof ASSET_CLASSES[number]) && (
                      <button
                        onClick={() => handleRemoveClass(key)}
                        className={styles.removeButton}
                        title="Remover classe"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {showAddForm ? (
            <motion.div 
              className={styles.addForm}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <input
                type="text"
                value={newClassName}
                onChange={e => setNewClassName(e.target.value)}
                placeholder="Nome da nova classe"
                className={styles.addInput}
                autoFocus
              />
              <button onClick={handleAddClass} className={styles.confirmAddButton}>
                <Plus size={18} />
                Adicionar
              </button>
              <button onClick={() => setShowAddForm(false)} className={styles.cancelAddButton}>
                Cancelar
              </button>
            </motion.div>
          ) : (
            <button onClick={() => setShowAddForm(true)} className={styles.addClassButton}>
              <Plus size={18} />
              Adicionar Nova Classe
            </button>
          )}

          <div className={`${styles.totalSection} ${isValid ? styles.valid : styles.invalid}`}>
            <div className={styles.totalInfo}>
              {isValid ? (
                <CheckCircle size={24} className={styles.validIcon} />
              ) : (
                <AlertCircle size={24} className={styles.invalidIcon} />
              )}
              <div>
                <p className={styles.totalLabel}>Total da Alocação</p>
                <p className={styles.totalValue}>{total.toFixed(2)}%</p>
              </div>
            </div>
            
            {!isValid && (
              <p className={styles.totalHint}>
                {total < 100 
                  ? `Faltam ${(100 - total).toFixed(2)}% para completar` 
                  : `Excesso de ${(total - 100).toFixed(2)}%`}
              </p>
            )}
          </div>

          <button 
            onClick={handleSave} 
            className={styles.saveButton}
            disabled={!isValid}
          >
            <Save size={20} />
            Salvar Alocação
          </button>
        </div>
      </div>
    </div>
  );
}
