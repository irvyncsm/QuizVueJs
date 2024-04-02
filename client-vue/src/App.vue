<script>

import QuizItem from './components/QuizItem.vue';
import axios from 'axios';
import { RouterView } from 'vue-router';

export default {
  data() {
    return {
      newQuizName: '',
    };
  },
  methods: {
    addQuiz() {
      axios.post(`http://localhost:5000/quiz/api/questionnaires`, { name: this.newQuizName })
        .then(response => {
          console.log(response);
          this.newQuizName = '';
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
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
    <form @submit.prevent="addQuiz">
      <input type="text" v-model="newQuizName" placeholder="Nom du nouveau quiz">
      <button type="submit">Ajouter</button>
    </form>
    <router-view />
  </div>
</template>