<script>
import {RouterLink} from 'vue-router';
import axios from 'axios';

export default {
    props: {
        quiz: Object
    },
    methods :{
        suppr : function () {
            axios.delete(`http://localhost:5000/quiz/api/questionnaires/${this.quiz.id}`)
                .then(response => {
                    console.log(response);
                    this.$emit('remove', {id: this.quiz.id});
                })
                .catch(error => {
                    console.error(error);
                });
        },
        edit : function () {
            this.$emit('edit', {id: this.quiz.id});
        }
    },
    emits: ['remove', 'edit']
}

</script>

<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <div>
        <label>
            <router-link :to="`/quiz/${quiz.id}`">{{ quiz.name }}</router-link>
            <input type="button" @click="suppr" value="Supprimer" class="btn-supprimer">
            <input type="button" @click="edit" value="Editer" class="btn-edit">
        </label>
    </div>
</template>
