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
        <label for="code">Type your code here:</label>
        <textarea :placeholder="lesson.code" v-model="code" name="code"></textarea>
        <button>Execute!</button>
      </form>
    </div>
    <div class="console">
    </div>
  </div>
</template>

<script>
  import categories from './pixi/lessons.js';
  export default {
    data () {
      return {
        code: '',
        lesson: {},
        attempts: 0
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
        iframe.postMessage({
            type: "verify",
            lesson_id: this.lesson.id,
            category_id: this.$router.currentRoute.params.id
          },
          location.origin
        );
        return false;
      },
      onEvent(e) {
    		if (e.origin !== window.origin) return;
        console.log(e.data)
        if (e.data.type && e.data.type === "result") {
          this.attempts++;
          if (e.data.pass) {
            // TODO show passed message
            this.$store.dispatch('completedLesson', {
              lessonId: this.lesson.id,
              userId: this.user.id,
              categoryId: this.$router.currentRoute.params.id,
              difficulty: this.lesson.difficulty,
              attempts: this.attempts
            });
          } else {
            // TODO show fail message
          }
        }
      },
      async setLesson(id) {
        // get completed lessons
        let lessonsCompleted = await this.$store.dispatch('getCompletedLessons', {
          userId: this.user.id,
          categoryId: id
        });
        // get category progress
        let categoryStarted = await this.$store.dispatch('getCategoriesTaken', {
          userId: this.user.id,
          categoryId: id
        });
        categoryStarted = categoryStarted[0]
        for (let category of categories) {
          if (category.id === id) {
            for (let lesson of category.lessons) {
              if (lesson.difficulty >= categoryStarted.difficulty && !this.isCompleted([...lessonsCompleted], lesson)) {
                // TODO pick only the not completed lessons
                this.lesson = lesson;
                return;
              }
            }
          }
        }
      },
      isCompleted(array, lesson) {
        for (let l of array) {
          if (l.lessonId === lesson.id) {
            return true;
          }
        }
        return false;
      }
    },
    created(){
      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    	var eventer = window[eventMethod];
    	var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
      eventer(messageEvent, this.onEvent);
    },
    async mounted(){
      if (!this.auth) {
        this.$router.push("/signin");
      }
      this.attemts = 0;
      await this.setLesson(this.$router.currentRoute.params.id);
      var iframe = $('#canvas')[0].contentWindow;
      iframe.addEventListener("load", () => {
          // set lesson in canvas
          iframe.postMessage(
            { type: "setup", lesson_id: this.lesson.id, category_id: this.$router.currentRoute.params.id },
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
