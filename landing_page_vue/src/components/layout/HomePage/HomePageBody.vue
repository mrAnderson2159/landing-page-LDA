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
          },
          instructions: {
            messages: this.messages,
            breakpoint: "lg",
            divClasses: "lead p-5 text-center",
          },
        },
        notMobile: {
          height: "76vh",
          image: {
            bgImage: this.mainBackground(),
            imgMinWidth: "1400px",
          },
          shape: {
            width: "73vw",
            color: "rgba(0, 0, 0, .575)",
            inclination: "-9deg",
            transformOrigin: "top right",
          },
          presentation: {
            ...this.presentation,
            mode: "body-not-mobile",
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
    resize(event) {
      const window = event.target;
      this.settings.global.window.innerWidth = window.innerWidth;
      this.settings.global.window.innerHeight = window.innerHeight;
    },
    getHeight() {
      const breakpoints = this.settings.global.breakpoints;
      const selectedBreakpoint = this.settings.global.selectedBreakpoint;
      const breakpoint = breakpoints[selectedBreakpoint];
      const windowWidth = this.settings.global.window.width;

      // console.log({ breakpoints, selectedBreakpoint, breakpoint, windowWidth });

      if (windowWidth > breakpoint) return this.settings.notMobile.height;
      else return this.settings.mobile.height;
    },
  },
  provide() {
    return {
      ç_height: this.getHeight(),
    };
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
  // width: 90%;
  // margin: 0 auto;
  border-bottom-left-radius: 4rem 2rem;
  border-bottom-right-radius: 4rem 2rem;
  overflow: hidden;

  // & div {
  //   margin-top: 3%;
  // }
}

#mobile-body-container {
  // min-height: 75vh !important;
  background-color: #ccc;
}
</style>
