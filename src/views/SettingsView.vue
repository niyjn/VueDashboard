<!-- Configurações: formulário com v-model + validação + toggle de tema -->
<script setup>
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme.js'
import UiButton from '@/components/ui/UiButton.vue'
import UiAlert  from '@/components/ui/UiAlert.vue'

const { theme, toggle } = useTheme()

// Estado do formulário (v-model no template)
const name          = ref('João Silva')
const email         = ref('joao@flowboard.com')
const notifications = ref(true)
const language      = ref('pt-BR')

const saved  = ref(false)
const errors = ref({})

function validate() {
  errors.value = {}
  if (!name.value.trim()) errors.value.name = 'Nome é obrigatório.'
  if (!email.value.includes('@')) errors.value.email = 'E-mail inválido.'
  return Object.keys(errors.value).length === 0
}

function handleSave() {
  if (!validate()) return
  saved.value = true
  // Remove o alerta após 3 segundos
  setTimeout(() => { saved.value = false }, 3000)
}
</script>

<template>
  <div>
    <div class="workspace-header">
      <h1>Configurações</h1>
      <p>Gerencie seu perfil e preferências da conta.</p>
    </div>

    <!-- v-if exibe alerta de sucesso após salvar -->
    <UiAlert v-if="saved" type="warning">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Configurações salvas com sucesso!</span>
    </UiAlert>

    <div class="records-section">
      <div class="section-toolbar">
        <div>
          <h3>Perfil</h3>
          <p>Informações pessoais e preferências</p>
        </div>
      </div>

      <!-- Formulário com v-model em cada campo -->
      <form @submit.prevent="handleSave" class="settings-form">

        <div class="settings-field">
          <label class="settings-label">Nome completo</label>
          <input v-model="name" type="text" class="settings-input" />
          <span v-if="errors.name" class="settings-error">{{ errors.name }}</span>
        </div>

        <div class="settings-field">
          <label class="settings-label">E-mail</label>
          <input v-model="email" type="email" class="settings-input" />
          <span v-if="errors.email" class="settings-error">{{ errors.email }}</span>
        </div>

        <div class="settings-field">
          <label class="settings-label">Idioma</label>
          <select v-model="language" class="settings-input">
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English (US)</option>
            <option value="es-ES">Español</option>
          </select>
        </div>

        <!-- Toggle de notificações (v-model em checkbox) -->
        <div class="settings-toggle">
          <div>
            <strong>Notificações por e-mail</strong>
            <p>Receba atualizações de projetos e tarefas atribuídas a você.</p>
          </div>
          <label class="toggle-label">
            <input v-model="notifications" type="checkbox" class="toggle-input" />
            <span class="toggle-status">{{ notifications ? 'Ativado' : 'Desativado' }}</span>
          </label>
        </div>

        <!-- Toggle de tema visual -->
        <div class="settings-toggle">
          <div>
            <strong>Tema visual</strong>
            <p>Modo atual: <strong>{{ theme === 'dark' ? 'Escuro' : 'Claro' }}</strong></p>
          </div>
          <UiButton variant="secondary" type="button" @click="toggle">
            {{ theme === 'dark' ? '☀ Modo Claro' : '☽ Modo Escuro' }}
          </UiButton>
        </div>

        <div style="padding-top:8px">
          <UiButton type="submit">Salvar Configurações</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.settings-form {
  display: grid;
  gap: 16px;
  max-width: 520px;
  padding: 4px 0 8px;
}

.settings-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.settings-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 600;
}

.settings-input {
  min-height: 42px;
  border: 1px solid var(--border);
  background: var(--field);
  color: var(--text);
  padding: 0 12px;
  border-radius: 0;
  font: inherit;
  font-size: 14px;
  outline: none;
}

.settings-input:focus {
  outline: 2px solid var(--text);
  outline-offset: -2px;
}

.settings-error {
  color: var(--danger-text);
  font-size: 12px;
}

.settings-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--border);
  background: var(--surface-muted);
}

.settings-toggle p {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--muted);
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
}

.toggle-input {
  width: 18px;
  height: 18px;
  accent-color: var(--text);
  cursor: pointer;
}

.toggle-status {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
  color: var(--muted);
}
</style>
