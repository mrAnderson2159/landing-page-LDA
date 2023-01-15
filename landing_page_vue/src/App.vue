<template>
  <component :is="currentPage" v-bind="componentProps" />
  <!-- Aggiungere il collegamento whatsapp come su questo sito 
  https://emiratesvisa.com/ -->
  <the-whatsapp-button number="393394505775" />
</template>

<script>
import HomePage from "./components/pages/HomePage.vue";
import CarSelectionPage from "./components/pages/CarSelectionPage.vue";
import FeedbackPage from "./components/pages/FeedbackPage.vue";
import TheWhatsappButton from "./components/layout/All/TheWhatsappButton.vue";
import { urlServer } from "./utilities/hashing";

import axios from "axios";

export default {
  components: {
    HomePage,
    CarSelectionPage,
    FeedbackPage,
    TheWhatsappButton,
  },
  data() {
    return {
      currentPage: "HomePage",
      componentProps: null,
      localhost: "http://15.188.51.48/",
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
      // utilizzato in CarSelectionPageForm
      const formUrl = urlServer(this.localhost, "form");
      console.log(formUrl);
      return new Promise((resolve, reject) => {
        const response = axios.post(formUrl, request);
        response.then((result) => resolve(result)).catch((error) => reject(error));
      });
    },
    env() {
      if (/5173/.test(window.location.href)) return "DEVELOPMENT";
      else return "PRODUCTION";
    },
  },
  provide() {
    return {
      toggleHomePage: this.togglePage("HomePage"),
      toggleCarSelectionPage: this.togglePage("CarSelectionPage"),
      toggleFeedbackPage: this.toggleFeedbackPage,
      postRequest: this.postRequest,
      env: this.env,
      localhost: this.localhost,
      showHeader: true,
    };
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
