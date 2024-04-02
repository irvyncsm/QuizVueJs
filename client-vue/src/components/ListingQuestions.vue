<script>
import axios from 'axios';

export default {
  data() {
    return {
      questions: [],
      nomQuestionnaire: null,
      id: null
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    axios.get(`http://127.0.0.1:5000/quiz/api/questionnaires/${this.id}`)
      .then(response => {
          if (response.status === 200){
              this.nomQuestionnaire = response.data.name;
              this.questions = response.data.questions;
              console.log(response.data)
          }
      }
      );
  },
}
</script>

<template>
  <ol>
    <span class="d-flex gap-2">
        <button @click="this.$router.push('/')" class="btn btn-secondary">Retour</button>
        <h2>{{ nomQuestionnaire }}</h2>
    </span>
    <li v-for="question in questions" :key="question.id">
      <router-link :to="`/question/${question.id}`">
        {{ question.title }}
      </router-link>
    </li>
  </ol>
</template>

