<template>
  <!-- Not Mobile -->
  <div
    class="container-fluid p-0 not-mobile position-relative"
    :style="{ height: settings.notMobile.height }"
  >
    <base-background-image v-bind="settings.notMobile.image" />
    <base-background-shape v-bind="settings.notMobile.shape" />
    <base-presentation v-bind="settings.notMobile.presentation" />
  </div>
  <div class="container-lg not-mobile">
    <the-instructions v-bind="settings.notMobile.instructions" />
  </div>

  <!-- Mobile -->
  <div class="container-fluid mobile p-0" id="mobile-body-container">
    <div id="image-container">
      <base-background-image id="image" v-bind="settings.mobile.image" />
    </div>
    <base-presentation v-bind="settings.mobile.presentation" />
  </div>
  <div class="mobile">
    <the-instructions v-bind="settings.mobile.instructions" />
  </div>
</template>

<script>
import BaseBackgroundImage from "../../UI/BaseBackgroundImage.vue";
import BaseBackgroundShape from "../../UI/BaseBackgroundShape.vue";
import BasePresentation from "../../UI/BasePresentation.vue";
import TheInstructions from "./TheInstructions.vue";

function getHeight() {
  const width = window.innerWidth;
  if (width > 1366) return "75vh";
  else return width * 0.5622254758418741 + "px";
}

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
        global: {
          selectedBreakpoint: "lg",
          window: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
          breakpoints: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400,
          },
        },
        mobile: {
          height: "40vh",
          image: {
            bgImage: this.mainBackground(),
            imgMinWidth: "550px",
          },
          presentation: {
            ...this.presentation,
            mode: "body-mobile",
            height: "40vh",
          },
          instructions: {
            messages: this.messages,
            breakpoint: "lg",
            divClasses: "lead p-5 text-center",
          },
        },
        notMobile: {
          height: getHeight(),
          image: {
            bgImage: this.mainBackground(),
            imgMinWidth: "1400px",
            height: getHeight(),
          },
          shape: {
            width: "73vw",
            height: getHeight(),
            color: "rgba(0, 0, 0, .75)",
            inclination: "-9deg",
            transformOrigin: "top right",
          },
          presentation: {
            ...this.presentation,
            mode: "body-not-mobile",
            height: getHeight(),
          },
          instructions: {
            messages: this.messages,
            breakpoint: "lg",
            divClasses: "lead p-5",
          },
        },
      },
    };
  },
  methods: {
    resize() {
      const height = getHeight();
      this.settings.notMobile.height = height;
      this.settings.notMobile.image.height = height;
      this.settings.notMobile.shape.height = height;
      this.settings.notMobile.presentation.height = height;
    },
  },
  mounted() {
    window.addEventListener("resize", this.resize);
  },
  unmounted() {
    window.removeEventListener("resize", this.resize);
  },
};
</script>

<style lang="scss" scoped>
#image-container {
  border-bottom-left-radius: 4rem 2rem;
  border-bottom-right-radius: 4rem 2rem;
  overflow: hidden;
}

#mobile-body-container {
  background-color: #ccc;
}
</style>
