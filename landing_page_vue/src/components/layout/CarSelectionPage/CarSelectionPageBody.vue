<template>
  <car-selection-page-form
    v-if="showForm"
    @close="closeForm"
    :car="activeCar"
  />
  <div class="container-fluid">
    <p class="lead display-6 pt-5 mt-5 text-center">
      {{ leadMessage }}
    </p>
    <div id="cars" class="px-3 m-3 text-center">
      <div v-if="carsLoaded" class="row">
        <div
          class="position-relative"
          v-for="(car, i) in cars"
          :key="car.name"
          :class="
            cars.length % 2 && i == cars.length - 1 ? 'col-lg-12' : 'col-lg-6'
          "
        >
          <base-car-image-card
            :key="car.name"
            class="my-5"
            :class="
              cars.length % 2 && i == cars.length - 1 ? 'col-lg-6' : 'col-lg-11'
            "
            @click="toggleActiveCar(car.name)"
          >
            <img
              :src="car.url"
              :alt="car.name"
              class="pt-2 car"
              ref="img"
              :height="height"
            />
            <h2 class="mt-3 mb-0 text-light">{{ car.name }}</h2>
            <hr class="text-light" />
            <div class="row flex justify-content-center">
              <div
                class="text-light car-property mb-3 col-sm-8 col-11"
                v-for="property in carProperties"
                :key="property.pointer"
              >
                <span class="property-label float-start"
                  ><strong>{{ property.label }}</strong
                  >:</span
                >
                <span class="property-car float-end"
                  >{{ car[property.pointer] }} {{ property.unit }}</span
                ><br />
              </div>
            </div>
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
import { Car, CarProperty } from "../../../utilities/classes";

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
      carProperties: [
        new CarProperty("Cilindrata", "engineCapacity"),
        new CarProperty("Potenza motore", "horsePower", "CV"),
        new CarProperty("Alimentazione", "supply"),
        new CarProperty("KM/giorno", "dailyKm"),
        new CarProperty("A partire da", "price", "€/g"),
      ],
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
  width: 98%;
}

.car-property {
  font-size: 1.3rem;
}
</style>
