<template>
  <component :is="currentPage" />
</template>

<script>
import HomePage from "./components/pages/HomePage.vue";
import CarSelectionPage from "./components/pages/CarSelectionPage.vue";
import ThanksgivingPage from "./components/pages/ThanksgivingPage.vue";

export default {
  components: {
    HomePage,
    CarSelectionPage,
    ThanksgivingPage,
  },
  data() {
    return {
      currentPage: "CarSelectionPage",
    };
  },
  methods: {
    togglePage(page) {
      return () => (this.currentPage = page);
    },
  },
  provide() {
    return {
      toggleHomePage: this.togglePage("HomePage"),
      toggleCarSelectionPage: this.togglePage("CarSelectionPage"),
      toggleThanksgivingPage: this.togglePage("ThanksgivingPage"),
    };
  },
  created() {},
};
</script>

<style lang="scss"></style>
