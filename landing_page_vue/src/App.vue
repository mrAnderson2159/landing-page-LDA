<template>
  <component :is="currentPage" v-bind="componentProps" />
</template>

<script>
import HomePage from "./components/pages/HomePage.vue";
import CarSelectionPage from "./components/pages/CarSelectionPage.vue";
import FeedbackPage from "./components/pages/FeedbackPage.vue";
import axios from "axios";

export default {
  components: {
    HomePage,
    CarSelectionPage,
    FeedbackPage,
  },
  data() {
    return {
      currentPage: "HomePage",
      formAddress: "http://localhost:8000/form/",
      componentProps: null,
    };
  },
  methods: {
    togglePage(page) {
      return () => {
        this.componentProps = null;
        this.currentPage = page;
      };
    },
    toggleFeedbackPage(fulfillment) {
      this.componentProps = { fulfillment };
      this.currentPage = "FeedbackPage";
    },
    postRequest(request) {
      return new Promise((resolve, reject) => {
        const response = axios.post(this.formAddress, request);
        response.then((result) => resolve(result)).catch((error) => reject(error));
      });
    },
  },
  provide() {
    return {
      toggleHomePage: this.togglePage("HomePage"),
      toggleCarSelectionPage: this.togglePage("CarSelectionPage"),
      toggleFeedbackPage: this.toggleFeedbackPage,
      postRequest: this.postRequest,
      showHeader: true,
    };
  },
};
</script>

<style lang="scss"></style>
