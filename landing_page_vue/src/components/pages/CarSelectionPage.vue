<template>
  <!-- provvisiorio -->
  <the-header />
  <!-- permanente -->
  <the-body />
</template>

<script>
import TheHeader from "../layout/CarSelectionPage/TheHeader.vue";
import TheBody from "../layout/CarSelectionPage/TheBody.vue";

export default {
  components: {
    TheHeader,
    TheBody,
  },
  created() {
    window.scrollTo({ top: 0 });
  },
  data() {
    return {
      leadMessage:
        "Scegli la macchina che preferisci quindi lascia un recapito per essere ricontattato",
    };
  },
  provide() {
    return {
      leadMessage: this.leadMessage,
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
