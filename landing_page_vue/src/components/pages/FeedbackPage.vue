<template>
  <the-header v-if="showHeader" />
  <p
    class="lead text-center display-6 pt-5 mt-5"
    v-for="message in messages"
    :key="message"
  >
    {{ message }}
  </p>
</template>

<script>
import TheHeader from "../layout/All/TheHeader.vue";
import { requiredString } from "../../utilities/props";

export default {
  components: {
    TheHeader,
  },
  inject: ["showHeader", "textValue"],
  created() {
    window.scrollTo({ top: 0 });
  },
  data() {
    return {
      thanksMessages: [
        this.textValue("feedbackPageThankMessage1"),
        this.textValue("feedbackPageThankMessage2"),
        this.textValue("feedbackPageThankMessage3"),
      ],
      failureMessages: [
        this.textValue("feedbackPageFailureMessage1"),
        this.textValue("feedbackPageFailureMessage2"),
        this.textValue("feedbackPageFailureMessage3"),
      ],
    };
  },
  computed: {
    messages() {
      switch (this.fulfillment) {
        case "SUCCESS":
          return this.thanksMessages;
        case "FAILURE":
          return this.failureMessages;
      }
      throw Error(`Invalid fullfilment: ${this.fulfillment}`);
    },
  },
  props: {
    fulfillment: {
      ...requiredString,
      validator(value) {
        return ["SUCCESS", "FAILURE"].includes(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
