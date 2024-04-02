<script>
import QuizItem from './QuizItem.vue';
import axios from 'axios';

export default {
  data() {
    return {
      newQuizName: '',
      quizs: []
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:5000/quiz/api/questionnaires')
      .then(response => {
          if (response.status === 200){
              this.quizs = response.data;
              console.log(response.data)
          }
      }
      );
  },
  components: {
    QuizItem
  },
  methods: {
    addQuiz() {
      axios.post(`http://localhost:5000/quiz/api/questionnaires`, { name: this.newQuizName })
        .then(response => {
          console.log(response);
          this.quizs.push(response.data);
          this.newQuizName = '';
        })
        .catch(error => {
          console.error(error);
        });
    },
    removeQuiz(index) {
        this.quizs.splice(index, 1);
    },
    removeTask(task) {
      this.$emit('remove', task);
    },
    editTask(task) {
      this.$emit('edit', task);
    }
  },
  emits: ['remove'],
  emits: ['edit']
}
</script>

<template>
  <form @submit.prevent="addQuiz">
    <input type="text" v-model="newQuizName" placeholder="Nom du nouveau quiz">
    <button type="submit">Ajouter</button>
  </form>
  <ol>
    <li v-for="(quiz, index) in quizs" :key="quiz.id">
      <QuizItem :quiz="quiz" @remove="removeQuiz(index)" @edit="editTask" />
    </li>
  </ol>
</template>

