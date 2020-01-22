import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth';
import globalAxios from 'axios';
import router from './router';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    userId: null,
    userName: null
  },
  mutations: {
    authUser (state, userData) {
      state.userId = userData.userId,
      state.userName = userData.userName
    },
    storeUser (state, user) {
      state.user = user;
    },
    clearAuthData (state) {
      state.userId = null;
    }
  },
  actions: {
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData');
      },expirationTime * 1000)
    },
    signup({commit, dispatch}, authData) {
      axios.post('signup', {
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          console.log(res);
          commit('authUser', {
            userId: res.data.localId
          });
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn*1000);
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('expirationDate', expirationDate);
          dispatch('storeUser', authData);
          dispatch('setLogoutTimer',res.data.expiresIn);
        })
        .catch(error => console.log(error));
    },
    login({commit, dispatch},authData) {
      axios.post('/login', {
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          const now = new Date();
          const expirationDate = new Date(now.getTime() + 3600*1000);
          localStorage.setItem('userId', res.data.user._id);
          localStorage.setItem('expirationDate', expirationDate);
          commit('authUser', {
            userId: res.data.user._id,
            userName: res.data.user.name
          });
          dispatch('setLogoutTimer', 3600);
          if (router.currentRoute.path !== '/')
            router.push('/');
        })
        .catch(error => console.log(error));
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem('expirationDate');
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      const userId = localStorage.getItem('userId');
      commit('authUser', {
        userId: userId
      });
    },
    logout({commit}) {
      commit('clearAuthData');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userId');
      router.replace('/signin');
    },
    storeUser ({commit, state}, userData) {
      if (!state.userId) {
        return;
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },
    fetchUser({commit, state}) {
      if (!state.idToken) {
        return;
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
          .then(res => {
            console.log(res);
            const data = res.data;
            const users = [];
            for (let key in data) {
              const user = data[key];
              user.id = key;
              users.push(user);
            }
            commit('storeUser', users[0]);
          })
          .catch(error => console.log(error));
    }
  },
  getters: {
    userName (state) {
      return state.userName;
    },
    isAuthenticated(state) {
      return state.userId !== null;
    }
  },
  modules: {
  }
})
