<template>
  <div class="sample container">
    <h2>Boolean</h2>
    <p>
      <UiCheckbox v-model="checked" name="boolean-example"> Checked ({{ checked }})</UiCheckbox>
    </p>
    <p><button @click="checked = !checked">Update Bool</button></p>

    <h2>Array</h2>
    <p>Checked Array: {{ checkedArray }}</p>
    <p><UiCheckbox v-model="checkedArray" value="A" name="array-example">Check A</UiCheckbox></p>
    <p><UiCheckbox v-model="checkedArray" value="B" name="array-example">Check B</UiCheckbox></p>
    <p><UiCheckbox v-model="checkedArray" value="C" name="array-example">Check C</UiCheckbox></p>
    <p>
      <button @click="!checkedArray.includes('A') ? checkedArray.push('A') : checkedArray.pop()">Update Array</button>
    </p>

    <h2>Set</h2>
    <p>Checked Set: {{ checkedSet }}</p>
    <p><UiCheckbox v-model="checkedSet" value="A" name="set-example">Check A</UiCheckbox></p>
    <p><UiCheckbox v-model="checkedSet" value="B" name="set-example">Check B</UiCheckbox></p>
    <p><UiCheckbox v-model="checkedSet" value="C" name="set-example">Check C</UiCheckbox></p>
    <p><button @click="!checkedSet.has('A') ? checkedSet.add('A') : checkedSet.delete('A')">Toggle A in Set</button></p>
  </div>
</template>

<script>
import UiCheckbox from './components/UiCheckbox.vue';

export default {
  name: 'App',
  components: { UiCheckbox },

  data() {
    return {
      checked: false,
      checkedArray: [],
      checkedSet: new Set(),
    };
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
