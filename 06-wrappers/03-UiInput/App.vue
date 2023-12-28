<template>
  <div class="sample container">
    <button type="button" @click="$refs['firstInput'].focus()">Focus first input</button>
    <button type="button" @click="$refs['firstInput'].$refs['input'].focus()">Focus first input 2</button>

    <UiFormGroup>
      <UiInput ref="firstInput" v-model="value" />
    </UiFormGroup>

    <UiFormGroup label="Small">
      <UiInput v-model="value" small />
    </UiFormGroup>

    <UiFormGroup label="Rounded">
      <UiInput v-model="value" rounded />
    </UiFormGroup>

    <UiFormGroup label="Password">
      <UiInput v-model="value" type="password" />
    </UiFormGroup>

    <UiFormGroup label="Textarea">
      <UiInput v-model="value" multiline />
    </UiFormGroup>

    <UiFormGroup label="With Lazy">
      <UiInput v-model.lazy="value" />
    </UiFormGroup>

    <UiFormGroup>
      <label>
        <input v-model="showIcons" type="checkbox" />
        Toggle Icons
      </label>
    </UiFormGroup>

    <UiFormGroup label="With Icons">
      <UiInput v-model="value">
        <template v-if="showIcons" #left-icon>
          <UiIcon icon="search" />
        </template>

        <template v-if="showIcons" #right-icon>
          <UiIcon icon="check" />
        </template>
      </UiInput>
    </UiFormGroup>
  </div>
</template>

<script>
import UiInput from './components/UiInput.vue';
import UiIcon from './components/UiIcon.vue';
import UiFormGroup from './components/UiFormGroup.vue';

export default {
  name: 'App',

  components: { UiFormGroup, UiIcon, UiInput },

  data() {
    return {
      value: 'value',
      showIcons: true,
      focused: false,
    };
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
