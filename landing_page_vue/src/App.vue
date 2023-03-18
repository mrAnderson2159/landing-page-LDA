<template>
  <div v-if="textLayout">
    <component :is="currentPage" v-bind="componentProps" />
    <the-whatsapp-button :number="phoneNumber" />
  </div>
</template>

<script>
// testing update-lda command
import "bootstrap/dist/js/bootstrap.min.js";

import HomePage from "./components/pages/HomePage.vue"; // DOCUMENTING
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
  created() {
    // Scroll the window to the top
    window.scrollTo({ top: 0 });
    // Query the server about all text layouts
    this.getTextLayout();
  },
  data() {
    return {
      // the current toggled component
      currentPage: "CarSelectionPage",
      // the properties to be passed to currentPage
      componentProps: null,
      /**
       * once loaded it contains all the text layouts for the vue app
       * @type {Object.<string, {value: string, label: string, url: string}>}
       */
      textLayout: null,
    };
  },
  computed: {
    /**
     * Gets the whatsapp phone number from text layout
     * @returns {string} The phone number neither with "+" at beginning nor spaces in between
     */
    phoneNumber() {
      return this.textLayout.whatsappPhoneNumber.value;
    },
  },
  methods: {
    /**
     * Returns a closure which allows to toggle the currentPage to the page param
     * @param {string} page The camelCased vue-component-style name of the page
     * @returns {Function} The toggle function
     */
    togglePage(page) {
      return () => {
        this.componentProps = null;
        this.currentPage = page;
      };
    },
    /**
     * Toggles to the FeedbackPage passing the fulfillment status
     * @param {string} fulfillment Used to load dinamically the FeedbackPage, should be SUCCESS or FAILURE
     */
    toggleFeedbackPage(fulfillment) {
      this.componentProps = {
        fulfillment,
      };
      this.currentPage = "FeedbackPage";
    },
    /**
     * Gets the url of the encrypted request according server's hashing, then sends a post
     * request and returns a promise which resolves on the server's response
     * @param {string} request The decripted name of the enquired page
     * @returns {PromiseLike<object>} resolves with the data returned by the server on the enquired page
     */
    postRequest(request) {
      const formUrl = urlServer(this.localhost(), "form");
      return new Promise((resolve, reject) => {
        const response = axios.post(formUrl, request);
        response
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      });
    },
    /**
     * It's used to distinguish if the application has been launched in dev mode (% npm run dev)
     * or if it has been loaded from the sever (like % python3 manage.py runserver)
     * @returns {string} DEVELOPMENT | PRODUCTION
     */
    env() {
      if (/5173/.test(window.location.href)) return "DEVELOPMENT";
      else return "PRODUCTION";
    },
    /**
     * When the app is loaded from the server, it returns the address of the localhost.
     * IMPORTANT!!! - The second returned value must equal the server address
     * @returns {string} http://localhost:9000 | http://15.188.51.48/
     */
    localhost() {
      return this.env() === "DEVELOPMENT"
        ? "http://localhost:9000"
        : "http://52.47.84.178/";
    },
    /**
     * Queries the server about the text layout then stores it in an object
     */
    async getTextLayout() {
      const text = await axios(urlServer(this.localhost(), "text_layout"));
      this.textLayout = JSON.parse(text.data);
    },
  },
  provide() {
    return {
      toggleHomePage: this.togglePage("HomePage"),
      toggleCarSelectionPage: this.togglePage("CarSelectionPage"),
      toggleFeedbackPage: this.toggleFeedbackPage,
      postRequest: this.postRequest,
      env: this.env,
      localhost: this.localhost(),
      showHeader: true,
      delay: (ms) => new Promise((res) => setTimeout(res, ms)),
      textValue: (field) => this.textLayout[field].value,
      text: (field) => this.textLayout[field],
    };
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
