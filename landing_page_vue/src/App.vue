<template>
  <the-header></the-header>
  <the-body></the-body>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheBody from './components/layout/TheBody.vue'
import TheFooter from './components/layout/TheFooter.vue'

export default {
  components: {
    TheHeader, 
    TheBody, 
    TheFooter
  },
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style scoped></style>