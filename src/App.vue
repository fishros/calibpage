<template>
  <home/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; 
import Home from './views/Home.vue';

export default defineComponent({
  components: { Home },
  name: 'App',
  setup() {
    return {

    };
  }
});
</script>

<style>
</style>