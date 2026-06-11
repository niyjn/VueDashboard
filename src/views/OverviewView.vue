<!-- Visão Geral: métricas agregadas + tabela de atividades recentes -->
<script setup>
import { computed } from 'vue'
import UiMetric from '@/components/ui/UiMetric.vue'
import UiPill from '@/components/ui/UiPill.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { projects, team, recentTasks } from '@/data/mockData.js'
import { statusTone, statusLabel, formatDate } from '@/utils/format.js'
import { useTuxVault } from '@/composables/useTuxVault.js'

const { uploading, exportar } = useTuxVault()

// computed para derivar métricas dos dados mock
const activeProjects  = computed(() => projects.filter(p => p.status === 'active').length)
const completedProjects = computed(() => projects.filter(p => p.status === 'completed').length)
const totalTasks      = computed(() => projects.reduce((s, p) => s + p.tasks, 0))
const completedTasks  = computed(() => projects.reduce((s, p) => s + p.completedTasks, 0))
const activeMembers   = computed(() => team.filter(m => m.status === 'active').length)
const completionRate  = computed(() => Math.round((completedTasks.value / totalTasks.value) * 100) + '%')

function exportOverview() {
  exportar('overview.json', {
    metrics: {
      activeProjects: activeProjects.value,
      completedProjects: completedProjects.value,
      totalTasks: totalTasks.value,
      completedTasks: completedTasks.value,
      activeMembers: activeMembers.value,
      completionRate: completionRate.value
    },
    recentTasks
  })
}
</script>

<template>
  <div>
    <div class="workspace-header">
      <h1>Visão Geral</h1>
      <p>Resumo dos projetos e atividades da equipe.</p>
    </div>

    <!-- Métricas em grid (6 células com bordas colapsadas) -->
    <div class="metrics-grid">
      <UiMetric label="Projetos Ativos"    :value="activeProjects"    tone="green" />
      <UiMetric label="Concluídos"         :value="completedProjects" tone="blue"  />
      <UiMetric label="Total de Tarefas"   :value="totalTasks"                     />
      <UiMetric label="Tarefas Concluídas" :value="completedTasks"    tone="green" />
      <UiMetric label="Membros Ativos"     :value="activeMembers"                  />
      <UiMetric label="Taxa de Conclusão"  :value="completionRate"    tone="amber" />
    </div>

    <!-- Atividades recentes — v-for renderiza cada tarefa -->
    <div class="records-section">
      <div class="section-toolbar">
        <div>
          <h3>Atividades Recentes</h3>
          <p>Últimas tarefas atualizadas</p>
        </div>
        <UiButton variant="secondary" :disabled="uploading" @click="exportOverview">
          {{ uploading ? 'Exportando...' : 'Exportar' }}
        </UiButton>
      </div>

      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Projeto</th>
              <th>Responsável</th>
              <th>Status</th>
              <th>Prazo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in recentTasks" :key="task.id">
              <td>{{ task.title }}</td>
              <td>{{ task.project }}</td>
              <td>
                <div class="brand-mark" style="width:28px;height:28px;font-size:11px">{{ task.assignee }}</div>
              </td>
              <td>
                <UiPill :tone="statusTone(task.status)">{{ statusLabel(task.status) }}</UiPill>
              </td>
              <td>{{ formatDate(task.due) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
