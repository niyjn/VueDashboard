import { ref, watchEffect } from 'vue'

// Singleton — all components share the same reactive ref
const theme = ref(localStorage.getItem('flowboard.theme') === 'dark' ? 'dark' : 'light')

watchEffect(() => {
  localStorage.setItem('flowboard.theme', theme.value)
})

export function useTheme() {
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
