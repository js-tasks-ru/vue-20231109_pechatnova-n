<template>
  <div class="sample container">
    <p style="display: flex; justify-content: space-between">
      <UiButton variant="primary">Primary Button</UiButton>
      <UiButton variant="secondary">Secondary Button</UiButton>
      <UiButton variant="danger">Danger Button</UiButton>
    </p>
    <p>
      <UiButton @click="clicked">Click Me</UiButton>
    </p>
    <p>
      <UiButton block>Block</UiButton>
    </p>
    <p>
      <UiButton tag="a" href="#">Button Link</UiButton>
    </p>
    <p>
      <UiButton tag="router-link" to="/">Button RouterLink</UiButton>
    </p>
  </div>
</template>

<script>
import UiButton from './components/UiButton.vue';

export default {
  name: 'App',
  components: { UiButton },
  methods: {
    clicked() {
      alert('Clicked');
    },
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
