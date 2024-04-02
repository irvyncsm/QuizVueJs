<template>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center my-4">
            <button @click="this.$router.push('/')" class="btn btn-secondary">Retour</button>
            <h2>{{ nomQuestionnaire }}</h2>
        </div>
        <ul class="list-group">
            <router-link v-for="question in questions" :key="question.id" :to="`/question/${question.id}`"
                class="text-decoration-none">
                <li class="list-group-item mb-3 text-dark">
                    {{ question.title }}
                </li>
            </router-link>
        </ul>
    </div>
</template>

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
                if (response.status === 200) {
                    this.nomQuestionnaire = response.data.name;
                    this.questions = response.data.questions;
                    console.log(response.data)
                }
            }
            );
    },
}
</script>