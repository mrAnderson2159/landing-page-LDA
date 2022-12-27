<template>
  <div
    v-if="mode === 'body'"
    class="row main-text-container text-light position-relative"
  >
    <div class="main-text col-md-6">
      <h1 class="title display-1">{{ title }}</h1>
      <p class="subtitle lead fs-3 text-secondary col-md-6">{{ subtitle }}</p>
      <div class="d-grid gap-2 col-3 mt-5 submit-container">
        <button
          type="submit"
          class="btn btn-warning text-nowrap submit"
          @click="submitAction"
        >
          {{ submit }}
        </button>
      </div>
    </div>
  </div>
  <div
    v-else-if="mode === 'footer'"
    class="row main-text-container text-light position-relative footer ms-5"
  >
    <div class="col">
      <h1 class="title display-6">{{ title }}</h1>
      <p class="subtitle lead fs-5 text-secondary col-md-6">{{ subtitle }}</p>
    </div>
    <div class="col btn-container">
      <button
        type="submit"
        class="btn btn-warning text-nowrap submit"
        @click="submitAction"
      >
        {{ submit }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { requiredString, notRequiredCssUnit } from "../../utilities/props";

export default {
  inject: ["ç_height", "toggleCarSelectionPage"],
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
    submitAction() {
      this.toggleCarSelectionPage();
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
$height: v-bind(rightHeight);

.main-text-container {
  height: $height;
  z-index: 4;
  bottom: $height;

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

.footer {
  width: 60%;
  padding-top: 8%;
}

.btn-container {
  display: flex;
  align-items: center;

  & button {
    margin: 0 auto;
  }
}

.title,
.subtitle {
  &:hover {
    cursor: default;
  }
}
</style>
