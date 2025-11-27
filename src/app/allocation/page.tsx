'use client';

import { useEffect, useState } from 'react';
import { Allocation } from '@/types';
import { API_ROUTES } from '@/constants';
import { Target, TrendingUp } from 'lucide-react';
import styles from './Allocation.module.css';

export default function AllocationPage() {
  const [allocation, setAllocation] = useState<Allocation>({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllocation = async () => {
      const response = await fetch(API_ROUTES.ALLOCATION);
      const data = await response.json();
      setAllocation(data);
    };
    fetchAllocation();
  }, []);

  const handleChange = (key: string, value: string) => {
    setAllocation({ ...allocation, [key]: parseFloat(value) || 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const total = Object.values(allocation).reduce((acc: number, v: any) => acc + v, 0);
    
    if (Math.abs(total - 100) > 0.01) {
      setError(`Total deve ser 100%. Atual: ${total.toFixed(2)}%`);
      return;
    }

    setError('');
    await fetch(API_ROUTES.ALLOCATION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allocation),
    });
    alert('Alocação salva com sucesso!');
  };

  const total = Object.values(allocation).reduce((acc: number, v: any) => acc + v, 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Alocação Ideal</h1>
        <p className={styles.subtitle}>Configure as porcentagens ideais para cada classe de ativo</p>
      </div>

      <div style={{maxWidth: '600px'}}>
        <form onSubmit={handleSubmit} className={styles.card}>
          {Object.entries(allocation).map(([key, value], index) => (
            <div key={key} className={styles.allocationItem} style={{animationDelay: `${0.1 + index * 0.05}s`}}>
              <Target size={20} style={{color: '#3B82F6', flexShrink: 0}} />
              <label style={{flex: 1, fontWeight: '600', color: '#CFCFCF'}}>{key}</label>
              <input
                type="number"
                step="0.01"
                value={value as number}
                onChange={e => handleChange(key, e.target.value)}
                style={{
                  width: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textAlign: 'right',
                  transition: 'all 0.3s ease',
                  background: 'rgba(22, 22, 22, 0.5)',
                  color: '#FFFFFF'
                }}
              />
              <span style={{color: '#9A9A9A', fontWeight: '600', width: '20px'}}>%</span>
            </div>
          ))}

          <div style={{
            paddingTop: '1.5rem',
            marginTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <TrendingUp size={20} style={{color: total === 100 ? '#22C55E' : '#EF4444'}} />
            <p style={{fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF'}}>
              Total: <span style={{color: total === 100 ? '#22C55E' : '#EF4444'}}>{total.toFixed(2)}%</span>
            </p>
          </div>

          {error && (
            <p style={{
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: '600',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginTop: '1rem'
            }}>{error}</p>
          )}

          <button type="submit" style={{
            width: '100%',
            padding: '1rem',
            background: '#22C55E',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginTop: '1.5rem'
          }}>
            ✓ Salvar Alocação
          </button>
        </form>
      </div>
    </div>
  );
}
