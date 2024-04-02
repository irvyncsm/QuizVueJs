<template>
    <div class="container">
        <span class="d-flex gap-2">
            <button @click="this.$router.push(`/quiz/${this.questionnaire_id}`)" class="btn btn-secondary">Retour</button>
            <h2>Modifier la question</h2>
        </span>
        <form>
            <div class="form-group mb-3">
                <label for="title">Titre</label>
                <input type="text" class="form-control" id="title" v-model="title">
            </div>
            <div class="form-group mb-3" v-if="questionType === 'multiple'">
                <label for="prop1">Proposition 1</label>
                <input type="text" class="form-control" id="prop1" v-model="prop1">
                <label for="prop2">Proposition 2</label>
                <input type="text" class="form-control" id="prop2" v-model="prop2">
            </div>
            <div class="form-group mb-3">
                <label for="reponse">Réponse</label>
                <input type="text" class="form-control" id="reponse" v-model="reponse">
            </div>
            <!-- Ajouter un bouton supprimer et un bouton mettre à jour cote a cote -->
            <span class="d-flex gap-2">
                <button type="button" @click="updateQuestion" class="btn btn-primary">Mettre à jour</button>
                <button type="button" @click="deleteQuestion" class="btn btn-danger">Supprimer</button>
            </span>
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
            id: null,
            reponse: null,
            questionnaire_id: null
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:5000/quiz/api/questions/${this.id}`)
            .then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    this.title = data.title;
                    this.questionnaire_id = data.questionnaire_id;
                    this.questionType = data.questionType;
                    if (this.questionType === 'multiple') {
                        this.prop1 = data.prop1;
                        this.prop2 = data.prop2;
                        this.reponse = data.reponse;
                    }
                    else if (this.questionType === 'unique') {
                        this.reponse = data.reponse;
                    }
                }
            }
            );
    },
    methods: {
        updateQuestion() {
            // Code pour mettre à jour la question
        },
        deleteQuestion() {
            // Code pour supprimer la question
        }
    }
}
</script>