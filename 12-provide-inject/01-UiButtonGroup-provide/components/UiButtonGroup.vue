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

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
