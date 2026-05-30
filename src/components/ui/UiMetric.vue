<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  value: [Number, String],
  tone: { type: String, default: '' }
})

const formatted = computed(() => {
  if (typeof props.value === 'number') return props.value.toLocaleString('pt-BR')
  return props.value ?? '—'
})
</script>

<template>
  <div class="metric" :class="tone">
    <span>{{ label }}</span>
    <strong>{{ formatted }}</strong>
  </div>
</template>
