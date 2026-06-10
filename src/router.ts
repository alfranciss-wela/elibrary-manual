import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@pages/HomePage.vue'),
    },
    {
      path: '/getting-started',
      name: 'getting-started',
      component: () => import('@pages/GettingStartedPage.vue'),
    },
    {
      path: '/project-structure',
      name: 'project-structure',
      component: () => import('@pages/ProjectStructurePage.vue'),
    },
    {
      path: '/development',
      name: 'development',
      component: () => import('@pages/DevelopmentPage.vue'),
    },
    {
      path: '/deployment',
      name: 'deployment',
      component: () => import('@pages/DeploymentPage.vue'),
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@pages/SupportPage.vue'),
    },
  ],
})

export default router
