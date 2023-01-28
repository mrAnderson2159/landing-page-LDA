<template>
  <the-header v-if="showHeader" />
  <car-selection-page-body :cars="cars" />
</template>

<script>
import TheHeader from "../layout/All/TheHeader.vue";
import CarSelectionPageBody from "../layout/CarSelectionPage/CarSelectionPageBody.vue";
import { Car } from "../../utilities/classes";
import axios from "axios";
import { urlServer } from "../../utilities/hashing";

export default {
  components: {
    TheHeader,
    CarSelectionPageBody,
  },
  inject: ["showHeader", "localhost", "delay", "textValue"],
  created() {
    window.scrollTo({ top: 0 });
    this.getCars();
  },
  data() {
    return {
      cars: [],
    };
  },
  computed: {},
  methods: {
    async getCars() {
      const address = urlServer(this.localhost, "cars");
      // await this.delay(2000);
      const response = await axios(address);
      let cars = JSON.parse(response.data);
      cars = cars.map(
        (c) =>
          new Car(
            c.name,
            c.path || c.url,
            c.engine_capacity,
            c.horsePower,
            c.supply,
            c.daily_km,
            c.price
          )
      );
      this.cars = cars;
    },
  },
  provide() {
    return {
      leadMessage: this.textValue("carSelectionPageLeadMessage"),
    };
  },
};
</script>

<style lang="scss" scoped></style>
