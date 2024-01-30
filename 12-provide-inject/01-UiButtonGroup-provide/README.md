# UiButtonGroup через provide/inject

Решение незначительно отличается от аналогичной задаче в предыдущем разделе. Вместо указания свойств в `expose` их
требуется предоставить под каким-то именем в `provide`. А вместо получения через `$parent` - внедрить через `inject`.

Важно не забыть добавить реактивность в предоставляемые значения через `computed`.

```html
<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
  import { computed } from 'vue';

  // Имя предоставляемого значения лучше описывать через Symbol
  export const BUTTON_GROUP_KEY = Symbol('BUTTON_GROUP_KEY');

  export default {
    name: 'UiButtonGroup',

    provide() {
      return {
        // computed - для реактивности
        [BUTTON_GROUP_KEY]: computed(() => ({
          activeValue: this.modelValue,
          updateActiveValue: this.updateActiveValue,
        })),
      };
    },

    props: {
      modelValue: {
        required: true,
      },
    },

    emits: ['update:modelValue'],

    methods: {
      updateActiveValue(value) {
        this.$emit('update:modelValue', value);
      },
    },
  };
</script>
```

Второй компонент тоже изменился незначительно.

```html
<template>
  <button
    class="button-group__button"
    :class="{ 'button-group__button_active': isActive }"
    type="button"
    :aria-selected="isActive"
    @click.stop="activate"
  >
    <slot />
  </button>
</template>

<script>
  import UiButtonGroup, { BUTTON_GROUP_KEY } from './UiButtonGroup.vue';

  export default {
    name: 'UiButtonGroupItem',

    inject: {
      buttonGroup: BUTTON_GROUP_KEY,
    },

    props: {
      value: {
        required: true,
      },
    },

    computed: {
      isActive() {
        return this.buttonGroup.activeValue === this.value;
      },
    },

    created() {
      if (this.buttonGroup === undefined) {
        console.warn(`${this.$options.name} must be used as a descendant of ${UiButtonGroup.name}`);
      }
    },

    methods: {
      activate() {
        this.buttonGroup.updateActiveValue(this.value);
      },
    },
  };
</script>
```

Пока не вышел **Vue 3.3** для разворачивания внедряемых рефов нужно изменять конфигурацию приложения:

```js
// 📁 main.js
const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.mount('#app');
```
