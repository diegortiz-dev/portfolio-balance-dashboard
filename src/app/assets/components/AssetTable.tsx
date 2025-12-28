'use client';

import { Asset } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, TrendingUp, PackageOpen } from 'lucide-react';
import styles from './AssetTable.module.css';

interface AssetTableProps {
  assets: Asset[];
  onDelete: (id: string) => void;
  onEdit: (asset: Asset) => void;
}

const classColors: Record<string, string> = {
  'FII': '#22c55e',
  'Ação': '#3b82f6',
  'Renda Fixa': '#f59e0b',
  'Cripto': '#a855f7',
};

export default function AssetTable({ assets, onDelete, onEdit }: AssetTableProps) {
  if (assets.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <PackageOpen size={48} />
        </div>
        <h3 className={styles.emptyTitle}>Nenhum ativo cadastrado</h3>
        <p className={styles.emptyText}>
          Adicione seu primeiro ativo usando o formulário ao lado
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>
          <TrendingUp size={20} />
          Meus Ativos
        </h3>
        <span className={styles.assetCount}>{assets.length} ativos</span>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>Classe</th>
              <th className={`${styles.th} ${styles.alignRight}`}>Valor</th>
              <th className={`${styles.th} ${styles.alignRight}`}>Qtd.</th>
              <th className={`${styles.th} ${styles.alignCenter}`}>Ações</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <AnimatePresence>
              {assets.map((asset, index) => (
                <motion.tr
                  key={asset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={styles.row}
                >
                  <td className={styles.td}>
                    <span className={styles.assetName}>{asset.name}</span>
                  </td>
                  <td className={styles.td}>
                    <span 
                      className={styles.classBadge}
                      style={{ 
                        backgroundColor: `${classColors[asset.class] || '#6366f1'}20`,
                        color: classColors[asset.class] || '#6366f1',
                        borderColor: `${classColors[asset.class] || '#6366f1'}40`
                      }}
                    >
                      {asset.class}
                    </span>
                  </td>
                  <td className={`${styles.td} ${styles.alignRight}`}>
                    <span className={styles.value}>
                      R$ {asset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className={`${styles.td} ${styles.alignRight}`}>
                    <span className={styles.quantity}>
                      {asset.quantity.toLocaleString('pt-BR', { maximumFractionDigits: 8 })}
                    </span>
                  </td>
                  <td className={`${styles.td} ${styles.alignCenter}`}>
                    <div className={styles.actions}>
                      <button 
                        onClick={() => onEdit(asset)} 
                        className={styles.editButton}
                        title="Editar ativo"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(asset.id)} 
                        className={styles.deleteButton}
                        title="Excluir ativo"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
