import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory('/'),  // Reemplaza con la URL base si es necesario
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    }
  ]
});



export default router;
