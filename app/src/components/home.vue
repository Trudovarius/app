<template>
  <div>
    <h1>HOME</h1>
    <app-signin  v-if="!auth" />
  </div>
</template>

<script>
  import Signin from "./user/signin.vue";

  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated;
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout');
      }
    },
    components: {
      'app-signin': Signin,
    },
  }
</script>

<style lang="scss">
</style>
