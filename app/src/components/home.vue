<template>
  <article>
    <div class="home row">
      <h1>HOME</h1>
    </div>
    <div class="row">
      <app-signin  v-if="!auth" class="col-1-of-2"/>
      <app-signup  v-if="!auth" class="col-1-of-2"/>
    </div>
  </article>
</template>

<script>
  import Signin from "./user/signin.vue";
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
      'app-signin': Signin,
      'app-signup': Signup,
    },
  }
</script>

<style lang="scss">
.home {
  min-height: 200px;
  background-color: white;
  border-radius: 25px;
  width: 100%;
  padding: 25px;
}
</style>
