export const projects = [
  {
    id: 1,
    name: 'Redesign do Site',
    client: 'Acme Corp',
    status: 'active',
    priority: 'high',
    team: ['AL', 'BM'],
    progress: 65,
    tasks: 12,
    completedTasks: 8,
    deadline: '2026-07-15',
    description: 'Renovação completa da identidade visual e UX do site institucional.'
  },
  {
    id: 2,
    name: 'App Mobile v2.0',
    client: 'TechStart',
    status: 'active',
    priority: 'high',
    team: ['CS', 'DC', 'ES'],
    progress: 35,
    tasks: 24,
    completedTasks: 8,
    deadline: '2026-08-30',
    description: 'Nova versão do aplicativo mobile com redesign e novas funcionalidades.'
  },
  {
    id: 3,
    name: 'API de Pagamentos',
    client: 'FinPay',
    status: 'completed',
    priority: 'medium',
    team: ['FT'],
    progress: 100,
    tasks: 18,
    completedTasks: 18,
    deadline: '2026-05-20',
    description: 'Integração com gateway de pagamento e implementação de webhook.'
  },
  {
    id: 4,
    name: 'Dashboard Analytics',
    client: 'DataViz',
    status: 'paused',
    priority: 'low',
    team: ['GN', 'HF'],
    progress: 48,
    tasks: 15,
    completedTasks: 7,
    deadline: '2026-09-10',
    description: 'Painel de análise de dados em tempo real com gráficos interativos.'
  },
  {
    id: 5,
    name: 'Integração ERP',
    client: 'Indústria SA',
    status: 'active',
    priority: 'medium',
    team: ['AL', 'CS'],
    progress: 20,
    tasks: 30,
    completedTasks: 6,
    deadline: '2026-10-01',
    description: 'Sincronização bidirecional com sistema ERP legado via API REST.'
  },
  {
    id: 6,
    name: 'Portal do Cliente',
    client: 'Serviços Plus',
    status: 'active',
    priority: 'high',
    team: ['BM', 'DC'],
    progress: 78,
    tasks: 9,
    completedTasks: 7,
    deadline: '2026-06-30',
    description: 'Portal self-service para clientes consultarem pedidos e faturas.'
  }
]

export const team = [
  { id: 1, initials: 'AL', name: 'Ana Lima', role: 'UX Designer', department: 'Design', status: 'active', tasks: 4 },
  { id: 2, initials: 'BM', name: 'Bruno Martins', role: 'Frontend Dev', department: 'Tech', status: 'active', tasks: 6 },
  { id: 3, initials: 'CS', name: 'Carlos Souza', role: 'Backend Dev', department: 'Tech', status: 'active', tasks: 8 },
  { id: 4, initials: 'DC', name: 'Diana Costa', role: 'Product Manager', department: 'Produto', status: 'active', tasks: 3 },
  { id: 5, initials: 'ES', name: 'Eduardo Silva', role: 'Mobile Dev', department: 'Tech', status: 'vacation', tasks: 0 },
  { id: 6, initials: 'FT', name: 'Felipe Torres', role: 'DevOps', department: 'Infra', status: 'active', tasks: 5 },
  { id: 7, initials: 'GN', name: 'Gabriela Nunes', role: 'Data Analyst', department: 'Analytics', status: 'active', tasks: 7 },
  { id: 8, initials: 'HF', name: 'Hugo Ferreira', role: 'QA Engineer', department: 'Tech', status: 'inactive', tasks: 2 }
]

export const recentTasks = [
  { id: 1, title: 'Protótipos de tela inicial', project: 'Redesign do Site', assignee: 'AL', status: 'completed', due: '2026-06-01' },
  { id: 2, title: 'Configurar CI/CD pipeline', project: 'App Mobile v2.0', assignee: 'FT', status: 'active', due: '2026-06-05' },
  { id: 3, title: 'Integrar auth no portal', project: 'Portal do Cliente', assignee: 'BM', status: 'active', due: '2026-06-04' },
  { id: 4, title: 'Testes de carga na API', project: 'API de Pagamentos', assignee: 'HF', status: 'completed', due: '2026-05-18' },
  { id: 5, title: 'Mapeamento de endpoints ERP', project: 'Integração ERP', assignee: 'CS', status: 'paused', due: '2026-06-10' }
]
