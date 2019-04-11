import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Top from '@/components/Top'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: 'Top',
      name: 'Top',
      component: Top,
      props: true,
    },
  ],
})
