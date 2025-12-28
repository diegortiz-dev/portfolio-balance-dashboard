'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Asset, Allocation } from '@/types';
import { ASSET_CLASSES } from '@/constants';

interface PortfolioState {
  assets: Asset[];
  allocation: Allocation;
  isLoading: boolean;
  error: string | null;
  
  // Asset actions
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAsset: (id: string, asset: Omit<Asset, 'id'>) => void;
  deleteAsset: (id: string) => void;
  
  // Allocation actions
  setAllocation: (allocation: Allocation) => void;
  updateAllocationClass: (className: string, value: number) => void;
  addAllocationClass: (className: string) => void;
  removeAllocationClass: (className: string) => void;
  
  // Loading/Error states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed values
  getTotalValue: () => number;
  getCurrentAllocation: () => Record<string, number>;
  getRebalanceData: () => Array<{
    class: string;
    current: number;
    currentPercent: number;
    ideal: number;
    idealPercent: number;
    difference: number;
    action: 'buy' | 'sell' | 'hold';
  }>;
}

const defaultAllocation: Allocation = ASSET_CLASSES.reduce((acc, cls) => {
  acc[cls] = 25;
  return acc;
}, {} as Allocation);

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      assets: [
        { id: '1', name: 'MXRF11', class: 'FII', value: 1500, quantity: 150 },
        { id: '2', name: 'PETR4', class: 'Ação', value: 3000, quantity: 100 },
        { id: '3', name: 'XPLG11', class: 'FII', value: 2200, quantity: 200 },
        { id: '4', name: 'VALE3', class: 'Ação', value: 2800, quantity: 50 },
        { id: '5', name: 'Tesouro IPCA+', class: 'Renda Fixa', value: 5000, quantity: 1 },
        { id: '6', name: 'Bitcoin', class: 'Cripto', value: 1500, quantity: 0.015 },
      ],
      allocation: defaultAllocation,
      isLoading: false,
      error: null,

      addAsset: (asset) => {
        const newAsset: Asset = {
          ...asset,
          id: Date.now().toString(),
        };
        set((state) => ({
          assets: [...state.assets, newAsset],
        }));
      },

      updateAsset: (id, asset) => {
        set((state) => ({
          assets: state.assets.map((a) =>
            a.id === id ? { ...asset, id } : a
          ),
        }));
      },

      deleteAsset: (id) => {
        set((state) => ({
          assets: state.assets.filter((a) => a.id !== id),
        }));
      },

      setAllocation: (allocation) => {
        set({ allocation });
      },

      updateAllocationClass: (className, value) => {
        set((state) => ({
          allocation: {
            ...state.allocation,
            [className]: value,
          },
        }));
      },

      addAllocationClass: (className) => {
        set((state) => ({
          allocation: {
            ...state.allocation,
            [className]: 0,
          },
        }));
      },

      removeAllocationClass: (className) => {
        set((state) => {
          const newAllocation = { ...state.allocation };
          delete newAllocation[className];
          return { allocation: newAllocation };
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      getTotalValue: () => {
        return get().assets.reduce((acc, asset) => acc + asset.value, 0);
      },

      getCurrentAllocation: () => {
        const { assets } = get();
        const total = assets.reduce((acc, asset) => acc + asset.value, 0);
        const current: Record<string, number> = {};

        assets.forEach((asset) => {
          current[asset.class] = (current[asset.class] || 0) + asset.value;
        });

        return current;
      },

      getRebalanceData: () => {
        const { assets, allocation } = get();
        const total = assets.reduce((acc, asset) => acc + asset.value, 0);
        
        if (total === 0) return [];

        const current: Record<string, number> = {};
        assets.forEach((asset) => {
          current[asset.class] = (current[asset.class] || 0) + asset.value;
        });

        return Object.entries(allocation).map(([className, idealPercent]) => {
          const currentValue = current[className] || 0;
          const currentPercent = total > 0 ? (currentValue / total) * 100 : 0;
          const idealValue = (idealPercent / 100) * total;
          const difference = idealValue - currentValue;

          let action: 'buy' | 'sell' | 'hold' = 'hold';
          if (difference > 50) action = 'buy';
          else if (difference < -50) action = 'sell';

          return {
            class: className,
            current: currentValue,
            currentPercent,
            ideal: idealValue,
            idealPercent,
            difference,
            action,
          };
        });
      },
    }),
    {
      name: 'portfolio-storage',
    }
  )
);
