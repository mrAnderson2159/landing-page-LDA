<template>
  <component :is="currentPage" />
</template>

<script>
import HomePage from "./components/pages/HomePage.vue";
import CarSelectionPage from "./components/pages/CarSelectionPage.vue";
import ThanksgivingPage from "./components/pages/ThanksgivingPage.vue";
import axios from "axios";

export default {
  components: {
    HomePage,
    CarSelectionPage,
    ThanksgivingPage,
  },
  data() {
    return {
      currentPage: "HomePage",
      formAddress: "http://localhost:8000/form/",
    };
  },
  methods: {
    togglePage(page) {
      return () => (this.currentPage = page);
    },
    async postRequest(request) {
      try {
        const response = await axios.post(this.formAddress, request);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  provide() {
    return {
      toggleHomePage: this.togglePage("HomePage"),
      toggleCarSelectionPage: this.togglePage("CarSelectionPage"),
      toggleThanksgivingPage: this.togglePage("ThanksgivingPage"),
      postRequest: this.postRequest,
      showHeader: true,
    };
  },
};
</script>

<style lang="scss"></style>
