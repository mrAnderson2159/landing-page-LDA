<template>
  <div
    class="container-fluid p-0 not-mobile position-relative"
    :style="{ height: settings.height }"
  >
    <base-background-image v-bind="settings.image" />
    <base-background-shape v-bind="settings.shape" />
    <base-presentation v-bind="settings.presentation" />
  </div>
  <div class="container-lg not-mobile">
    <the-instructions v-bind="settings.instructions" />
  </div>
</template>

<script>
import BaseBackgroundImage from "../../UI/BaseBackgroundImage.vue";
import BaseBackgroundShape from "../../UI/BaseBackgroundShape.vue";
import BasePresentation from "../../UI/BasePresentation.vue";
import TheInstructions from "./TheInstructions.vue";

export default {
  components: {
    BaseBackgroundImage,
    BaseBackgroundShape,
    BasePresentation,
    TheInstructions,
  },
  inject: ["presentation", "messages", "mainBackground"],
  data() {
    return {
      settings: {
        height: "75vh",
        image: {
          bgImage: this.mainBackground,
          imgMinWidth: "1400px",
        },
        shape: {
          width: "73vw",
          opacity: "0.75",
          inclination: "-9deg",
          transformOrigin: "top right",
        },
        presentation: {
          ...this.presentation,
          mode: "body",
        },
        instructions: {
          messages: this.messages,
          breakpoint: "lg",
          divClasses: "lead p-5",
        },
      },
    };
  },
  provide() {
    return {
      ç_height: this.settings.height,
    };
  },
};
</script>

<style lang="scss" scoped></style>
