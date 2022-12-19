<template>
  <div class="bg-image position-fixed">
    <img :src="bgImage" class="position-relative" />
  </div>
</template>

<script>
import { url } from "inspector";

export default {
  data() {
    return {};
  },
  props: {
    hight: {
      type: String,
      required: true,
      validator(value) {
        return /^[\d.]+(px|em|vh|%)$/.test(value);
      },
    },
    bgImage: {
      type: url,
      required: true,
    },
    mode: {
      type: String,
      required: false,
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
  },
};
</script>

<style lang="scss" scoped>
$bg_hight: 80vh;
$phi: 1.618;

.bg-image {
  height: $bg_hight;
  width: 100%;
  overflow: hidden;

  & img {
    height: $bg_hight;
    width: 100%;
    margin: auto 0;
    min-width: 1400px;
    // bottom: 50px;
  }
}
</style>
