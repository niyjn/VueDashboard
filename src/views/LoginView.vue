<!-- Tela de login — auth shell com bento grid decorativo -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme.js'
import BentoGrid from '@/components/BentoGrid.vue'

const router = useRouter()
const { theme, toggle } = useTheme()

const email    = ref('')
const password = ref('')
const error    = ref('')
const loading  = ref(false)

async function handleLogin() {
  error.value = ''

  // Validação básica dos campos (v-if exibe o erro no template)
  if (!email.value.trim() || !password.value) {
    error.value = 'Preencha e-mail e senha para continuar.'
    return
  }
  if (!email.value.includes('@')) {
    error.value = 'Informe um e-mail válido.'
    return
  }

  loading.value = true
  // Simula latência de rede
  await new Promise(r => setTimeout(r, 700))
  loading.value = false

  // Aceita qualquer credencial (demo)
  localStorage.setItem('flowboard.auth', 'true')
  router.push('/overview')
}
</script>

<template>
  <div class="auth-shell" :data-theme="theme">

    <!-- Painel esquerdo: formulário -->
    <div class="auth-form-panel">
      <header>
        <span class="brand-monogram">flow<em>board</em></span>
        <h1>gestão de projetos</h1>
        <p>Organize equipes, acompanhe entregas e mantenha todos alinhados.</p>
      </header>

      <!-- v-if para exibir mensagem de erro -->
      <form class="auth-panel" @submit.prevent="handleLogin">
        <div v-if="error" class="auth-error">{{ error }}</div>

        <!-- v-model liga os inputs ao estado reativo -->
        <input
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          autocomplete="email"
          :disabled="loading"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Senha"
          autocomplete="current-password"
          :disabled="loading"
        />

        <button class="button" type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>

        <p style="font-size:12px;color:inherit;opacity:.6;margin:0;text-align:center">
          Use qualquer e-mail e senha para entrar na demo.
        </p>
      </form>

      <footer class="auth-form-footer">
        <button class="auth-theme" type="button" @click="toggle">
          {{ theme === 'dark' ? '☀ Modo Claro' : '☽ Modo Escuro' }}
        </button>
        <span>FlowBoard v1.0</span>
      </footer>
    </div>

    <!-- Painel direito: bento grid decorativo -->
    <div class="auth-bento">
      <div class="auth-bento-header">
        <span>Sistema</span>
        <span>v1.0.0</span>
      </div>
      <BentoGrid />
    </div>

  </div>
</template>

<style scoped>
/* Fix 1: h1 não estourar o painel em viewports médias.
   O clamp global usa 9vw que pode exceder a largura disponível do
   painel (≤480px) em viewports intermediárias. Reduzimos o coeficiente
   para 6vw e o mínimo para 44px — "projetos" cabe numa linha sem
   quebra forçada de palavra em nenhuma resolução comum. */
.auth-form-panel h1 {
  font-size: clamp(44px, 6vw, 104px);
}

/* Fix 2: O CSS global define width:100% no .auth-theme para uso
   standalone. Dentro do footer (flexbox space-between) isso engole
   todo o espaço e empurra o "FlowBoard v1.0".
   O seletor scoped tem especificidade maior (+data-v) então vence. */
.auth-form-footer .auth-theme {
  width: auto;
  min-width: 140px;
}

/* Fix 3: Esconde o bento grid em telas estreitas.
   Em mobile o grid já colapsava para 1 coluna mas o bento
   ficava empilhado abaixo do formulário com layout quebrado. */
@media (max-width: 900px) {
  .auth-bento {
    display: none;
  }
}
</style>
