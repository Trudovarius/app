<template>
  <div class="profile row block shadow">
    <h1>{{ user.name }}</h1>
    <div class="row">
      <div class="photo col-1-of-3">
        <img :src="user.img" />
      </div>
      <div class="info col-2-of-3">
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
