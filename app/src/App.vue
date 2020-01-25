<template>
  <div id="app">
    <app-header />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/header.vue'
  // import Signin from './components/user/signin.vue';
  export default {
    name: 'app',
    components: {
      'app-header': Header,
      // 'app-login': Signin
    },
    created() {
      this.$store.dispatch('tryAutoLogin');
    }
  }
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  background-color: #F4F9F4;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  width: 80%;
  margin: 50px auto;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
