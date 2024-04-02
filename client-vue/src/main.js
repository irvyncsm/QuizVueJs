import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import {createMemoryHistory, createRouter, } from 'vue-router';
import ListingQuiz from './components/ListingQuiz.vue';
import ListingQuestions from './components/ListingQuestions.vue';

const routes = [
  { path: '/', component: ListingQuiz },
  { path: '/quiz/:id', component: ListingQuestions }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
    .use(router)
    .mount('#app')
