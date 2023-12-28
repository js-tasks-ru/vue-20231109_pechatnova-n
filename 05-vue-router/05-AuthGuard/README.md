# AuthGuard

Для реализации описанного поведения требуется глобальный гард роутера - функция, которая выполняется перед каждым
переходом, и определяет, разрешён ли переход на новый маршрут, а если нет - то куда требуется перейти.

```js
import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

/** @implements {import('vue-router').NavigationGuard} */
function authGuard(to) {
  // Гард принимает на вход следующий и предыдущий маршруты. Но нам нужен только следующий

  // Если маршрут требует авторизации, а пользователь не авторизован - переходим на страницу авторизации
  if (to.meta.requireAuth && !isAuthenticated()) {
    // В query параметр from передаём путь запрашиваемой страницы
    return { name: 'login', query: { from: to.fullPath } };
  }

  // Если маршрут требует отсутствия авторизации, а пользователь авторизован - переходим на главную страницу
  if (to.meta.requireGuest && isAuthenticated()) {
    return { name: 'index' };
  }

  // В остальных случаях разрешаем переход без ограничений
  return true;
}

const router = createRouter({
  // ...
});

// Используем beforeEach гард, чтобы проверять пользователя перед каждым переходом
router.beforeEach(authGuard);

export { router };
```
