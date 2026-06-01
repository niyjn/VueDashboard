<!-- Shell autenticado: aplica data-theme no root + renderiza topbar + conteúdo da rota filha -->
<script setup>
import { RouterView } from 'vue-router'
import AppTopbar from '@/components/AppTopbar.vue'
import { useTheme } from '@/composables/useTheme.js'

const { theme } = useTheme()
</script>

<template>
  <div class="app-shell" :data-theme="theme">
    <AppTopbar />
    <main class="conversation-frame">
      <RouterView />
    </main>
  </div>
</template>
