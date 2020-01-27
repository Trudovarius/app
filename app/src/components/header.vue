<template>
  <header id="header">
    <div class="logo">
      <router-link to="/">Vue - Complete Guide</router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!auth">
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li v-if="!auth">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/profile">{{ username }}</router-link>
        </li>
        <li v-if="auth">
          <button class="logout" @click="onLogout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated;
      },
      username() {
        return this.$store.getters.userName;
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout');
      }
    }
  }
</script>

<style scoped>
</style>
