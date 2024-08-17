import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);

axios.defaults.baseURL = 'https://api.example.com/';
axios.defaults.headers.common['Authorization'] = 'Bearer YOUR_TOKEN';
app.config.globalProperties.$http = axios;

app.use(createPinia());

app.use(router); 

app.mount('#app');
