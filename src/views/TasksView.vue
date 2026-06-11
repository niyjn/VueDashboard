<!-- Tarefas: busca + filtro por status + lista reativa com opção de concluir -->
<script setup>
import { ref, computed } from 'vue'
import UiPill from '@/components/ui/UiPill.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiMetric from '@/components/ui/UiMetric.vue'
import { recentTasks as initialTasks } from '@/data/mockData.js'
import { statusTone, statusLabel, formatDate } from '@/utils/format.js'
import { useTuxVault } from '@/composables/useTuxVault.js'

const { uploading, exportar } = useTuxVault()

// Lista reativa de tarefas — cópia dos dados mock para permitir alterações
const tasks = ref(initialTasks.map(t => ({ ...t })))

// Estado dos filtros
const search       = ref('')
const statusFilter = ref('')

// Filtragem reativa: recalcula a cada mudança nos filtros
const filtered = computed(() =>
  tasks.value.filter(t => {
    const q           = search.value.toLowerCase()
    const matchSearch = !q || t.title.toLowerCase().includes(q) || t.project.toLowerCase().includes(q)
    const matchStatus = !statusFilter.value || t.status === statusFilter.value
    return matchSearch && matchStatus
  })
)

// Métricas calculadas a partir da lista reativa
const totalTasks     = computed(() => tasks.value.length)
const activeTasks    = computed(() => tasks.value.filter(t => t.status === 'active').length)
const completedTasks = computed(() => tasks.value.filter(t => t.status === 'completed').length)
const pausedTasks    = computed(() => tasks.value.filter(t => t.status === 'paused').length)

// Marca uma tarefa como concluída
function completeTask(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.status = 'completed'
}
</script>

<template>
  <div>
    <div class="workspace-header">
      <h1>Tarefas</h1>
      <p>{{ totalTasks }} tarefas — {{ filtered.length }} exibidas</p>
    </div>

    <!-- Métricas -->
    <div class="metrics-grid">
      <UiMetric label="Total"      :value="totalTasks"     />
      <UiMetric label="Ativas"     :value="activeTasks"    tone="green" />
      <UiMetric label="Concluídas" :value="completedTasks" tone="blue"  />
      <UiMetric label="Pausadas"   :value="pausedTasks"    tone="amber" />
    </div>

    <div class="records-section">
      <div class="section-toolbar">
        <div>
          <h3>Todas as Tarefas</h3>
          <p>Filtre por status ou busque pelo nome</p>
        </div>
        <UiButton variant="secondary" :disabled="uploading" @click="exportar('tarefas.json', tasks)">
          {{ uploading ? 'Exportando...' : 'Exportar' }}
        </UiButton>
      </div>

      <!-- Filtros -->
      <div class="view-filters">
        <div class="filter-control">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="search" type="text" placeholder="Buscar tarefa ou projeto..." />
        </div>

        <div class="filter-control">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          <select v-model="statusFilter">
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="completed">Concluído</option>
            <option value="paused">Pausado</option>
          </select>
        </div>
      </div>

      <!-- Tabela de tarefas -->
      <div class="table-shell">
        <table v-if="filtered.length > 0">
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Projeto</th>
              <th>Responsável</th>
              <th>Status</th>
              <th>Prazo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <!-- v-for itera as tarefas filtradas -->
            <tr v-for="task in filtered" :key="task.id">
              <td>
                <strong>{{ task.title }}</strong>
              </td>
              <td>{{ task.project }}</td>
              <td>
                <div class="brand-mark" style="width:28px;height:28px;font-size:11px">
                  {{ task.assignee }}
                </div>
              </td>
              <td>
                <UiPill :tone="statusTone(task.status)">{{ statusLabel(task.status) }}</UiPill>
              </td>
              <td>{{ formatDate(task.due) }}</td>
              <td>
                <!-- Botão só aparece se a tarefa não estiver concluída -->
                <UiButton
                  v-if="task.status !== 'completed'"
                  variant="secondary"
                  @click="completeTask(task.id)"
                >
                  Concluir
                </UiButton>
                <span v-else style="font-size:12px;color:var(--muted)">—</span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Estado vazio -->
        <div v-else class="blank-slate" style="min-height:200px">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:.4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <strong>Nenhuma tarefa encontrada</strong>
          <span>Ajuste os filtros ou a busca para ver resultados.</span>
        </div>
      </div>
    </div>
  </div>
</template>