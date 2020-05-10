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
    <div class="result-message shadow">
      <div class="result-message-text">SUCCESS!!</div>
      <div class="result-message-stats">
        <div class="result-message-duration"></div>
        <div class="result-message-attempts"></div>
      </div>
      <div class="result-message-buttons">
        <button class="result-message-menu-btn shadow" @click="toMenu">Menu</button>
        <button class="result-message-next-btn shadow" @click="nextLesson">Next Lesson >></button>
      </div>
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
        attempts: 0,
        startTime: 0,
        consoleLog: console.log,
        consoleError: console.error,
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
      // submit user code, send messages to iframe to execute and verify input
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
      // functions that gets called on every message from iframe
      async onEvent(e) {
    		if (e.origin !== window.origin) return;
        // react only to messages of type result from iframe
        if (e.data.type && e.data.type === "result") {
          this.attempts++;
          if (e.data.pass) {
            let duration = this.getDuration();
            this.showMessage(duration/1000, this.attempts);
            // insert into database that user completed this lesson
            await this.$store.dispatch('completedLesson', {
              lessonId: this.lesson.id,
              userId: this.user.id,
              categoryId: this.$router.currentRoute.params.id,
              difficulty: this.lesson.difficulty,
              attempts: this.attempts,
              duration: duration
            });
            // adjust difficulty by user performance
            await this.adjustDifficulty(this.attempts, duration);
          } else {
            console.log("Error: " + e.data.content);
          }
        } else if (e.data.type === "error") {
          console.error(e.data.content);
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
        categoryStarted = categoryStarted[0];
        // compare category id and lessons id
        for (let category of categories) {
          if (category.id === id) {
            for (let lesson of category.lessons) {
              // is lesson the right difficulty and not completed?
              if (lesson.difficulty >= categoryStarted.difficulty && !this.isCompleted([...lessonsCompleted], lesson)) {
                this.lesson = lesson;
                return;
              }
            }
          }
        }
        this.$router.push("/"+this.$router.currentRoute.params.lib+"/completed/"+id);
      },
      /**
      * This functions iterates through array of completed lessons and returns true if it contains
      * lesson with the same id as in 2nd parameter, false if not
      * array - array of completed lessons for this user id and category
      * lesson - lesson
      */
      isCompleted(array, lesson) {
        // check if completed
        for (let l of array) {
          if (l.lessonId === lesson.id) {
            return true;
          }
        }
        return false;
      },
      // return time passed since start
      getDuration() {
        return Date.now() - this.startTime;
      },
      // update difficulty by user performance and update database record
      async adjustDifficulty(attempts, duration, categoryStarted) {
        duration = duration / 1000; // to seconds
        let newDifficulty = this.lesson.difficulty;
        // if user completed it in less than 30 seconds, increase by 2
        if (duration < 30 && attempts === 1) {
          newDifficulty += 2;
        // if user completed it in less than 3 attempts, increase by 1
        } else if (attempts < 3 || duration < 300) {
          newDifficulty++;
        }
        // check bounds
        if (newDifficulty > 5) {
          newDifficulty = 5;
        }
        if (newDifficulty < 1) {
          newDifficulty = 1;
        }
        // save to database
        await this.$store.dispatch('updateDifficulty', {
            userId: this.user.id,
            categoryId: this.$router.currentRoute.params.id,
            difficulty: newDifficulty
        });
      },
      // show and update content of the result-message element
      showMessage(duration, attempts) {
        $('.result-message')[0].style.display = "flex";
        if (duration >= 60) {
          $('.result-message-duration')[0].innerHTML = 'Duration: '+Math.floor(duration/60)+"m " + Math.floor(duration%60)+"s";
        } else {
          $('.result-message-duration')[0].innerHTML = 'Duration: '+Math.floor(duration%60)+"s";
        }
        $('.result-message-attempts')[0].innerHTML = 'Attempts: '+attempts;
      },
      // redirect to pixi home
      toMenu() {
        this.$router.push('/'+this.$router.currentRoute.params.lib);
      },
      // refresh page to display next lesson
      nextLesson() {
        this.$router.go();
      },
      // redirect messages from console to html element
      setupConsole() {
        $(".console").empty();
        this.consoleLog = console.log;
        this.consoleError = console.error;
        console.log = (msg) => {
            // former(msg);  //maintains existing logging via the console.
            $(".console").append("<div class='line'>" + msg + "</div>");
            $(".console").scrollTop($(".console")[0].scrollHeight);
        };
        console.error = (msg) => {
          $(".console").append("<div class='line error'>" + msg + "</div>");
          $(".console").scrollTop($(".console")[0].scrollHeight);
        }
        window.onerror = (message, url, linenumber) => {
            console.log("JavaScript error: " + message + " on line " +
                    linenumber + " for " + url);
        }
      }
    },
    created(){
      // init event listener for messages from iframe
      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    	var eventer = window[eventMethod];
    	var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
      eventer(messageEvent, this.onEvent);
    },
    async mounted(){
      if (!this.auth) {
        this.$router.push("/signin");
      }
      this.attemts = 0;  // init number of attempts
      this.startTime = Date.now(); // save time of start
      await this.setLesson(this.$router.currentRoute.params.id); // set lesson
      var iframeEl = $('#canvas')[0];
      if (iframeEl && iframeEl.contentWindow) {
         var iframe = iframeEl.contentWindow;
         iframe.addEventListener("load", () => { // init iframe
             // set lesson in canvas
             iframe.postMessage(
               { type: "setup", lesson_id: this.lesson.id, category_id: this.$router.currentRoute.params.id },
               location.origin
             );
         });
         this.setupConsole();
      }
    },
    beforeDestroy() {
      var messageEvent = window.addEventListener ? "message" : "onmessage";
      window.removeEventListener(messageEvent, this.onEvent);
      console.log = this.consoleLog;
      console.error = this.consoleError;
    }
  }
</script>

<style>
</style>
