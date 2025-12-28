'use client';

import { useState, useEffect } from 'react';
import { Asset } from '@/types';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useToast } from '@/components/Toast/ToastProvider';
import { useConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import AssetForm from './components/AssetForm';
import AssetTable from './components/AssetTable';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import styles from './Assets.module.css';

export default function AssetsPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  
  const assets = usePortfolioStore((state) => state.assets);
  const addAsset = usePortfolioStore((state) => state.addAsset);
  const updateAsset = usePortfolioStore((state) => state.updateAsset);
  const deleteAsset = usePortfolioStore((state) => state.deleteAsset);
  
  const { showToast } = useToast();
  const { confirm, DialogComponent } = useConfirmDialog();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = (asset: Omit<Asset, 'id'>) => {
    if (editingAsset) {
      updateAsset(editingAsset.id, asset);
      showToast(`Ativo "${asset.name}" atualizado com sucesso!`, 'success');
      setEditingAsset(null);
    } else {
      addAsset(asset);
      showToast(`Ativo "${asset.name}" adicionado com sucesso!`, 'success');
    }
  };

  const handleDelete = async (id: string) => {
    const asset = assets.find(a => a.id === id);
    if (!asset) return;

    const confirmed = await confirm(
      'Excluir Ativo',
      `Tem certeza que deseja excluir "${asset.name}"? Esta ação não pode ser desfeita.`,
      'danger'
    );

    if (confirmed) {
      deleteAsset(id);
      showToast(`Ativo "${asset.name}" excluído com sucesso!`, 'success');
    }
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    showToast(`Editando "${asset.name}"`, 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingAsset(null);
    showToast('Edição cancelada', 'info');
  };

  if (!isHydrated) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" text="Carregando ativos..." />
      </div>
    );
  }

  const totalValue = assets.reduce((acc, asset) => acc + asset.value, 0);

  return (
    <div className={styles.container}>
      <DialogComponent />
      
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Ativos</h1>
          <p className={styles.subtitle}>Gerencie seus ativos e investimentos</p>
        </div>
        {assets.length > 0 && (
          <div className={styles.headerStats}>
            <span className={styles.statItem}>
              <strong>{assets.length}</strong> ativos
            </span>
            <span className={styles.statDivider}>•</span>
            <span className={styles.statItem}>
              <strong>R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> total
            </span>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        <div className={styles.formSection}>
          <AssetForm onSubmit={handleSubmit} initialData={editingAsset} />
          {editingAsset && (
            <button onClick={handleCancelEdit} className={styles.cancelButton}>
              ✕ Cancelar Edição
            </button>
          )}
        </div>

        <div className={styles.tableSection}>
          <AssetTable assets={assets} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
}
