import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createProgress } from './plugins/progress/index.js';

// Создаём прогресс
const progress = createProgress({ container: '#progress', router });
// Устанавливаем в приложение
createApp(App).use(router).use(progress).mount('#app');
