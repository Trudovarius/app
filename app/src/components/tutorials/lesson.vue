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
        iframe.postMessage({type: "reset_stage"}, location.origin);
        // sending code from textarea to window with canvas
        iframe.postMessage({type: "execute", content:this.code}, location.origin);
        // send lesson code for verification
        iframe.postMessage({type: "verify", lesson_id: this.lesson.id}, location.origin);
        return false;
      },
      onEvent(e) {
    		if (e.origin !== window.origin) return;
        console.log(e.data)
      },
      setLesson(id) {
        // set lesson by id
        lessons.forEach(lesson => {
          if (lesson.id === id)
            this.lesson = lesson;
        });
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
      this.setLesson(this.$router.currentRoute.params.id);
      var iframe = $('#canvas')[0].contentWindow;
      iframe.addEventListener("load", () => {
          // set lesson in canvas
          iframe.postMessage(
            { type: "setup", content:  this.lesson.id },
            location.origin
          );
      });
    },
    beforeDestroy() {
      var messageEvent = window.addEventListener ? "message" : "onmessage";
      window.removeEventListener(messageEvent, this.onEvent);
    }
  }
</script>

<style>
</style>
