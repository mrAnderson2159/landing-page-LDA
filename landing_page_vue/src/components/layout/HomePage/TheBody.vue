<template>
  <div
    class="container-fluid p-0 not-mobile position-relative"
    :style="{ height: ç_height }"
  >
    <base-background-image :bg-image="bgImage" img-min-width="1400px" />
    <base-background-shape
      width="73vw"
      :opacity="0.75"
      inclination="-9deg"
      transform-origin="top right"
    />
    <base-presentation v-bind="{ ...presentation, mode: 'body' }" />
  </div>
  <div class="container-lg not-mobile">
    <the-instructions
      :messages="messages"
      breakpoint="lg"
      div-classes="lead p-5"
    ></the-instructions>
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
  inject: ["presentation", "messages", "toggleCarSelectionPage"],
  created() {},
  data() {
    return {
      ç_height: "75vh",
    };
  },
  props: {},
  methods: {},
  computed: {
    bgImage() {
      return "src/assets/images/main_background.png";
    },
  },
  provide() {
    return {
      ç_height: this.ç_height,
    };
  },
};
</script>

<style lang="scss" scoped>
// @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Mukta:wght@200;300;400;500;600;700&display=swap");
</style>
