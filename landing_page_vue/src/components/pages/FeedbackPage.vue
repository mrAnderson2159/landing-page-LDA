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
  inject: ["showHeader"],
  created() {
    window.scrollTo({ top: 0 });
  },
  data() {
    return {
      thanksMessages: [
        "Grazie per averci scelto",
        "Ti contatteremo entro 24H per un preventivo",
        "A presto!",
      ],
      failureMessages: [
        "Purtroppo qualcosa è andato storto",
        "Non siamo riusciti ad inoltrare la richiesta",
        "Ti preghiamo di riprovare più tardi",
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
