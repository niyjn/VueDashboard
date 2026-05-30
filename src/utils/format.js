export function statusTone(status) {
  const map = { active: 'green', completed: 'blue', paused: 'amber', cancelled: 'red', inactive: 'muted', vacation: 'amber' }
  return map[status] ?? 'neutral'
}

export function statusLabel(status) {
  const map = { active: 'Ativo', completed: 'Concluído', paused: 'Pausado', cancelled: 'Cancelado', inactive: 'Inativo', vacation: 'Férias' }
  return map[status] ?? status
}

export function priorityTone(priority) {
  const map = { high: 'red', medium: 'amber', low: 'green' }
  return map[priority] ?? 'neutral'
}

export function priorityLabel(priority) {
  const map = { high: 'Alta', medium: 'Média', low: 'Baixa' }
  return map[priority] ?? priority
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateStr + 'T12:00:00'))
}
