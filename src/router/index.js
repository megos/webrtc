import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/Login'
import Top from '@/components/Top'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Top',
    name: 'Top',
    component: Top,
    props: true,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
