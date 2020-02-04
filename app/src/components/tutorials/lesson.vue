<template>
  <div class="lesson">
    <div class="canvas">
      <canvas></canvas>
    </div>
    <div class="code">
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
