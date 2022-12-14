<template>
  <button
    v-for="button in buttons"
    :key="button.id"
    type="button"
    class="btn nav-link me-5"
    @click="changeActiveBodyComponent(button.component)">
    {{button.text}}  
  </button>
</template>

<script>
import TheHeaderNavbarButton from './../../classes/layout/TheHeaderNavbarButton'

export default {
  data() {
    return {
      buttons: [
        new TheHeaderNavbarButton('features', 'Features'),
        new TheHeaderNavbarButton('pricing', 'Pricing'),
        new TheHeaderNavbarButton('about_us', 'About us')
      ]
    };
  },
  inject: ['changeActiveBodyComponent'],
};
</script>

<style lang="scss" scoped></style>