<!-- Equipe: busca + filtro por departamento + tabela de colaboradores -->
<script setup>
import { ref, computed } from 'vue'
import UiMetric from '@/components/ui/UiMetric.vue'
import UiPill   from '@/components/ui/UiPill.vue'
import { team } from '@/data/mockData.js'
import { statusTone, statusLabel } from '@/utils/format.js'

const search     = ref('')
const deptFilter = ref('')

// Extrai lista de departamentos únicos para o select
const departments = computed(() => [...new Set(team.map(m => m.department))].sort())

const filtered = computed(() =>
  team.filter(m => {
    const q = search.value.toLowerCase()
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)
    const matchDept   = !deptFilter.value || m.department === deptFilter.value
    return matchSearch && matchDept
  })
)

// Métricas calculadas
const activeCount   = computed(() => team.filter(m => m.status === 'active').length)
const vacationCount = computed(() => team.filter(m => m.status === 'vacation').length)
const inactiveCount = computed(() => team.filter(m => m.status === 'inactive').length)
const avgTasks      = computed(() => {
  const total = team.reduce((s, m) => s + m.tasks, 0)
  return (total / team.length).toFixed(1)
})
</script>

<template>
  <div>
    <div class="workspace-header">
      <h1>Equipe</h1>
      <p>{{ team.length }} colaboradores cadastrados</p>
    </div>

    <!-- Métricas da equipe -->
    <div class="metrics-grid">
      <UiMetric label="Total"          :value="team.length"    />
      <UiMetric label="Ativos"         :value="activeCount"    tone="green" />
      <UiMetric label="Em Férias"      :value="vacationCount"  tone="amber" />
      <UiMetric label="Inativos"       :value="inactiveCount"  tone="red"   />
      <UiMetric label="Departamentos"  :value="departments.length"          />
      <UiMetric label="Tarefas/Membro" :value="avgTasks"                    />
    </div>

    <div class="records-section">
      <div class="section-toolbar">
        <div>
          <h3>Colaboradores</h3>
          <p>{{ filtered.length }} de {{ team.length }} exibidos</p>
        </div>
      </div>

      <!-- Filtros: busca + departamento (v-model) -->
      <div class="view-filters">
        <div class="filter-control">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="search" type="text" placeholder="Buscar por nome ou cargo..." />
        </div>

        <div class="filter-control">
          <select v-model="deptFilter">
            <option value="">Todos os departamentos</option>
            <!-- v-for preenche opções dinamicamente a partir dos dados -->
            <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
          </select>
        </div>
      </div>

      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Status</th>
              <th>Tarefas Ativas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in filtered" :key="member.id">
              <td>
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="brand-mark" style="width:32px;height:32px;font-size:12px;flex:0 0 auto">{{ member.initials }}</div>
                  <strong>{{ member.name }}</strong>
                </div>
              </td>
              <td>{{ member.role }}</td>
              <td>{{ member.department }}</td>
              <td><UiPill :tone="statusTone(member.status)">{{ statusLabel(member.status) }}</UiPill></td>
              <td class="tabular">{{ member.tasks }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
