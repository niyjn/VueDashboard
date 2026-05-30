<script setup>
defineProps({
  type: { type: String, default: 'warning' }
})
</script>

<template>
  <div class="alert" :class="type === 'error' ? 'error' : ''">
    <slot />
  </div>
</template>
