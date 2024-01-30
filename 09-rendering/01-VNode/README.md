# VNode

Технически задача очень простая. Главное понимать, что такое **vnode** и render-функция. Всё решение сводится к
рендерингу параметра компонента через render-функцию.

```javascript
import { isVNode } from 'vue';

export default {
  name: 'VNode',

  props: {
    vnode: {
      type: [Object, Array],
      require: true,
      validator: (value) => (Array.isArray(value) ? value.every((item) => isVNode(item)) : isVNode(value)),
    },
  },

  render() {
    return this.vnode;
  },
};
```
