<template>
    <div class="container">
        <span class="d-flex gap-2 justify-content-between">
            <button @click="this.$router.push(`/quiz/${this.questionnaire_id}`)"
                class="btn btn-secondary">Retour</button>
            <h2>Ajouter une question</h2>
        </span>
        <form>
            <div class="form-group mb-3">
                <label for="title">Titre</label>
                <input type="text" class="form-control" id="title" v-model="title">
            </div>
            <div class="form-group mb-3">
                <label>Type de question</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="unique" value="unique" v-model="questionType">
                    <label class="form-check-label" for="unique">Unique</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="multiple" value="multiple" v-model="questionType">
                    <label class="form-check-label" for="multiple">Multiple</label>
                </div>
            </div>
            <div class="form-group mb-3" v-if="questionType === 'multiple'">
                <label for="prop1">Proposition 1</label>
                <input type="text" class="form-control" id="prop1" v-model="prop1">
                <label for="prop2">Proposition 2</label>
                <input type="text" class="form-control" id="prop2" v-model="prop2">
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="reponse1" value="1" v-model="reponse">
                    <label class="form-check-label" for="reponse1">Proposition 1</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="reponse2" value="2" v-model="reponse">
                    <label class="form-check-label" for="reponse2">Proposition 2</label>
                </div>
            </div>
            <div class="form-group mb-3" v-if="questionType === 'unique'">
                <label for="reponse">Réponse</label>
                <input type="text" class="form-control" id="reponse" v-model="reponse">
            </div>
            <button type="button" @click="addQuestion" class="btn btn-primary">Ajouter</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            questionType: null,
            prop1: null,
            prop2: null,
            title: null,
            reponse: null,
            questionnaire_id: null
        }
    },
    mounted() {
        this.questionnaire_id = this.$route.params.id;
    },
    methods: {
        addQuestion() {
            const question = {
                title: this.title,
                questionType: this.questionType,
                questionnaire_id: this.questionnaire_id,
                reponse: this.reponse,
                prop1: this.prop1,
                prop2: this.prop2
            };

            axios.post(`http://localhost:5000/quiz/api/questions`, question)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Add Success');
                        this.$router.push(`/quiz/${this.questionnaire_id}`);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>