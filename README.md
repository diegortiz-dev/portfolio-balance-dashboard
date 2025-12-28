# 📊 Portfolio Balance Dashboard

Dashboard moderno e intuitivo para gerenciamento de portfólio de investimentos com rebalanceamento automático. Desenvolvido com as tecnologias mais recentes do ecossistema React/Next.js.

![Next.js](https://img.shields.io/badge/Next.js-16.0.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss)

## ✨ Features

- 📈 **Dashboard Interativo** - Visualização em tempo real de ativos e alocações com cards estatísticos
- 💼 **Gestão de Ativos** - CRUD completo para gerenciar investimentos (FII, Ações, Renda Fixa, Cripto)
- ⚖️ **Rebalanceamento Inteligente** - Cálculo automático de alocação ideal vs atual com sugestões de compra/venda
- 📊 **Gráficos Dinâmicos** - Visualizações interativas com Recharts (Pizza e Barras comparativas)
- 🎨 **Design Moderno** - Interface dark theme com glassmorphism, partículas e animações suaves
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- 💾 **Persistência Local** - Dados salvos automaticamente no localStorage via Zustand
- 🔔 **Sistema de Notificações** - Toast notifications para feedback de ações
- ⚡ **React Compiler** - Otimização automática com o novo React Compiler

## 🛠️ Tech Stack

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| **Framework** | Next.js (App Router) | 16.0.4 |
| **UI Library** | React | 19.2.0 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS + CSS Modules | 4.x |
| **Charts** | Recharts | 3.5.0 |
| **Animations** | Framer Motion | 12.x |
| **Icons** | Lucide React | 0.555.0 |
| **State Management** | Zustand (persist middleware) | 5.0.8 |
| **UI Components** | Radix UI | 2.x |

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── allocation/          # Página de alocação ideal
│   │   └── Allocation.module.css
│   ├── assets/              # Página de gestão de ativos
│   │   └── components/      # AssetForm, AssetTable
│   ├── dashboard/           # Dashboard principal
│   │   └── components/      # Charts, StatsCard, RebalanceSummary
│   ├── rebalance/           # Página de rebalanceamento
│   ├── api/                 # API Routes (assets, allocation)
│   ├── components/          # Sidebar
│   ├── layout.tsx           # Layout global com Sidebar
│   └── globals.css          # Estilos globais e variáveis
├── components/              # Componentes reutilizáveis
│   ├── ui/                  # Button, Card, Input, Table, Dropdown
│   ├── ConfirmDialog/       # Modal de confirmação
│   ├── EmptyState/          # Estado vazio
│   ├── LoadingSpinner/      # Indicador de carregamento
│   ├── Toast/               # Sistema de notificações
│   ├── HolographicCard.tsx  # Card com efeito holográfico
│   ├── ParticleBackground.tsx # Fundo com partículas animadas
│   └── ScrollIndicator.tsx  # Indicador de scroll
├── constants/               # Classes de ativos e cores
├── lib/
│   ├── utils.ts             # Utilitários (cn, formatters)
│   └── calculations/        # Lógica de rebalanceamento
├── store/
│   └── usePortfolioStore.ts # Estado global com Zustand
└── types/                   # Definições TypeScript (Asset, Allocation)
```

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18.17+ (recomendado 20+)
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portfolio-balance-dashboard.git

# Entre no diretório
cd portfolio-balance-dashboard

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📊 Como Usar

### 1. Dashboard
Visualize o resumo completo do seu portfólio com:
- Cards de estatísticas (valor total, número de ativos, maior/menor posição)
- Gráfico de pizza com distribuição por classe
- Gráfico de barras comparando alocação atual vs ideal

### 2. Ativos
Gerencie seus investimentos:
- Adicione novos ativos com nome, classe, valor e quantidade
- Edite ativos existentes
- Remova ativos com confirmação via modal
- Visualize em tabela ordenada

### 3. Alocação Ideal
Configure suas metas de alocação:
- Defina porcentagens para cada classe de ativos
- Adicione novas classes personalizadas
- Remova classes não utilizadas
- Validação automática (soma deve ser 100%)

### 4. Rebalanceamento
Veja automaticamente as ações necessárias:
- Compare alocação atual vs ideal
- Receba sugestões de **compra** (verde), **venda** (vermelho) ou **manter** (amarelo)
- Visualize valores exatos a investir/desinvestir

## 🎨 Design System

### Cores

| Elemento | Cor | Hex |
|----------|-----|-----|
| Background | Dark Navy | `#0f1419` |
| Cards | Glass | `rgba(30, 41, 59, 0.4)` |
| Primary | Indigo | `#6366f1` |
| Success | Emerald | `#34d399` |
| Warning | Amber | `#fbbf24` |
| Danger | Red | `#f87171` |
| Text Primary | White | `#FFFFFF` |
| Text Secondary | Slate | `#94a3b8` |

### Classes de Ativos Suportadas

- 🏢 **FII** - Fundos Imobiliários
- 📈 **Ação** - Ações brasileiras
- 💰 **Renda Fixa** - Tesouro, CDB, LCI/LCA
- ₿ **Cripto** - Criptomoedas

### Componentes UI

- ✨ Glassmorphism com `backdrop-blur`
- 🌊 Partículas animadas no background
- 💫 Animações suaves com Framer Motion
- 🎭 Hover states e transições elegantes
- 📱 Design responsivo mobile-first

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento (Turbopack)
npm run build    # Gera build de produção otimizado
npm run start    # Inicia servidor de produção
npm run lint     # Executa ESLint para verificação de código
```

## 📦 Principais Dependências

```json
{
  "next": "16.0.4",
  "react": "19.2.0",
  "zustand": "5.0.8",
  "recharts": "3.5.0",
  "framer-motion": "12.23.24",
  "tailwindcss": "4.x",
  "@radix-ui/react-dropdown-menu": "2.x"
}
```

## 🔮 Roadmap

- [ ] Integração com APIs de cotação em tempo real
- [ ] Importação/exportação de dados (CSV, JSON)
- [ ] Múltiplos portfólios
- [ ] Histórico de rebalanceamentos
- [ ] Autenticação de usuários
- [ ] PWA com suporte offline
- [ ] Testes automatizados (Vitest + Testing Library)

## 📦 Dependências Principais

```json
{
  "next": "16.0.4",
  "react": "19.2.0",
  "recharts": "^3.5.0",
  "framer-motion": "latest",
  "lucide-react": "^0.555.0",
  "zustand": "^5.0.8"
}
```
