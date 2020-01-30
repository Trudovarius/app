<template>
  <div class="dashboard row block shadow">
    <h1>PIXI JS</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated;
      },
      user() {
        return this.$store.getters.user;
      }
    },
    methods: {
    },
    mounted(){
      if (!this.auth) {
        this.$router.push("/signin");
      }
    }
  }
</script>

<style>
</style>
