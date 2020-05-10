<template>
  <div class="row shadow block completed-lessons">
    <h1>Category {{ category.name }} Completed</h1>
    <div class="col-1-of-3">
      <h2>Stats</h2>
      <div class="stats shadow">
        <div class="stats-name">Total attempts: </div><div class="stats-value">{{ getTotalAttemps() }}</div>
        <div class="stats-name">Total duration: </div><div class="stats-value">{{ getTotalDuration() }}</div>
      </div>
    </div>
    <div class="col-2-of-3">
      <h2>History</h2>
      <div class="completed-lessons-table shadow">
        <div class="completed-lessons-table-row">
          <div class="completed-lessons-table-header">Name</div>
          <div class="completed-lessons-table-header">Duration</div>
          <div class="completed-lessons-table-header">Attempts</div>
          <div class="completed-lessons-table-header">Date</div>
          <div class="completed-lessons-table-header">Difficulty</div>
        </div>
        <div class="completed-lessons-table-row" v-for="lesson in completedLessons">
          <div class="completed-lessons-table-col">{{ getName(lesson) }}</div>
          <div class="completed-lessons-table-col">{{ getDuration(lesson) }}</div>
          <div class="completed-lessons-table-col">{{ lesson.attempts }}</div>
          <div class="completed-lessons-table-col">{{ getDate(lesson) }}</div>
          <div class="completed-lessons-table-col">{{ lesson.difficulty }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import categories from './pixi/lessons.js';
  export default {
    data () {
      return {
        completedLessons: [],
        lessons: [],
        category: {}
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
      getName(lesson) {
        var words = lesson.lessonId.split('-');
        for (let i in words) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(' ');
      },
      getDuration(lesson) {
        let duration = lesson.duration/1000;
        if (duration >= 60) {
          return Math.floor(duration/60)+"m " + Math.floor(duration%60)+"s";
        } else {
          return Math.floor(duration%60)+"s";
        }
      },
      getDate(lesson) {
        let date = new Date(lesson.createdAt);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      },
      getTotalAttemps() {
        let attempts = 0;
        for (let completedLesson of this.completedLessons) {
          attempts += completedLesson.attempts;
        }
        return attempts;
      },
      getTotalDuration() {
        let duration = 0;
        for (let completedLesson of this.completedLessons) {
          duration += completedLesson.duration;
        }
        duration = duration/1000;
        if (duration >= 60) {
          return Math.floor(duration/60)+"m " + Math.floor(duration%60)+"s";
        } else {
          return Math.floor(duration%60)+"s";
        }
      }
    },
    created(){
    },
    async mounted() {
      console.log(categories)
      for (let category of categories) {
        if (category.id === this.$router.currentRoute.params.id) {
          this.lessons = category.lessons;
          this.category = category;
        }
      }
      this.completedLessons = await this.$store.dispatch('getCompletedLessons', {
        userId: this.user.id,
        categoryId: this.$router.currentRoute.params.id,
      });
    }
  }
</script>

<style>
</style>
