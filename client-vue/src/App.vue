<script>

import TodoItem from './components/TodoItem.vue';
let data = {
  todos: [
    { id: 0, text: 'Apprendre ES6', checked: true },
    { id: 1, text: 'Apprendre Vue', checked: false },
    { id: 2, text: 'Faire un projet magnifique', checked: false }
  ],
  title: 'Mes tâches',
  newItem: ''
};
let indice = data.todos.length;

export default {

  data() {
    return data;
  },
  methods: {
    addTask() {
      indice++;
      this.todos.push({ id: indice, text: this.newTaskText, checked: false });
      this.newTaskText = '';

    },
    removeItem({ id }) {
      console.log('removeItem', id);
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },
    editItem({ id }) {
      console.log('editItem', id);
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos[index].text = prompt('Modifier la tâche', this.todos[index].text);
      }
    }
  },
  components: {
    TodoItem
  }

}

</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <div class="container">
    <h2>{{ title }}</h2>
    <ol>
      <TodoItem v-for="todo in todos" :key="todo.text" :todo="todo" @remove="removeItem" @edit="editItem">
      </TodoItem>
    </ol>
    <div class="input-group">
      <input type="text" class="form-control" v-model="newTaskText" @keyup.enter="addTask">
      <button class="btn btn-outline-secondary " v-on:click="addTask">Ajouter</button>
    </div>
  </div>
</template>
