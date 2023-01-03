<template>
  <the-header v-if="showHeader" />
  <p
    class="lead text-center display-6 pt-5 mt-5"
    v-for="message in thanksMessages"
    :key="message"
  >
    {{ message }}
  </p>
</template>

<script>
import TheHeader from "../layout/All/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  inject: ["showHeader"],
  created() {
    window.scrollTo({ top: 0 });
  },
  data() {
    return {
      thanksMessages: [
        "Grazie per averci scelto.",
        "Ti contatteremo entro 24H per un preventivo.",
        "A presto!",
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
