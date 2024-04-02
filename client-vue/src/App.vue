<script>

import QuizItem from './components/QuizItem.vue';
import { RouterView } from 'vue-router';

export default {
  components: {
    QuizItem,
    RouterView
  },
}

</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <div class="container">
    <h2>Mes Quizs</h2>
    <router-view />
  </div>
</template>