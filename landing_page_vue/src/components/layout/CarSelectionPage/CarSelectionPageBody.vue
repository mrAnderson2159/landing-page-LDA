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
            <img :src="car.url" :alt="car.name" class="pt-1 car" />
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
    };
  },
  computed: {
    carsLoaded() {
      return this.cars.length > 0;
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
  },
};
</script>

<style lang="scss" scoped>
p {
  color: #343a40;
}

img.car {
  width: 96%;
  height: 22.5vh;
}
</style>
