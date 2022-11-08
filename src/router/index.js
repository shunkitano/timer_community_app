import Vue from 'vue'
import VueRouter from 'vue-router'
import EnterView from '../views/EnterView.vue'
import TopView from '../views/TopView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'enter',
    component: EnterView,
    // beforeEnter:(to, from, next) => {
    //   console.log('route(top):beforeEnter');
    //   next();
    // }
  },
  {
    path: '/top',
    name: 'top',
    component: TopView,
    // beforeEnter:(to, from, next) => {
    //   console.log('route(top):beforeEnter');
    //   next();
    // }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../components/LoginComp.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../components/SignUpComp.vue')
  },
  {
    path: '/timer',
    name: 'timer',
    component: () => import(/* webpackChunkName: "about" */ '../components/timer_comp/TimerComp2.vue')
  },
  {
    path: '/timer3',
    name: 'timer3',
    component: () => import(/* webpackChunkName: "about" */ '../components/timer_comp/TimerComp3.vue')
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue'),
    beforeEnter:(to, from, next) => {
      console.log('route(user):beforeEnter');
      next();
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
      console.log('route(community):beforeEnter');
      next();
    }
  },
  // {
  //   path: '/sounds',
  //   name: 'sounds',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../components/sounds/SoundsComp.vue'),
  //   beforeEnter:(to, from, next) => {
  //     console.log('route(sounds):beforeEnter');
  //     next();
  //   }
  // },
  {
    path: '/sound',
    name: 'sound',
    component: () => import(/* webpackChunkName: "about" */ '../components/sounds/SoundBox.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
