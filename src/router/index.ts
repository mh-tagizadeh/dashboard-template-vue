import { createRouter, createWebHistory } from 'vue-router'
import LayoutApp from '../layouts/LayoutApp.vue'
import LoginView from '../views/LoginView.vue'
import pages from './pages.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutApp,
      children: [...pages],
      meta: {
        auth: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        auth: true,
      }
    }
  ]
})


router.beforeEach((to, from, next) => {

    if (to.meta.auth && localStorage.getItem('access_token')) {
        next({
            to: "/",
        });
    } else if (!to.meta.auth && !localStorage.getItem('access_token')) {
        next({
            name: "login",
        });
    } else {
        next();
    }
});


export default router
