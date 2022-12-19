<template>
  <div class="row main-text-container text-light position-relative">
    <div class="main-text col-md-6">
      <h1 class="title display-1">{{ title }}</h1>
      <p class="subtitle lead fs-3 text-secondary col-md-6">{{ subtitle }}</p>
      <div class="d-grid gap-2 col-3 mt-5 submit-container">
        <button
          type="submit"
          class="btn btn-warning text-nowrap submit"
          @click="sendRequest"
        >
          {{ submit }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { requiredString, notRequiredCssUnit } from "../../utilities/props";

export default {
  inject: ["ç_height"],
  created() {},
  data() {
    return {};
  },
  props: {
    title: requiredString,
    subtitle: requiredString,
    submit: requiredString,
    height: notRequiredCssUnit,
    mode: {
      ...requiredString,
      validator(value) {
        return ["body", "footer"].includes(value);
      },
    },
  },
  methods: {
    async sendRequest() {
      const request = {
        data: "hi there, server!",
      };

      try {
        const response = await axios.post(
          "http://localhost:8000/form/",
          request
        );
        // Append the returned data to the tasks array
        console.log(
          `POST request ${JSON.stringify(
            request
          )} sent to the server with answer ${JSON.stringify(response.data)}`
        );
      } catch (error) {
        // Log the error
        console.log(
          `POST request "${JSON.stringify(
            request
          )}" sent to the server with error ${error}`
        );
      }
    },
  },
  computed: {
    rightHeight() {
      return this.height || this.ç_height;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-text-container {
  height: v-bind(rightHeight);
  z-index: 4;

  & .main-text {
    // border: 1px solid red;
    height: 60%;
    margin: auto 10%; // percentage($phi / 10)

    & .title {
      font-family: "Mukta", sans-serif;
      text-transform: uppercase;
    }
  }
}
</style>
