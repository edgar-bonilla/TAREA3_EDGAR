import { createRouter, createWebHistory } from 'vue-router';
import Books from '../views/AppBooks.vue';
import Authors from '../views/AppAuthors.vue';
import Publishers from '../views/AppPublishers.vue';

const routes = [
  { path: '/', redirect: '/books' },
  { path: '/books', component: Books },
  { path: '/authors', component: Authors },
  { path: '/publishers', component: Publishers },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
