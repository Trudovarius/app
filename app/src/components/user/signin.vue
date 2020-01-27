<template>
  <div class="signin shadow">
    <h1>Sign in</h1>
    <form @submit.prevent="onSubmit">
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
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch('login', {email: formData.email, password: formData.password});
      }
    }
  }
</script>


<style>
</style>
