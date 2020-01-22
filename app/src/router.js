import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store';

import Home from './components/home.vue'
// import SignupPage from './components/signup.vue'
import SigninPage from './components/user/signin.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  // { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
];

export default new VueRouter({mode: 'history', routes})
