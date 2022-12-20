<template>
  <div class="bg-image" :style="commonStyle">
    <img :src="bgImage" class="" :style="imgStyle" />
  </div>
</template>

<script>
import {
  notRequiredCssUnit,
  requiredString,
  notRequiredString,
} from "../../utilities/props";

export default {
  inject: ["ç_height"],
  props: {
    imgMinWidth: notRequiredCssUnit,
    height: notRequiredString,
    bgImage: requiredString,
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
        height: this.height || this.ç_height,
        width: "100%",
      };
    },
    imgStyle() {
      return {
        ...this.commonStyle,
        minWidth: this.imgMinWidth,
      };
    },
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
