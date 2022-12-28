<template>
  <div class="container-lg">
    <p class="lead text-center display-6 pt-5 mt-5">{{ leadMessage }}</p>
    <div id="cars" class="px-5 mx-5 text-center">
      <div class="row">
        <div
          class="col-lg-6 position-relative"
          v-for="data in cars"
          :key="data.name"
        >
          <base-car-image-card :key="data.name" class="col-lg-8">
            <img :src="data.url" :alt="data.name" class="pt-3" />
            <p class="lead mt-3 mb-0 text-light">{{ data.name }}</p>
          </base-car-image-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheForm from "./TheForm.vue";
import BaseCarImageCard from "../../UI/BaseCarImageCard.vue";

export default {
  components: {
    BaseCarImageCard,
    TheForm,
  },
  inject: ["leadMessage"],
  data() {
    return {
      formId: "theForm",
    };
  },
  computed: {
    cars() {
      const cars = [
        "https://images.wallpaperscraft.com/image/single/supercar_art_road_car_90590_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/supercar_green_aston_martin_79798_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/supercar_991_london_blue_gt3_porsche_96255_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/supercar_grand_sport_vitesse_bugatti_veyron_95287_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/supercar_garage_tuning_ferrari_76936_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/supercar_sports_car_rear_view_130180_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/supercar_gumpert_apollo_s_ironcar_2m_designs_95185_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/supercar_yellow_road_speed_blur_limber_aston_martin_76937_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/supercar_sports_car_side_view_116603_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/sportscar_supercar_red_156179_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/ferrari_supercar_sports_car_red_mountains_101239_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/bugatti_veyron_supercar_16_4_grand_sport_vitesse_meo_costantini_93619_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/dodge_charger_srt8_supercar_cult_car_silver_tuning_functional_hood_95207_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/aventador_supercar_lamborghini_orange_90578_300x168.jpg",
        "https://images.wallpaperscraft.com/image/single/car_supercar_sports_car_124469_300x168.jpg",
      ];

      return cars.map((x, i) => {
        return { name: `Macchina ${i + 1}`, url: x };
      });
    },
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
p {
  color: #343a40;
}
</style>
