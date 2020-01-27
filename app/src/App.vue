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
</style>
