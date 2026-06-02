<!-- Projetos: busca + filtros reativos (v-model) + tabela (v-for) + modal de criação (v-if) -->
<script setup>
import { ref, computed } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiPill   from '@/components/ui/UiPill.vue'
import TaskModal from '@/components/TaskModal.vue'
import { projects as initialProjects } from '@/data/mockData.js'
import { statusTone, statusLabel, priorityTone, priorityLabel, formatDate } from '@/utils/format.js'

// Lista reativa — permite adicionar novos projetos
const projects = ref([...initialProjects])

// Estado dos filtros (todos com v-model no template)
const search         = ref('')
const statusFilter   = ref('')
const priorityFilter = ref('')
const showModal      = ref(false)

// Filtragem reativa: recalcula a cada mudança nos filtros
const filtered = computed(() =>
  projects.value.filter(p => {
    const q = search.value.toLowerCase()
    const matchSearch   = !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)
    const matchStatus   = !statusFilter.value   || p.status   === statusFilter.value
    const matchPriority = !priorityFilter.value || p.priority === priorityFilter.value
    return matchSearch && matchStatus && matchPriority
  })
)

function addProject(data) {
  projects.value.push({ id: Date.now(), ...data, progress: 0, tasks: 0, completedTasks: 0, team: [] })
  showModal.value = false
}
</script>

<template>
  <div>
    <div class="workspace-header">
      <h1>Projetos</h1>
      <p>{{ projects.length }} projetos — {{ filtered.length }} exibidos</p>
    </div>

    <div class="records-section">
      <!-- Barra superior: título + botão -->
      <div class="section-toolbar">
        <div>
          <h3>Todos os Projetos</h3>
          <p>Filtre por status, prioridade ou busque pelo nome</p>
        </div>
        <UiButton @click="showModal = true">+ Novo Projeto</UiButton>
      </div>

      <!-- Linha de filtros (v-model em cada controle) -->
      <div class="view-filters">
        <div class="filter-control">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="search" type="text" placeholder="Buscar projeto ou cliente..." />
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

        <div class="filter-control">
          <select v-model="priorityFilter">
            <option value="">Todas as prioridades</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
        </div>
      </div>

      <!-- Tabela de projetos — v-for itera os projetos filtrados -->
      <div class="table-shell">
        <table v-if="filtered.length > 0">
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Progresso</th>
              <th>Tarefas</th>
              <th>Prazo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in filtered" :key="project.id">
              <td>
                <div class="company-cell">
                  <strong>{{ project.name }}</strong>
                  <small v-if="project.description">{{ project.description }}</small>
                </div>
              </td>
              <td>{{ project.client }}</td>
              <td><UiPill :tone="statusTone(project.status)">{{ statusLabel(project.status) }}</UiPill></td>
              <td><UiPill :tone="priorityTone(project.priority)">{{ priorityLabel(project.priority) }}</UiPill></td>
              <td>
                <div style="display:flex;align-items:center;gap:8px;min-width:110px">
                  <div class="progress-track" style="flex:1;margin:0">
                    <div class="progress-fill" :style="{ width: project.progress + '%' }"></div>
                  </div>
                  <span style="font-size:12px;font-variant-numeric:tabular-nums;color:var(--muted)">{{ project.progress }}%</span>
                </div>
              </td>
              <td class="tabular">{{ project.completedTasks }}/{{ project.tasks }}</td>
              <td>{{ formatDate(project.deadline) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Estado vazio — exibido com v-if quando filtro não retorna resultados -->
        <div v-else class="blank-slate" style="min-height:200px">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:.4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <strong>Nenhum projeto encontrado</strong>
          <span>Ajuste os filtros ou a busca para ver resultados.</span>
        </div>
      </div>
    </div>

    <!-- Modal de criação — v-if controla visibilidade -->
    <TaskModal v-if="showModal" @close="showModal = false" @save="addProject" />
  </div>
</template>
