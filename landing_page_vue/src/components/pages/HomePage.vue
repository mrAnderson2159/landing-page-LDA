<template>
  <HomePageBody />
  <HomePageFooter />
</template>

<script>
import HomePageBody from "../layout/HomePage/HomePageBody.vue";
import HomePageFooter from "../layout/HomePage/HomePageFooter.vue";

import { TheInstructionsMessage } from "../../utilities/classes";

export default {
  components: {
    HomePageBody,
    HomePageFooter,
  },
  mounted() {},
  inject: ["env", "textValue"],
  data() {
    return {};
  },
  methods: {
    mainBackground() {
      const env = this.env();
      if (env === "DEVELOPMENT") return "src/assets/images/main_background.png";
      else if (env === "PRODUCTION") return "static/images/main_background.png";
    },
  },
  provide() {
    return {
      presentation: {
        title: this.textValue("homepageTitle"),
        subtitle: this.textValue("homePageSubtitle"),
        submit: this.textValue("homePageSubmit"),
      },
      messages: [
        new TheInstructionsMessage(
          this.textValue("homePageInstruction1title"),
          this.textValue("homePageInstruction1message")
        ),
        new TheInstructionsMessage(
          this.textValue("homePageInstruction2title"),
          this.textValue("homePageInstruction2message")
        ),
        new TheInstructionsMessage(
          this.textValue("homePageInstruction3title"),
          this.textValue("homePageInstruction3message")
        ),
      ],
      mainBackground: this.mainBackground(),
    };
  },
};
</script>

<style lang="scss"></style>
