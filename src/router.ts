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
    {
      path: '/latest-updates',
      name: 'latest-updates',
      component: () => import('@pages/LatestUpdatesPage.vue'),
    },
  ],
})

export default router
