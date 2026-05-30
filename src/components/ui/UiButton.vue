<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'warning', 'danger'].includes(v)
  },
  disabled: Boolean,
  type: { type: String, default: 'button' }
})
</script>

<template>
  <button
    class="button"
    :class="variant !== 'primary' ? variant : ''"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
