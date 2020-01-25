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
  #header {
    height: 100px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #35DF2D;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px;
    border-radius: 50px;
  }

  .logo a:active, .logo a:hover {
    color: white;
    background-color: #1A8038;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    display: block;
    padding: 10px;
    border-radius: 50px;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: white;
    background-color: #1A8038;
  }

  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
    font-weight: bold;
  }

  .logout a {
    display: block;
    padding: 10px;
    border-radius: 50px;
  }

  .logout a:hover,
  .logout a:active, {
    color: white;
    background-color: #1A8038;
  }
</style>
