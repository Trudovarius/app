<template>
  <div class="lesson">
    <div class="task">
    </div>
    <div class="canvas">
      <canvas></canvas>
    </div>
    <div class="code">
    </div>
    <div class="console">
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

        console.log('XDDD')
      }
    }
  }
</script>

<style>
</style>
