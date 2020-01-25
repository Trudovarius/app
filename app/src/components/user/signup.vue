<template>
  <div class="signup">
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
.signup {
  background-color: white;
  border-radius: 25px;
  width: 100%;
  padding: 25px;
  float: right;
}
</style>
