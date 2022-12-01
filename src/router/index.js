import Vue from 'vue'
import VueRouter from 'vue-router'
import EnterView from '../views/EnterView.vue'
import TopView from '../views/TopView.vue'
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'enter',
    component: EnterView,
    beforeEnter:(to, from, next) => {
      console.log('route(top):beforeEnter');
      next();
    }
  },
  {
    path: '/top',
    name: 'top',
    component: TopView,
    beforeEnter:(to, from, next) => {
      console.log('route(top):beforeEnter');
      next();
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../components/LoginComp.vue')
  },
  {
    path: '/timer',
    name: 'timer',
    component: () => import(/* webpackChunkName: "about" */ '../components/timer_comp/TimerCompSub.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../components/SignUpComp.vue')
  },
  {
    path: '/controller',
    name: 'controller',
    component: () => import(/* webpackChunkName: "about" */ '../components/timer_comp/TimerController.vue')
  },
  {
    path: '/header',
    name: 'header',
    component: () => import(/* webpackChunkName: "about" */ '../components/timer_comp/TimerHeader.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue'),
    beforeEnter:(to, from, next) => {
      setTimeout(() => {
        console.log('route(user):beforeEnter');
        next();
      }, 400);
    }
  },
  {
    path: '/community',
    name: 'community',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CommunityView.vue'),
    beforeEnter:(to, from, next) => {
      setTimeout(() => {
        console.log('route(community):beforeEnter');
      next();
      }, 400);
    }
  },
  {
    path: '/sound',
    name: 'sound',
    component: () => import(/* webpackChunkName: "about" */ '../components/sounds/SoundBox.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../components/parts_comp/TestTest.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    const authApp = auth;
    onAuthStateChanged(authApp, (user) => {
      if(!user) {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }   
})

export default router
