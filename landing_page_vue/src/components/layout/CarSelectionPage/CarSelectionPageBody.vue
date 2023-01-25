<template>
  <car-selection-page-form v-if="showForm" @close="closeForm" :car="activeCar" />
  <div class="container-lg">
    <p class="lead text-center display-6 pt-5 mt-5">{{ leadMessage }}</p>
    <div id="cars" class="px-5 mx-5 text-center">
      <div v-if="carsLoaded" class="row">
        <div class="col-lg-6 position-relative" v-for="car in cars" :key="car.name">
          <base-car-image-card
            :key="car.name"
            class="col-lg-8"
            @click="toggleActiveCar(car.name)"
          >
            <img
              :src="car.url"
              :alt="car.name"
              class="pt-1 car"
              ref="img"
              :height="height"
            />
            <p class="lead mt-3 mb-0 text-light">{{ car.name }}</p>
          </base-car-image-card>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-lg-6 position-relative" v-for="i in 6" :key="i">
          <base-car-image-card :key="i" class="col-lg-8" :car-exists="false">
          </base-car-image-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarSelectionPageForm from "./CarSelectionPageForm.vue";
import BaseCarImageCard from "../../UI/BaseCarImageCard.vue";
import { requiredArray } from "../../../utilities/props";
import { Car } from "../../../utilities/classes";

export default {
  components: {
    BaseCarImageCard,
    CarSelectionPageForm,
  },
  inject: ["leadMessage"],
  props: {
    cars: requiredArray(Car),
  },
  data() {
    return {
      formId: "theForm",
      activeCar: null,
      showForm: false,
      height: "",
    };
  },
  computed: {
    carsLoaded() {
      const value = this.cars.length > 0;
      return value;
    },
  },
  provide() {
    return {
      showForm: this.showForm,
    };
  },
  methods: {
    toggleActiveCar(car) {
      this.activeCar = car;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.activeCar = null;
    },
    setHeight() {
      const proportion = { w: 16, h: 9 };
      const width = this.$refs.img[0].width;
      this.height = (width * proportion.h) / proportion.w;
    },
  },
  mounted() {
    window.addEventListener("resize", this.setHeight);
  },
  watch: {
    carsLoaded(n, o) {
      setTimeout(this.setHeight, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  color: #343a40;
}

img.car {
  width: 96%;
}
</style>
