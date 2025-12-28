'use client';

import { useState, useEffect } from 'react';
import { Asset } from '@/types';
import { ASSET_CLASSES } from '@/constants';
import { Plus, Edit3, DollarSign, Hash, Tag, Folder } from 'lucide-react';
import styles from './AssetForm.module.css';

interface AssetFormProps {
  onSubmit: (asset: Omit<Asset, 'id'>) => void;
  initialData?: Asset | null;
}

interface FormErrors {
  name?: string;
  value?: string;
  quantity?: string;
}

export default function AssetForm({ onSubmit, initialData }: AssetFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    class: ASSET_CLASSES[0],
    value: '',
    quantity: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        class: initialData.class,
        value: initialData.value.toString(),
        quantity: initialData.quantity.toString(),
      });
      setErrors({});
      setTouched({});
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }
    
    const value = parseFloat(formData.value);
    if (!formData.value || isNaN(value)) {
      newErrors.value = 'Valor é obrigatório';
    } else if (value <= 0) {
      newErrors.value = 'Valor deve ser maior que zero';
    }
    
    const quantity = parseFloat(formData.quantity);
    if (!formData.quantity || isNaN(quantity)) {
      newErrors.quantity = 'Quantidade é obrigatória';
    } else if (quantity <= 0) {
      newErrors.quantity = 'Quantidade deve ser maior que zero';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      setTouched({ name: true, value: true, quantity: true });
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      class: formData.class,
      value: parseFloat(formData.value),
      quantity: parseFloat(formData.quantity),
    });
    
    if (!initialData) {
      setFormData({ name: '', class: ASSET_CLASSES[0], value: '', quantity: '' });
      setTouched({});
    }
  };

  const isEditing = !!initialData;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formHeader}>
        {isEditing ? <Edit3 size={20} /> : <Plus size={20} />}
        <h3 className={styles.formTitle}>{isEditing ? 'Editar Ativo' : 'Novo Ativo'}</h3>
      </div>
      
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          <Tag size={14} />
          Nome do Ativo
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          onBlur={() => handleBlur('name')}
          className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
          placeholder="Ex: PETR4, Bitcoin, Tesouro IPCA+"
        />
        {touched.name && errors.name && (
          <span className={styles.errorMessage}>{errors.name}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          <Folder size={14} />
          Classe
        </label>
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

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <DollarSign size={14} />
            Valor Total (R$)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.value}
            onChange={e => setFormData({ ...formData, value: e.target.value })}
            onBlur={() => handleBlur('value')}
            className={`${styles.input} ${touched.value && errors.value ? styles.inputError : ''}`}
            placeholder="0,00"
          />
          {touched.value && errors.value && (
            <span className={styles.errorMessage}>{errors.value}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Hash size={14} />
            Quantidade
          </label>
          <input
            type="number"
            step="0.00000001"
            min="0"
            value={formData.quantity}
            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
            onBlur={() => handleBlur('quantity')}
            className={`${styles.input} ${touched.quantity && errors.quantity ? styles.inputError : ''}`}
            placeholder="0"
          />
          {touched.quantity && errors.quantity && (
            <span className={styles.errorMessage}>{errors.quantity}</span>
          )}
        </div>
      </div>

      <button type="submit" className={`${styles.button} ${isEditing ? styles.buttonEdit : ''}`}>
        {isEditing ? (
          <>
            <Edit3 size={18} />
            Atualizar Ativo
          </>
        ) : (
          <>
            <Plus size={18} />
            Adicionar Ativo
          </>
        )}
      </button>
    </form>
  );
}
