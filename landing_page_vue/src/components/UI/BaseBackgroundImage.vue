<template>
  <!-- position-fixed -->
  <div class="bg-image" :style="commonStyle" :class="getMode">
    <div
      id="mycarousel"
      class="carousel slide carousel-fade"
      data-bs-ride="carousel"
      ref="mycarousel"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(image, i) in bgImage"
          :key="image"
          :class="i == 0 ? 'active' : ''"
        >
          <img :src="image" class="d-block w-100" alt="..." />
        </div>
      </div>
    </div>
    <!-- position-absolute -->
    <!-- <img :src="bgImage[0]" :style="imgStyle" /> -->
  </div>
</template>

<script>
import bootstrapMin from "bootstrap/dist/js/bootstrap.min";
import {
  notRequiredCssUnit,
  notRequiredString,
  requiredArrayOfStrings,
  requiredString,
} from "../../utilities/props";

export default {
  inject: [],
  props: {
    imgMinWidth: notRequiredCssUnit,
    height: requiredString,
    bgImage: requiredArrayOfStrings,
    mode: {
      ...notRequiredString,
      validator(value) {
        return ["", "relative", "absolute", "nopos"].includes(value);
      },
    },
  },
  computed: {
    getMode() {
      switch (this.mode) {
        case "relative":
        case "":
          return "position-relative";
        case "absolute":
          return "position-absolute";
        case "nopos":
          return "";
      }
      return "";
    },
    commonStyle() {
      return {
        height: this.height,
        width: "100%",
      };
    },
    imgStyle() {
      return {
        ...this.commonStyle,
      };
    },
  },
  mounted() {
    const mycarousel = this.$refs.mycarousel;
    const carousel = new bootstrap.Carousel(mycarousel, {
      interval: 10000,
    });
  },
};
</script>

<style lang="scss" scoped>
.bg-image {
  overflow: hidden;

  & img {
    margin: auto 0;
  }
}
</style>
