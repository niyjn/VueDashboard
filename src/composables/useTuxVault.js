import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_TUXVAULT_API_KEY
const ENDPOINT = 'https://tuxvault.online/api/external/upload'

export function useTuxVault() {
  const uploading = ref(false)

  async function exportar(filename, data) {
    uploading.value = true
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const file = new File([blob], filename, { type: 'application/json' })
      const form = new FormData()
      form.append('file', file)

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}` },
        body: form
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message ?? 'Upload falhou')
      return result
    } catch (err) {
      console.error('[TuxVault]', err)
    } finally {
      uploading.value = false
    }
  }

  return { uploading, exportar }
}
