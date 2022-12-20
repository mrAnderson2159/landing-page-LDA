<template>
  <div class="position-absolute" :class="mode"></div>
</template>

<script>
import {
  requiredCssUnit,
  notRequiredCssUnit,
  notRequiredString,
} from "../../utilities/props";

export default {
  mounted() {},
  inject: ["ç_height"],
  props: {
    height: notRequiredString,
    width: requiredCssUnit,
    inclination: {
      ...notRequiredCssUnit,
      default: "-9deg",
    },
    color: {
      ...notRequiredString,
      default: "rgba(0, 0, 0, .75)",
    },
    transformOrigin: {
      ...notRequiredString,
      default: "top right",
    },
    mode: {
      ...notRequiredString,
      default: "rotate",
      validator(value) {
        return ["rotate", "cut"].includes(value);
      },
    },
  },
  computed: {
    rightHeight() {
      return this.height || this.ç_height;
    },
  },
};
</script>

<style lang="scss" scoped>
$color: v-bind(color);
$height: v-bind(rightHeight);
$width: v-bind(width);
$angle: v-bind(inclination);
$origin: v-bind(transformOrigin);
.rotate {
  height: $height;
  width: $width;
  overflow: hidden;
  z-index: 2;
  bottom: 0;

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: $color;
    transform: skewX($angle);
    transform-origin: $origin;
  }
}

.cut {
  height: $height;
  width: $width;
  overflow: hidden;
  z-index: 2;
  bottom: 0;

  &::after {
    content: "";
    position: absolute;
    width: 1100%;
    height: 1100%;
    top: 20px;
    right: -500%;
    background-color: $color;
    transform-origin: $origin;
    transform: rotate($angle);
    z-index: -1;
  }
}
</style>
