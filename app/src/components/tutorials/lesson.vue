<template>
  <div class="lesson">
    <div class="task">
      <p v-html="lesson.task"></p>
    </div>
    <div class="canvas">
      <iframe id="canvas" src="../../src/canvas.html" sandbox="allow-scripts allow-same-origin"></iframe>
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
  import lessons from './pixi/lessons.js';
  export default {
    data () {
      return {
        code: '',
        lesson: {}
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
        var iframe = $('#canvas')[0].contentWindow;
        // reset iframe
        iframe.postMessage("stage.removeChildren()", location.origin);
        // sending code from textarea to window with canvas
        iframe.postMessage(this.code, location.origin);
        // send lesson code for verification
        iframe.postMessage(this.lesson.verification);
        return false;
      },
      onEvent(e) {
    		if (e.origin !== window.origin) return;
        console.log(e.data)
      }
    },
    created(){
      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    	var eventer = window[eventMethod];
    	var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
      eventer(messageEvent, this.onEvent);
    },
    mounted(){
      if (!this.auth) {
        this.$router.push("/signin");
      }

      // import lesson
      lessons.forEach(lesson => {
        if (lesson.id === this.$router.currentRoute.params.id)
          this.lesson = lesson;
      });
      // execute lesson setup execute
      var iframe = $('#canvas')[0].contentWindow;
      iframe.postMessage(this.lesson.setup, location.origin);



      // $(".console").empty();
      // var former = console.log;
      // console.log = function(msg){
      //     // former(msg);  //maintains existing logging via the console.
      //     $(".console").append("<div class='line'>" + msg + "</div>");
      //     $(".console").scrollTop($(".console")[0].scrollHeight);
      // }
      //
      // window.onerror = function(message, url, linenumber) {
      //     console.log("JavaScript error: " + message + " on line " +
      //             linenumber + " for " + url);
      // }

    },
    beforeDestroy() {
      var messageEvent = window.addEventListener ? "message" : "onmessage";
      window.removeEventListener(messageEvent, this.onEvent);
    }
  }
</script>

<style>
</style>
