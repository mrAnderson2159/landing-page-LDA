<template>
  <a :href="address" id="whatsapp" ref="link" target="_blank">
    <img :src="logo" alt="Whatsapp" />
  </a>
</template>

<script>
import { requiredNumber } from "../../../utilities/props";

export default {
  inject: ["env"],
  props: {
    number: requiredNumber,
  },
  data() {
    return {
      logo: this.defaultLogo(),
    };
  },
  computed: {
    address() {
      return "https://api.whatsapp.com/send?phone=" + this.number;
    },
  },
  methods: {
    defaultLogo(hover = false) {
      const addhover = hover ? "-hover" : "";
      if (this.env() === "DEVELOPMENT") {
        return `src/assets/images/whatsapp-logo${addhover}.png`;
      } else {
        return `static/images/whatsapp-logo${addhover}.png`;
      }
    },
  },
  mounted() {
    const link = this.$refs.link;
    link.addEventListener("mouseover", (event) => {
      event.target.src = this.defaultLogo(true);
    });
    link.addEventListener("mouseout", (event) => {
      event.target.src = this.defaultLogo();
    });
  },
};
</script>

<style lang="scss" scoped>
a#whatsapp {
  position: fixed;
  right: 40px;
  top: 80vh;
  z-index: 999;
  width: 80px;
}
</style>
