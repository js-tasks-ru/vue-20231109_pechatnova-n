import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Добавим ключ для прогресса в роутере
export const PROGRESS_ROUTER_ID = Symbol('PROGRESS_ROUTER_ID');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  // Функция создания контейнера для монтирования, если он не передан явно
  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  // Монтируем прогресс бар в контейнер
  const instance = createApp(TheTopProgressBar).mount(container ?? addDefaultContainer());

  // Если передан роутер, интегрируем с гардами и обработчиком ошибок роутера
  if (router) {
    router.beforeEach(() => {
      progress.start(PROGRESS_ROUTER_ID);
    });
    router.afterEach(() => {
      progress.finish(PROGRESS_ROUTER_ID);
    });
    router.onError(() => {
      progress.fail();
    });
  }

  // Создаём объект с методами управление прогрессом + методом установки Vue плагина
  const progress = {
    start: instance.start,
    finish: instance.finish,
    fail: instance.fail,

    /** @implements {import('@vue/runtime-core').PluginInstallFunction} */
    install(app) {
      // В плагине требуется только провайдить объект
      app.provide(PROGRESS_KEY, progress);
    },
  };

  return progress;
}
