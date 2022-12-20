<template>
  <div class="container-fluid position-relative">
    <base-background-shape
      :height="rightTrianglesHeight"
      :width="leftTriangleWidth"
    />
    <base-background-shape
      :height="rightTrianglesHeight"
      :width="rightTriangleWidth"
    />
  </div>
</template>

<script>
import BaseBackgroundShape from "../UI/BaseBackgroundShape.vue";

import {
  notRequiredNumber,
  notRequiredArrayOfNumbers,
} from "../../utilities/props";
import { ratioValidator } from "../../utilities/validators";

export default {
  components: {
    BaseBackgroundShape,
  },
  mounted() {
    window.addEventListener("resize", this.resize);
  },
  unmounted() {
    window.removeEventListener("resize");
  },
  data() {
    return {
      leftTriangleWidth: window.innerWidth * this.trianglesProportion[0] + "px",
      rightTriangleWidth:
        window.innerWidth * this.trianglesProportion[1] + "px",
      rightTrianglesHeight: window.innerHeight * this.trianglesHeight + "px",
    };
  },
  props: {
    trianglesHeight: {
      ...notRequiredNumber,
      default: 0.1,
      validator: ratioValidator,
    },
    trianglesProportion: {
      ...notRequiredArrayOfNumbers,
      validator(value) {
        return (
          notRequiredArrayOfNumbers.validator(value) &&
          value.every(ratioValidator)
        );
      },
      default: [0.3, 0.7],
    },
  },
  methods: {
    resize(event) {
      const target = event.target;
      const width = target.innerWidth;
      const height = target.innerHeight;
      const [leftX, rightX] = this.trianglesProportion;

      this.leftTriangleWidth = width * leftX + "px";
      this.rightTriangleWidth = width * rightX + "px";
      this.rightTrianglesHeight = height * this.trianglesHeight + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
$left: v-bind(leftTriangleWidth);
$right: v-bind(rightTriangleWidth);
$height: v-bind(rightTrianglesHeight);
</style>
