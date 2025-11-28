# 📊 Portfolio Balance Dashboard

Dashboard moderno e simples de utilizar para gerenciamento de portfólio de investimentos com rebalanceamento automático.

## ✨ Features

- 📈 **Dashboard Interativo** - Visualização em tempo real de ativos e alocações
- 💼 **Gestão de Ativos** - CRUD completo para gerenciar investimentos
- ⚖️ **Rebalanceamento** - Cálculo automático de alocação ideal vs atual
- 📊 **Gráficos Dinâmicos** - Visualizações com Recharts (Pizza e Barras)
- 🎨 **Design Moderno** - Interface dark com glassmorphism e animações suaves
- 📱 **Responsivo** - Funciona perfeitamente em desktop e mobile

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Modules
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State:** React Hooks + Zustand

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── allocation/          # Página de alocação ideal
│   ├── assets/              # Página de gestão de ativos
│   │   └── components/      # Componentes específicos
│   ├── dashboard/           # Dashboard principal
│   │   └── components/      # Gráficos e cards
│   ├── api/                 # API Routes
│   └── layout.tsx           # Layout global
├── components/              # Componentes reutilizáveis
├── constants/               # Constantes da aplicação
├── lib/                     # Utilitários e cálculos
└── types/                   # Definições TypeScript
```

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone <repository-url>

# Entre no diretório
cd portfolio-balance-dashboard

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📊 Como Usar

1. **Dashboard** - Visualize o resumo do seu portfólio
2. **Ativos** - Adicione, edite ou remova seus investimentos
3. **Alocação Ideal** - Configure as porcentagens desejadas por classe
4. **Rebalanceamento** - Veja automaticamente quanto investir em cada classe

## 🎨 Design System

### Cores

- **Background:** `#0f1419`
- **Cards:** `rgba(30, 41, 59, 0.4)` com blur
- **Accent:** `#6366f1` (Indigo)
- **Success:** `#34d399` (Green)
- **Danger:** `#f87171` (Red)
- **Text:** `#FFFFFF` / `#94a3b8`

### Componentes

- Glassmorphism com backdrop-blur
- Bordas sutis e sombras suaves
- Animações com Framer Motion
- Hover states elegantes

## 🔧 Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linting
```

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
