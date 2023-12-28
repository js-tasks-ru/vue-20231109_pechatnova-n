# UiTabsLink

С параметром
[`exactActiveClass`](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-exactActiveClass) решение
задачи получается не сложным.

```html
<template>
  <RouterLink :to="to" class="tabs__tab" role="tab" exact-active-class="tabs__tab_active">
    <slot />
  </RouterLink>
</template>

<script>
  export default {
    name: 'UiTabsLink',

    props: {
      to: {
        type: [String, Object],
        default: '#',
      },
    },
  };
</script>
```
