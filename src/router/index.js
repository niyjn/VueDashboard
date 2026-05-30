import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AppShell from '@/components/AppShell.vue'
import OverviewView from '@/views/OverviewView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import TeamView from '@/views/TeamView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      component: AppShell,
      redirect: '/overview',
      meta: { requiresAuth: true },
      children: [
        { path: 'overview', name: 'overview', component: OverviewView },
        { path: 'projetos', name: 'projetos', component: ProjectsView },
        { path: 'equipe', name: 'equipe', component: TeamView },
        { path: 'configuracoes', name: 'configuracoes', component: SettingsView }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem('flowboard.auth') === 'true'
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }
  if (to.name === 'login' && isAuthenticated) {
    return { name: 'overview' }
  }
})

export default router
