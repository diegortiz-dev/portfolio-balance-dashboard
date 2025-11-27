'use client';

import { Asset } from '@/types';
import styles from './AssetTable.module.css';
import { Edit2, Trash2 } from 'lucide-react';

interface AssetTableProps {
  assets: Asset[];
  onDelete: (id: string) => void;
  onEdit: (asset: Asset) => void;
}

export default function AssetTable({ assets, onDelete, onEdit }: AssetTableProps) {
  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Meus Ativos</h3>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Nome</th>
            <th className={styles.th}>Classe</th>
            <th className={styles.th} style={{textAlign: 'right'}}>Valor</th>
            <th className={styles.th} style={{textAlign: 'right'}}>Quantidade</th>
            <th className={styles.th} style={{textAlign: 'center'}}>Ações</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td className={styles.td}>{asset.name}</td>
              <td className={styles.td}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: '#3B82F6',
                  color: 'white'
                }}>
                  {asset.class}
                </span>
              </td>
              <td className={styles.td} style={{textAlign: 'right'}}>R$ {asset.value.toFixed(2)}</td>
              <td className={styles.td} style={{textAlign: 'right'}}>{asset.quantity}</td>
              <td className={styles.td} style={{textAlign: 'center'}}>
                <div className={styles.actions}>
                  <button onClick={() => onEdit(asset)} className={styles.editButton}>
                    <Edit2 size={14} style={{marginRight: '4px', display: 'inline'}} />
                    Editar
                  </button>
                  <button onClick={() => onDelete(asset.id)} className={styles.deleteButton}>
                    <Trash2 size={14} style={{marginRight: '4px', display: 'inline'}} />
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
