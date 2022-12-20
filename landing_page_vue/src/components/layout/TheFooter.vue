<template>
  <div id="second" class="container-fluid not-mobile p-0 position-relative">
    <base-background-shape
      id="left"
      mode="cut"
      :height="rightTrianglesHeight"
      :width="leftTriangleWidth"
      :inclination="leftAngle"
      transform-origin="47.33% 0"
      :color="color"
    />
    <base-background-shape
      id="right"
      mode="cut"
      :height="rightTrianglesHeight"
      :width="rightTriangleWidth"
      :inclination="rightAngle"
      transform-origin="53% 0"
      :color="color"
    />
  </div>
  <div id="footer-container" class="container-fluid not-mobile p-0"></div>
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
    window.removeEventListener("resize", this.resize);
  },
  data() {
    const x = window.innerWidth;
    const y = window.innerHeight * this.trianglesHeight;
    return {
      leftTriangleWidth: x * this.trianglesProportion[0] + "px",
      rightTriangleWidth: x * this.trianglesProportion[1] + "px",
      rightTrianglesHeight: y + "px",
      theta_1: this.computeTheta(x * this.trianglesProportion[0], y),
      theta_2: this.computeTheta(x * this.trianglesProportion[1], y, -1),
      color: "#2B1E16",
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
      default: [0.6, 0.4],
    },
  },
  computed: {
    leftAngle() {
      // console.log(this.theta_1 + "deg");
      return this.theta_1 + "deg";
    },
    rightAngle() {
      // console.log(this.theta_2 + "deg");
      return this.theta_2 + "deg";
    },
    computedColor() {
      if (this.color.startsWith("#")) {
        const color = this.color.substring(1);
        let rgb = [];

        for (let i = 0; i < 3; i++)
          rgb.push(color.substring(2 * i, 2 * (i + 1)));

        rgb = rgb.map((x) => parseInt(x, 16));

        return `rgb(${rgb.join(",")})`;
      }

      return this.color;
    },
  },
  methods: {
    resize(event) {
      const target = event.target;
      const width = target.innerWidth;
      if (width > 990) {
        const height = target.innerHeight;
        const [leftX, rightX] = this.trianglesProportion;

        this.leftTriangleWidth = width * leftX + "px";
        this.rightTriangleWidth = width * rightX + "px";
        this.rightTrianglesHeight = height * this.trianglesHeight + "px";
        this.theta_1 = this.computeTheta(
          this.leftTriangleWidth,
          this.rightTrianglesHeight
        );
        this.theta_2 = this.computeTheta(
          this.rightTriangleWidth,
          this.rightTrianglesHeight,
          -1
        );
      }
    },

    computeTheta(x, y, sign = 1) {
      [x, y] = [x, y].map(parseFloat);
      const ro = Math.sqrt(x ** 2 + y ** 2);
      return this.deg(Math.asin(y / ro) * sign).toFixed(2);
    },

    deg(radians) {
      return (radians * 180) / Math.PI;
    },

    rad(degrees) {
      return (degrees * Math.PI) / 180;
    },
  },
};
</script>

<style lang="scss" scoped>
$left: v-bind(leftTriangleWidth);
$right: v-bind(rightTriangleWidth);
$height: v-bind(rightTrianglesHeight);

#second {
  height: $height;
  margin-top: 10vh;
}

#right {
  left: $left;
}

#footer-container {
  height: 50vh;
  background-color: v-bind(computedColor);
}
</style>
