<template>
  <div class="row block shadow pixi">
    <h1>PIXI JS</h1>
    <div class="col-1-of-3">
      <h2>Tutorials</h2>
      <ul>
        <li><router-link to="/lesson/123">pixi js</router-link></li>
      </ul>
    </div>
    <div class="col-2-of-3">
      <div class="text">
        <hr>
        <h3>Introduction</h3>
        <p>
          Pixi is an extremely fast 2D sprite rendering engine. It helps you to display,
          animate and manage interactive graphics so that it's easy for you to make games
          and applications using JavaScript and other HTML5 technologies.It has a sensible,
          uncluttered API and includes many useful features, like supporting texture atlases
          and providing a streamlined system for animating sprites (interactive images).
          It also gives you a complete scene graph so that you can create hierarchies of nested
          sprites (sprites inside sprites), as well as letting you attach mouse and touch
          events directly to sprites. And, most importantly, Pixi gets out of your way so
          that you can use as much or as little of it as you want to, adapt it to your personal
          coding style, and integrate it seamlessly with other useful frameworks.
        </p>
        <hr>
        <h3>Usefull links</h3>
        <p>
          <a href="https://pixijs.download/dev/docs/index.html" target="_blank">
            Official PixiJS v5 documentation
          </a>
          <a href="https://github.com/kittykatattack/learningPixi" target="_blank">
            Github tutorial by kittykatattack
          </a>
        </p>
        <hr>
        <h3>What do you need to know before you get started with this tutorial?</h3>
        <p>
          You should have a reasonable understanding of HTML and JavaScript. You don't have to be an expert,
          just an ambitious beginner with an eagerness to learn. If you don't know HTML and JavaScript, the
          best place to start learning it is this book:
        </p>
        <p>
          <a href="https://www.apress.com/gp/book/9781430247166" target="_blank">
            Foundation Game Design with HTML5 and JavaScript
          </a>
          <a href="https://www.itnetwork.cz/javascript" target="_blank">
            ITNetwork [CZ]
          </a>
        </p>
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
