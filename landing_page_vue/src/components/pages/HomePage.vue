<template>
  <div v-if="mainBackground">
    <HomePageBody />
    <HomePageFooter />
  </div>
</template>

<script>
import HomePageBody from "../layout/HomePage/HomePageBody.vue";
import HomePageFooter from "../layout/HomePage/HomePageFooter.vue";

import { TheInstructionsMessage } from "../../utilities/classes";
import { urlServer } from "../../utilities/hashing";
import axios from "axios";

export default {
  components: {
    HomePageBody,
    HomePageFooter,
  },
  created() {
    this.getMainBackground();
  },
  inject: ["env", "textValue", "localhost"],
  data() {
    return {
      mainBackground: null,
    };
  },
  methods: {
    async getMainBackground() {
      const env = this.env();
      let url = "";
      if (env === "DEVELOPMENT") {
        url = urlServer("http://127.0.0.1:9000", "main_background");
        this.mainBackground = [
          "src/assets/images/background-carousel/4.png",
          "src/assets/images/background-carousel/1.png",
          "src/assets/images/background-carousel/2.png",
          "src/assets/images/background-carousel/3.png",
          "src/assets/images/background-carousel/5.png",
        ];
        return;
      } else if (env === "PRODUCTION") url = urlServer(this.localhost, "main_background");
      const res = await axios(url);
      const background = res.data.mainBackground;
      this.mainBackground = background;
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
      mainBackground: () => this.mainBackground,
    };
  },
};
</script>

<style lang="scss"></style>
