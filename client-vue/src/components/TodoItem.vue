<script>

export default {
    props: {
        todo: Object
    },
    methods :{
        suppr : function () {
            this.$emit('remove', {id: this.todo.id});
        },
        edit : function () {
            this.$emit('edit', {id: this.todo.id});
        }
    },
    emits: ['remove'],
    emits: ['edit']
}

</script>

<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <div class="checkbox" v-bind:class="{ 'alert alert-success':todo.checked }">
        <label>
            <input type="checkbox" v-model="todo.checked"> 
            {{ todo.text }}
            <input type="button" @click="suppr" value="Supprimer" class="btn-supprimer">
            <input type="button" @click="edit" value="Editer" class="btn-edit">
        </label>
    </div>
</template>
