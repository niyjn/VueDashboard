<!-- Bento decorativo da tela de login — cards posicionados por nth-of-type (ver design-system/components.css seção 15) -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const now = ref(new Date())
let timer = null

const timeStr = computed(() =>
  new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now.value)
)
const dateStr = computed(() =>
  new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).format(now.value)
)

onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onUnmounted(() => { clearInterval(timer) })
</script>

<template>
  <div class="bento-grid">
    <!-- 1: Large — display principal -->
    <div class="bento-card bento-card-large">
      <div>
        <div class="bento-label">Plataforma</div>
        <div class="bento-display">flow<br>board</div>
      </div>
      <p>Organize projetos, equipes e entregas em um único lugar.</p>
    </div>

    <!-- 2: Medium -->
    <div class="bento-card bento-card-medium">
      <div class="bento-label">Metodologia</div>
      <div class="bento-display" style="font-size:clamp(18px,2vw,26px);line-height:1">Ágil &amp;<br>Rápido</div>
    </div>

    <!-- 3: Tall — relógio ao vivo -->
    <div class="bento-card bento-card-tall bento-clock">
      <div class="bento-label">Horário</div>
      <div class="bento-display tabular">{{ timeStr }}</div>
      <small class="tabular">{{ dateStr }}</small>
    </div>

    <!-- 4: Wide — lista de recursos -->
    <div class="bento-card bento-card-wide bento-capabilities">
      <div class="bento-label">Recursos</div>
      <ul>
        <li>Quadro de Projetos</li>
        <li>Gestão de Equipes</li>
        <li>Métricas em Tempo Real</li>
      </ul>
    </div>

    <!-- 5: Small -->
    <div class="bento-card bento-card-small">
      <div class="bento-display" style="font-size:28px">6</div>
      <div class="bento-label">Projetos</div>
    </div>

    <!-- 6: Small -->
    <div class="bento-card bento-card-small">
      <div class="bento-display" style="font-size:28px">8</div>
      <div class="bento-label">Membros</div>
    </div>

    <!-- 7: Small -->
    <div class="bento-card bento-card-small">
      <div class="bento-display" style="font-size:24px">99</div>
      <div class="bento-label">Tarefas</div>
    </div>

    <!-- 8: Small — status do sistema -->
    <div class="bento-card bento-card-small" style="justify-content:center">
      <div class="bento-status-row">
        <div class="status-dot up"></div>
        <strong>Online</strong>
      </div>
    </div>

    <!-- 9-12: Mini accent cards (cor decorativa hardcoded) -->
    <div class="bento-card bento-card-mini"></div>
    <div class="bento-card bento-card-mini"></div>
    <div class="bento-card bento-card-mini"></div>
    <div class="bento-card bento-card-mini"></div>
  </div>
</template>
