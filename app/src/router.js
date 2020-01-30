import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store';

import Home from './components/home.vue'
import SignupPage from './components/user/signup.vue'
import SigninPage from './components/user/signin.vue'
import Profile from './components/user/profile.vue'
import Dashboard from './components/dashboard.vue'
import Pixi from './components/tutorials/pixi/pixi.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { path: '/profile', component: Profile },
  { path: '/dashboard', component: Dashboard },
  { path: '/pixi', component: Pixi }
];

export default new VueRouter({mode: 'history', routes})
