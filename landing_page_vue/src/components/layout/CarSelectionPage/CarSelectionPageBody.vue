<template>
  <car-selection-page-form v-if="showForm" @close="closeForm" :car="activeCar" />
  <div class="container-lg">
    <p class="lead text-center display-6 pt-5 mt-5">{{ leadMessage }}</p>
    <div id="cars" class="px-5 mx-5 text-center">
      <div class="row">
        <div class="col-lg-6 position-relative" v-for="car in cars" :key="car.name">
          <base-car-image-card
            :key="car.name"
            class="col-lg-8"
            @click="toggleActiveCar(car.name)"
          >
            <img :src="car.url" :alt="car.name" class="pt-1" />
            <p class="lead mt-3 mb-0 text-light">{{ car.name }}</p>
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
  computed: {},
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

img {
  width: 96%;
}
</style>
