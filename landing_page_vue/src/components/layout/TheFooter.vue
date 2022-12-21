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
  <div id="footer-container" class="container-fluid not-mobile p-0">
    <base-presentation
      title="Noleggia una macchina di lusso"
      subtitle="Scegli l'auto, lascia un recapito e pensiamo a tutto noi!"
      submit="Scegli una macchina"
      mode="footer"
    />
    <div id="links" class="lead">
      <ul class="text-light">
        <li>
          <a href="#">Chi siamo</a>
        </li>
        <li>
          <a href="#">Termini e Condizioni</a>
        </li>
        <li>
          <a href="#">Note Legali</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseBackgroundShape from "../UI/BaseBackgroundShape.vue";
import BasePresentation from "../UI/BasePresentation.vue";

import {
  notRequiredNumber,
  notRequiredArrayOfNumbers,
} from "../../utilities/props";
import { ratioValidator } from "../../utilities/validators";

const FI = (Math.sqrt(5) + 1) / 2;

export default {
  components: {
    BaseBackgroundShape,
    BasePresentation,
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
      default: 0.1, // BUG: I triangoli funzionano solo perché il valore è 0.1
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
      default: [FI - 1, 1 / (FI + 1)],
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

#links {
  width: 25%;
  position: relative;
  bottom: 36%;
  float: right;

  & ul {
    list-style: none;
    & li {
      padding: 1.618em;
      & a {
        text-decoration: none;
        color: whitesmoke;
        position: absolute;

        &:hover {
          font-size: 1.1em;
        }
      }
    }
  }
}
</style>
