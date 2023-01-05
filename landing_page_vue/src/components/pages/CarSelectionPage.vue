<template>
  <the-header v-if="showHeader" />
  <car-selection-page-body :cars="cars" />
</template>

<script>
import TheHeader from "../layout/All/TheHeader.vue";
import CarSelectionPageBody from "../layout/CarSelectionPage/CarSelectionPageBody.vue";
import { Car } from "../../utilities/classes";

export default {
  components: {
    TheHeader,
    CarSelectionPageBody,
  },
  inject: ["showHeader"],
  created() {
    window.scrollTo({ top: 0 });
  },
  computed: {
    cars() {
      const w = "https://images.wallpaperscraft.com/image/single/";
      const cars = [
        new Car(
          "Lamborgini Aventador",
          "aventador_supercar_lamborghini_orange_90578_300x168.jpg"
        ),
        new Car("Art Road 590", "supercar_art_road_car_90590_300x168.jpg"),
        new Car("Aston Martin 798", "supercar_green_aston_martin_79798_300x168.jpg"),
        new Car(
          "Porsche London Blue GT3",
          "supercar_991_london_blue_gt3_porsche_96255_300x168.jpg"
        ),
        new Car(
          "Bugatti Grand Sport Vitesse",
          "supercar_grand_sport_vitesse_bugatti_veyron_95287_300x168.jpg"
        ),
        new Car(
          "Ferrari Garage Tuning",
          "supercar_garage_tuning_ferrari_76936_300x168.jpg"
        ),
        new Car("Rear Sport 180", "supercar_sports_car_rear_view_130180_300x168.jpg"),
        new Car(
          "Apollo Gumbert 2M",
          "supercar_gumpert_apollo_s_ironcar_2m_designs_95185_300x168.jpg"
        ),
        new Car(
          "Aston Martin Limber",
          "supercar_yellow_road_speed_blur_limber_aston_martin_76937_300x168.jpg"
        ),
        new Car("Carside Sport 803", "supercar_sports_car_side_view_116603_300x168.jpg"),
        new Car("Dragonred 601", "sportscar_supercar_red_156179_300x168.jpg"),
        new Car(
          "Ferrari Red Mountains",
          "ferrari_supercar_sports_car_red_mountains_101239_300x168.jpg"
        ),
        new Car(
          "Bugatti Veyron",
          "bugatti_veyron_supercar_16_4_grand_sport_vitesse_meo_costantini_93619_300x168.jpg"
        ),
        new Car(
          "Dodge Charger 207",
          "dodge_charger_srt8_supercar_cult_car_silver_tuning_functional_hood_95207_300x168.jpg"
        ),
      ];

      cars.forEach((x) => x.addUrlBefore(w));

      return cars;
    },
  },
  provide() {
    return {
      leadMessage:
        "Scegli la macchina che preferisci quindi lascia un recapito per essere ricontattato",
    };
  },
};
</script>

<style lang="scss" scoped></style>
