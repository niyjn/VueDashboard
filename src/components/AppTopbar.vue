<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme.js'

const route = useRoute()
const router = useRouter()
const { theme, toggle } = useTheme()

const tabs = [
  { name: 'overview',      label: 'Visão Geral',    sub: 'Dashboard' },
  { name: 'projetos',      label: 'Projetos',        sub: 'Gestão' },
  { name: 'equipe',        label: 'Equipe',          sub: 'Colaboradores' },
  { name: 'configuracoes', label: 'Configurações',   sub: 'Conta' }
]

function logout() {
  localStorage.removeItem('flowboard.auth')
  router.push('/login')
}
</script>

<template>
  <header class="app-topbar">
    <!-- Brand + tabs de navegação -->
    <nav class="conversation-tabs" role="navigation" aria-label="Navegação principal">
      <div class="brand" style="margin-right:16px">
        <div class="brand-mark">FB</div>
        <div>
          <strong>FlowBoard</strong>
          <span>gestão de projetos</span>
        </div>
      </div>

      <!-- v-for para renderizar as abas; :class aplica .active dinamicamente -->
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: route.name === tab.name }"
        :aria-current="route.name === tab.name ? 'page' : undefined"
        @click="router.push({ name: tab.name })"
      >
        <span>
          <strong>{{ tab.label }}</strong>
          <small>{{ tab.sub }}</small>
        </span>
      </button>
    </nav>

    <!-- Ações: relógio + toggle de tema + logout -->
    <div class="topbar-actions">
      <span class="session-chip tabular">
        {{ new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) }}
      </span>

      <button class="icon-button" @click="toggle" :title="theme === 'dark' ? 'Modo claro' : 'Modo escuro'">
        <!-- Sol (dark mode ativo) -->
        <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
        <!-- Lua (light mode ativo) -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      </button>

      <button class="icon-button" @click="logout" title="Sair">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  </header>
</template>
