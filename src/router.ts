import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    fullWidth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@pages/LandingPage.vue'),
      meta: { fullWidth: true },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@pages/HomePage.vue'),
    },
    {
      path: '/project-structure',
      name: 'project-structure',
      component: () => import('@pages/ProjectStructurePage.vue'),
    },
    {
      path: '/workflow',
      name: 'workflow',
      component: () => import('@pages/WorkflowPage.vue'),
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@pages/SupportPage.vue'),
    },
    {
      path: '/installation',
      name: 'installation',
      component: () => import('@pages/InstallationPage.vue'),
    },
  ],
})

export default router
