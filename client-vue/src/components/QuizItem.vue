<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';

export default {
    props: {
        quiz: Object,
    },
    data() {
        return {
            editing: false
        }
    },
    methods: {
        suppr: function () {
            axios.delete(`http://localhost:5000/quiz/api/questionnaires/${this.quiz.id}`)
                .then(response => {
                    console.log(response);
                    this.$emit('remove', { id: this.quiz.id });
                })
                .catch(error => {
                    console.error(error);
                });
        },
        edit: function () {
            this.$emit('edit', { id: this.quiz.id });
        },
        toggleEdit: function () {
            this.editing = !this.editing;
        },
        save: function () {
            // Code pour sauvegarder les modifications
            axios.put(`http://localhost:5000/quiz/api/questionnaires/${this.quiz.id}`, this.quiz)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Save Success');
                        this.toggleEdit();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    emits: ['remove', 'edit']
}

</script>

<template>
    <div>
        <div class="d-flex gap-2 align-items-center">
            <router-link v-if="!editing" :to="`/quiz/${quiz.id}`">{{ quiz.name }}</router-link>
            <input v-else type="text" v-model="quiz.name" class="form-control">
            <input type="button" @click="suppr" value="Supprimer" class="btn-supprimer">
            <input type="button" @click="toggleEdit" :value="editing ? 'Annuler' : 'Editer'" class="btn"
                :class="!editing ? 'btn-primary' : 'btn-secondary'">
            <input v-if="editing" type="button" @click="save" value="Sauvegarder" class="btn btn-primary">
        </div>
    </div>
</template>