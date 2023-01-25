<template>
  <div v-if="carExists" class="existingCar">
    <slot></slot>
  </div>
  <div v-else class="card notExistingCar" aria-hidden="true">
    <div class="placeholder w-100" :style="{ height: '16vh' }"></div>
    <div class="card-body">
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
        <span class="placeholder col-4"></span>
        <span class="placeholder col-6"></span>
        <span class="placeholder col-8"></span>
      </p>
    </div>
  </div>
</template>

<script>
import { notRequiredBoolean } from "../../utilities/props";

export default {
  props: {
    carExists: {
      ...notRequiredBoolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.notExistingCar {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding-bottom: 1rem;
  margin: 2rem auto;
}

div.existingCar {
  @extend .notExistingCar;
  background-color: black;

  &:hover {
    background-color: #2c1a4d;
    cursor: pointer;
  }
}
</style>
