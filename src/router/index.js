import HomePage from '@/components/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('@/components/TypingPractice.vue')
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/components/ResultPage.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/components/DashBoard.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/CreateAccount.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/LogIntoAccount.vue')
    }
  ]
})

export default router
