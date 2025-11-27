'use client';

import { useEffect, useState } from 'react';
import { Asset } from '@/types';
import { API_ROUTES } from '@/constants';
import AssetForm from './components/AssetForm';
import AssetTable from './components/AssetTable';
import styles from './Assets.module.css';

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    const response = await fetch(API_ROUTES.ASSETS);
    const data = await response.json();
    setAssets(data);
  };

  const handleSubmit = async (asset: Omit<Asset, 'id'>) => {
    if (editingAsset) {
      await fetch(API_ROUTES.ASSETS, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...asset, id: editingAsset.id }),
      });
      setEditingAsset(null);
    } else {
      await fetch(API_ROUTES.ASSETS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asset),
      });
    }
    loadAssets();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_ROUTES.ASSETS}?id=${id}`, { method: 'DELETE' });
    loadAssets();
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ativos</h1>
        <p className={styles.subtitle}>Gerencie seus ativos e investimentos</p>
      </div>

      <div className={styles.grid}>
        <div>
          <AssetForm onSubmit={handleSubmit} initialData={editingAsset} />
          {editingAsset && (
            <button
              onClick={() => setEditingAsset(null)}
              style={{
                marginTop: '0.75rem',
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(248, 113, 113, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(248, 113, 113, 0.3)',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              ✕ Cancelar Edição
            </button>
          )}
        </div>

        <div style={{gridColumn: 'span 2 / span 2'}}>
          <AssetTable assets={assets} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
}
