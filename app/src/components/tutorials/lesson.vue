<template>
  <div class="lesson">
    <div class="task">
    </div>
    <div class="canvas">
      <iframe id="canvas" src="../src/canvas.html" sandbox="allow-scripts"></iframe>
    </div>
    <div class="code">
      <form v-on:submit.prevent="onSubmit">
        <textarea placeholder="Type your code here:" v-model="code"></textarea>
        <button>Execute!</button>
      </form>
    </div>
    <div class="console">
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        code: ''
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
      onSubmit() {
        // console.log(this.code);
        eval(this.code);
      }
    },
    mounted(){
      if (!this.auth) {
        this.$router.push("/signin");
      } else {
        $(".console").empty();
        var former = console.log;
        console.log = function(msg){
            // former(msg);  //maintains existing logging via the console.
            $(".console").append("<div class='line'>" + msg + "</div>");
            $(".console").scrollTop($(".console")[0].scrollHeight);
        }

        window.onerror = function(message, url, linenumber) {
            console.log("JavaScript error: " + message + " on line " +
                    linenumber + " for " + url);
        }
      }
    }
  }
</script>

<style>
</style>
