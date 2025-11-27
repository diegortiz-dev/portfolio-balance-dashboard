'use client';

import { useState, useEffect } from 'react';
import { Asset } from '@/types';
import { ASSET_CLASSES } from '@/constants';
import styles from './AssetForm.module.css';

interface AssetFormProps {
  onSubmit: (asset: Omit<Asset, 'id'>) => void;
  initialData?: Asset | null;
}

export default function AssetForm({ onSubmit, initialData }: AssetFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    class: 'FII',
    value: 0,
    quantity: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ name: '', class: 'FII', value: 0, quantity: 0 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.formTitle}>{initialData ? 'Editar Ativo' : 'Novo Ativo'}</h3>
      
      <div className={styles.inputGroup}>
        <label className={styles.label}>Nome</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Classe</label>
        <select
          value={formData.class}
          onChange={e => setFormData({ ...formData, class: e.target.value })}
          className={styles.select}
        >
          {ASSET_CLASSES.map(assetClass => (
            <option key={assetClass} value={assetClass}>{assetClass}</option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Valor</label>
        <input
          type="number"
          step="0.01"
          value={formData.value}
          onChange={e => setFormData({ ...formData, value: parseFloat(e.target.value) })}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Quantidade</label>
        <input
          type="number"
          value={formData.quantity}
          onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className={styles.input}
          required
        />
      </div>

      <button type="submit" className={styles.button}>
        {initialData ? '✓ Atualizar' : '+ Adicionar'}
      </button>
    </form>
  );
}
