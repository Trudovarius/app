<template>
  <div class="dashboard row block shadow">
    <h1>Dashboard</h1>
    <div class="row">
      <div class="col-1-of-3">
        <h2>Friends score</h2>
      </div>
      <div class="col-2-of-3">
        <h2>Tutorials</h2>
        <ul class="tutorials">
          <li><router-link to="/pixi">pixi js</router-link></li>
          <li><router-link to="/pixi">createjs</router-link></li>
        </ul>
      </div>
    </div>
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
