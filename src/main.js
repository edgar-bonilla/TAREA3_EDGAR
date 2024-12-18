import { createApp } from 'vue';
import App from './App.vue';
import router from '../router/index';
import 'bootstrap/dist/css/bootstrap.min.css';
const app = createApp(App);


app.config.globalProperties.$url = 'http://localhost:8888';

app.use(router).mount('#app');
