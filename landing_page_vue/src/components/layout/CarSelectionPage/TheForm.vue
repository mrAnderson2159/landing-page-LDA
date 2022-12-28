<template>
  <div></div>
</template>

<script>
// import { requiredString } from "../../../utilities/props";

export default {
  created() {},
  inject: ["activeCar"],
  data() {
    return {};
  },
  computed: {
    title() {
      return `Prenota ${this.activeCar}`;
    },
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
