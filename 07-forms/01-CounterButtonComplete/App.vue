<template>
  <div id="app" class="sample container">
    <p><CounterButton v-model:count="count" /> - count = {{ count }}</p>
    <p><CounterButton /> - независимый счётчик</p>
  </div>
</template>

<script>
import CounterButton from './components/CounterButton.vue';

export default {
  name: 'App',
  components: { CounterButton },
  data() {
    return {
      count: 1,
    };
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
