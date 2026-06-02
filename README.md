# FlowBoard — Gestão de Projetos

Dashboard de gerenciamento de projetos e equipes construído com **Vue.js 3 + Vite**, utilizando o design system **Neo Corporate Brutalism**.

## Tecnologias

- Vue 3 (Composition API + `<script setup>`)
- Vue Router 4 (hash history)
- Vite 5
- CSS puro (design tokens + componentes via variáveis CSS)
- Google Fonts: Inter (UI) + Sora (display)

---

## Como executar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:5173**

> Use qualquer e-mail e senha na tela de login (é uma demo com dados mockados).

---

## Funcionalidades

| Feature | Descrição | Diretivas Vue |
|---|---|---|
| **Login com validação** | Formulário valida campos antes de autenticar | `v-model`, `v-if` |
| **Busca em tempo real** | Filtra projetos por nome/cliente enquanto digita | `v-model` + `computed` |
| **Filtros de tabela** | Filtra por status e prioridade simultaneamente | `v-model` em `<select>` |
| **Modal de criação** | Cria novo projeto com validação de campos obrigatórios | `v-if`, `v-model`, `$emit` |
| **Toggle de tema** | Alterna dark/light mode (persiste no localStorage) | composable singleton |
| **Lista dinâmica** | Tabela de equipe filtrada com departamentos únicos extraídos dos dados | `v-for` + `computed` |

---

## Estrutura de pastas

```
src/
├── assets/styles/       # Design tokens, reset e componentes CSS
│   ├── tokens.css       # Variáveis CSS (paleta, superfícies, estados)
│   ├── base.css         # Reset + tipografia (Inter / Sora)
│   └── components.css   # Primitivos CSS (botões, pills, métricas, tabelas...)
├── composables/
│   └── useTheme.js      # Singleton reativo para dark/light mode
├── utils/
│   └── format.js        # Funções puras: statusTone, priorityLabel, formatDate
├── data/
│   └── mockData.js      # Dados mockados (projetos, equipe, tarefas)
├── components/
│   ├── ui/              # Primitivos reutilizáveis
│   │   ├── UiButton.vue
│   │   ├── UiPill.vue
│   │   ├── UiMetric.vue
│   │   └── UiAlert.vue
│   ├── AppShell.vue     # Shell autenticado (aplica data-theme + topbar)
│   ├── AppTopbar.vue    # Topbar sticky com abas de navegação
│   ├── BentoGrid.vue    # Grid decorativo da tela de login (relógio ao vivo)
│   └── TaskModal.vue    # Modal de criação de projeto
├── views/
│   ├── LoginView.vue    # Tela de autenticação (auth shell + bento)
│   ├── OverviewView.vue # Visão geral: métricas + atividades recentes
│   ├── ProjectsView.vue # Projetos: busca, filtros e tabela
│   ├── TeamView.vue     # Equipe: filtro por departamento e tabela
│   └── SettingsView.vue # Configurações de conta e tema
└── router/
    └── index.js         # Rotas + navigation guard de autenticação
```

---

## Design System

O visual segue o estilo **Neo Corporate Brutalism**:

- Cantos retos (`border-radius: 0` como padrão)
- Bordas colapsadas em grids (efeito "planilha")
- Paleta sage (#87bba2) + amarelo ácido (#fff07c) + rosa (#f3d8da)
- Duas fontes: **Inter** (corpo) + **Sora** (display/números)
- Dark mode via `data-theme` no elemento raiz — os tokens reagem automaticamente

---

## Requisitos atendidos

- [x] Vue.js via CLI (Vite)
- [x] Componentes reutilizáveis (`UiButton`, `UiPill`, `UiMetric`, etc.)
- [x] `v-if` — erros de validação, modal, alerta de sucesso, estado vazio
- [x] `v-for` — tabelas de projetos/equipe/tarefas, abas do topbar, opções de filtro
- [x] `v-model` — todos os inputs de formulário e filtros
- [x] Interface responsiva (breakpoints em 1180px e 900px)
- [x] Navegação entre páginas via Vue Router
- [x] Código organizado em componentes e pastas
