<script setup>
defineProps({
  tone: { type: String, default: 'neutral' }
})
</script>

<template>
  <span class="pill" :class="tone"><slot /></span>
</template>
