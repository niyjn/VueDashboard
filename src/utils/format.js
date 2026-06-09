/**
 * Retorna o tom de cor correspondente ao status do projeto/tarefa.
 * @param {string} status - 'active' | 'completed' | 'paused' | 'cancelled' | 'inactive' | 'vacation'
 * @returns {string} tom de cor para o componente UiPill
 */
export function statusTone(status) {
  const map = { active: 'green', completed: 'blue', paused: 'amber', cancelled: 'red', inactive: 'muted', vacation: 'amber' }
  return map[status] ?? 'neutral'
}

/**
 * Retorna o rótulo em português para o status.
 * @param {string} status
 * @returns {string}
 */
export function statusLabel(status) {
  const map = { active: 'Ativo', completed: 'Concluído', paused: 'Pausado', cancelled: 'Cancelado', inactive: 'Inativo', vacation: 'Férias' }
  return map[status] ?? status
}

/**
 * Retorna o tom de cor correspondente à prioridade do projeto.
 * @param {string} priority - 'high' | 'medium' | 'low'
 * @returns {string}
 */
export function priorityTone(priority) {
  const map = { high: 'red', medium: 'amber', low: 'green' }
  return map[priority] ?? 'neutral'
}

/**
 * Retorna o rótulo em português para a prioridade.
 * @param {string} priority
 * @returns {string}
 */
export function priorityLabel(priority) {
  const map = { high: 'Alta', medium: 'Média', low: 'Baixa' }
  return map[priority] ?? priority
}

/**
 * Formata uma data no padrão brasileiro (ex: 01 de jun. de 2026).
 * @param {string} dateStr - data no formato 'YYYY-MM-DD'
 * @returns {string} data formatada ou '—' se não informada
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateStr + 'T12:00:00'))
}