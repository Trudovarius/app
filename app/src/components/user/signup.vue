<template>
  <div class="signup shadow block">
    <h1>Sign up</h1>
    <form @submit.prevent="onSubmit">
      <div class="input">
        <label for="name">Name</label>
        <input
            type="text"
            id="name"
            v-model="name">
      </div>
      <div class="input">
        <label for="email">E-mail</label>
        <input
            type="email"
            id="email"
            v-model="email">
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            v-model="password">
      </div>
      <div class="submit">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        this.$store.dispatch('signup', {
          name: this.name,
          email: this.email,
          password: this.password
        });
      }
    }
  }
</script>


<style>
</style>
