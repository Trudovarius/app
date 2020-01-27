<template>
  <article>
    <div class="home row shadow">
      <h1>HOME</h1>
    </div>
    <div class="row">
      <app-signup  v-if="!auth"/>
    </div>
  </article>
</template>

<script>
  import Signup from "./user/signup.vue";

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
      'app-signup': Signup
    },
  }
</script>

<style lang="scss">
</style>
