# UiButton

Задача похожа на предыдущую. Чуть сложнее только в работе с классами и атрибутами.

Интереснее часть с установкой `type="button"` для кнопок без явно установленного `type`. По умолчанию любой переданный
атрибут `type` на `<UiButton>` будет унаследован кнопкой, включая атрибут `type`. Но нам требуется для него особая
обработка. Без переданного атрибута, должен всё равно явно устанавливаться `type="button"`. Для этого можно вычислять
тип в вычисляемом свойстве в зависимости от `tag` и того, передан ли какой-то `type`.

Хотя `type` можно достать из атрибутов `$attrs`, он становится фактически параметром компонента. От него персонально
зависит работа компонента. В этом случае лучше `type` явно описать, как параметр компонента, а не брать из атрибутов.
Это также поможет избежать проблем при миграции на Composition API из-за того, что `attrs` не реактивный.

```html
<template>
  <component :is="tag" class="button" :class="[variantClass, { button_block: block }]" :type="buttonType">
    <slot />
  </component>
</template>

<script>
  // Опишем отдельно соотношение между вариантами кнопок и классами.
  // Если бы вёрстка не была готовой, проще было бы делать классы эквивалентными вариантам,
  // но работаем с тем, что имеем.
  const buttonClasses = {
    primary: 'button_primary',
    secondary: 'button_secondary',
    danger: 'button_danger',
  };

  export default {
    name: 'UiButton',

    props: {
      tag: {
        type: [String, Object, Function],
        default: 'button',
      },

      block: {
        type: Boolean,
        default: false,
      },

      variant: {
        type: String,
        default: 'secondary',
        validator: (value) => Object.keys(buttonClasses).includes(value),
      },

      type: {
        type: String,
      },
    },

    computed: {
      variantClass() {
        return buttonClasses[this.variant];
      },

      buttonType() {
        // Значением параметра type делаем `button` по умолчанию для HTML кнопок
        if (this.tag === 'button') {
          return this.type ?? 'button';
        }
        return this.type;
      },
    },
  };
</script>
```
