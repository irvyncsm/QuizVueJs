import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import {createMemoryHistory, createRouter, } from 'vue-router';
import ListingQuiz from './components/ListingQuiz.vue';
import ListingQuestions from './components/ListingQuestions.vue';
import InfosQuestion from './components/InfosQuestion.vue';
import AjouterQuestion from './components/AjouterQuestion.vue';

const routes = [
  { path: '/', component: ListingQuiz },
  { path: '/quiz/:id', component: ListingQuestions },
  { path: '/question/:id', component: InfosQuestion },
  { path: '/ajouterQuestion/:id', component: AjouterQuestion },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
    .use(router)
    .mount('#app')
