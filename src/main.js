import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);

app.config.globalProperties.$axios = axios; // Configura Axios globalmente

window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8000/api';
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
window.axios.defaults.headers.common['X-Requested-with'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;


app.use(createPinia());
app.use(router);

app.mount('#app');
