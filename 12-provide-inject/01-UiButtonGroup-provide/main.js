import '@/assets/styles/app.css';
import '@/assets/styles/taskbook.css';
import '@/assets/styles/_container.css';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.mount('#app');
