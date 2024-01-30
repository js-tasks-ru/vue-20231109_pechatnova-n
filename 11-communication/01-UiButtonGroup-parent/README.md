# UiButtonGroup через $parent

В задаче требуется реализовать два компонента - контейнер группы **UiButtonGroup** и кнопки содержимого
**UiButtonGroupItem**.

В простейшей реализации от **UiButtonGroup** вообще ничего не требуется, кроме добавления слота. Но можно добавить
вычисляемое свойство и метод для инкапсуляции доступа к модели компонента, а также `expose` для ограничения публичных
свойств.

```html
<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'UiButtonGroup',

    props: {
      modelValue: {
        required: true,
      },
    },

    emits: ['update:modelValue'],

    expose: ['activeValue', 'updateActiveValue'],

    computed: {
      activeValue() {
        return this.modelValue;
      },
    },

    methods: {
      updateActiveValue(value) {
        this.$emit('update:modelValue', value);
      },
    },
  };
</script>
```

Второй компонент чуть интереснее. В нём требуется брать данные о текущем выбранном значении и менять значение через
свойства и методы родителя.

Для проверки родителя можно добавить `beforeCreate` со сверкой имён.

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
  import UiButtonGroup from './UiButtonGroup.vue';

  export default {
    name: 'UiButtonGroupItem',

    props: {
      value: {
        required: true,
      },
    },

    computed: {
      isActive() {
        return this.$parent.activeValue === this.value;
      },
    },

    beforeCreate() {
      if (this.$parent.$options.name !== UiButtonGroup.name) {
        console.warn(`${this.$options.name} must be used as direct child content of ${UiButtonGroup.name}`);
      }
    },

    methods: {
      activate() {
        this.$parent.updateActiveValue(this.value);
      },
    },
  };
</script>
```
