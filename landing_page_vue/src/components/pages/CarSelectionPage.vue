<template>
  <the-header v-if="showHeader" />
  <car-selection-page-body />
</template>

<script>
import TheHeader from "../layout/All/TheHeader.vue";
import CarSelectionPageBody from "../layout/CarSelectionPage/CarSelectionPageBody.vue";

export default {
  components: {
    TheHeader,
    CarSelectionPageBody,
  },
  inject: ["showHeader"],
  created() {
    window.scrollTo({ top: 0 });
  },
  data() {},
  provide() {
    return {
      leadMessage:
        "Scegli la macchina che preferisci quindi lascia un recapito per essere ricontattato",
    };
  },
};
</script>

<style lang="scss" scoped></style>
