<!-- Modal de criação de projeto com validação de campos (v-model + v-if para erros) -->
<script setup>
import { ref } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'

const emit = defineEmits(['close', 'save'])

const name        = ref('')
const client      = ref('')
const status      = ref('active')
const priority    = ref('medium')
const deadline    = ref('')
const description = ref('')
const errors      = ref({})

function validate() {
  errors.value = {}
  if (!name.value.trim())   errors.value.name = 'Nome é obrigatório.'
  if (!client.value.trim()) errors.value.client = 'Cliente é obrigatório.'
  if (!deadline.value)      errors.value.deadline = 'Prazo é obrigatório.'
  return Object.keys(errors.value).length === 0
}

function handleSave() {
  if (!validate()) return
  emit('save', {
    name: name.value,
    client: client.value,
    status: status.value,
    priority: priority.value,
    deadline: deadline.value,
    description: description.value
  })
}
</script>

<template>
  <!-- Backdrop — clique fora fecha o modal -->
  <div
    class="modal-backdrop"
    @click.self="emit('close')"
  >
    <div class="modal-box">
      <!-- Cabeçalho -->
      <div class="modal-header">
        <h2>Novo Projeto</h2>
        <button class="icon-button" @click="emit('close')" aria-label="Fechar modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <!-- Formulário com v-model em todos os campos -->
      <form @submit.prevent="handleSave" class="modal-form">

        <div class="field-group">
          <label class="field-label">Nome do Projeto *</label>
          <input v-model="name" type="text" placeholder="Ex: Redesign do Site" class="field-input" />
          <!-- v-if para mostrar erro apenas quando existir -->
          <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
        </div>

        <div class="field-group">
          <label class="field-label">Cliente *</label>
          <input v-model="client" type="text" placeholder="Ex: Acme Corp" class="field-input" />
          <span v-if="errors.client" class="field-error">{{ errors.client }}</span>
        </div>

        <div class="modal-row">
          <div class="field-group">
            <label class="field-label">Status</label>
            <select v-model="status" class="field-input">
              <option value="active">Ativo</option>
              <option value="paused">Pausado</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Prioridade</label>
            <select v-model="priority" class="field-input">
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">Prazo *</label>
          <input v-model="deadline" type="date" class="field-input" />
          <span v-if="errors.deadline" class="field-error">{{ errors.deadline }}</span>
        </div>

        <div class="field-group">
          <label class="field-label">Descrição</label>
          <textarea v-model="description" placeholder="Descreva o objetivo do projeto..." class="field-input field-textarea"></textarea>
        </div>

        <div class="modal-actions">
          <UiButton variant="secondary" type="button" @click="emit('close')">Cancelar</UiButton>
          <UiButton type="submit">Salvar Projeto</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-box {
  background: var(--surface);
  border: 1px solid var(--border);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 28px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
}

.modal-form {
  display: grid;
  gap: 16px;
}

.modal-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 600;
}

.field-input {
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

.field-input:focus {
  outline: 2px solid var(--text);
  outline-offset: -2px;
}

.field-textarea {
  min-height: 80px;
  padding: 10px 12px;
  resize: vertical;
}

.field-error {
  color: var(--danger-text);
  font-size: 12px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding-top: 4px;
}
</style>
