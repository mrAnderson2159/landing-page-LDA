<template>
  <div class="shape position-fixed"></div>
</template>

<script>
import {
  requiredCssUnit,
  notRequiredCssUnit,
  notRequiredNumber,
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
    opacity: {
      ...notRequiredNumber,
      default: 0.75,
    },
    transformOrigin: {
      ...notRequiredString,
      default: "top right",
    },
  },
  computed: {
    color() {
      return `rgba(0, 0, 0, ${this.opacity})`;
    },
    rightHeight() {
      return this.height || this.ç_height;
    },
  },
};
</script>

<style lang="scss" scoped>
$color: v-bind(color);
.shape {
  height: v-bind(rightHeight);
  width: v-bind(width);
  overflow: hidden;
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: $color;
    transform: skewX(v-bind(inclination));
    transform-origin: v-bind(transformOrigin);
  }
}
</style>
