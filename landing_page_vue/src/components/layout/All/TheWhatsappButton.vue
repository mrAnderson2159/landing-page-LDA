<template>
  <a :href="address" id="whatsapp">
    <img
      src="https://image.similarpng.com/very-thumbnail/2020/07/Whatsapp-icon-vector-PNG.png"
      alt="Whatsapp"
    />
  </a>
</template>

<script>
import { requiredNumber } from "../../../utilities/props";

export default {
  props: {
    number: requiredNumber,
  },
  computed: {
    address() {
      return "https://api.whatsapp.com/send?phone=" + this.number;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
a#whatsapp {
  position: fixed;
  right: 40px;
  top: 80vh;
  z-index: 9999;
  width: 80px;
}
</style>
