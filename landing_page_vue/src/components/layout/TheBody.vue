<template>
  <div class="container-fluid p-0 not-mobile">
    <base-background-image :bg-image="bgImage" img-min-width="1400px" />
    <base-background-shape
      width="75vw"
      :opacity="0.75"
      inclination="-9deg"
      transform-origin="top right"
    />
    <base-presentation
      title="Noleggia una macchina di lusso"
      subtitle="Scegli l'auto, lascia un recapito e pensiamo a tutto noi!"
      submit="Scegli una macchina"
      mode="body"
    />
  </div>
  <div class="container-lg not-mobile">
    <the-instructions
      :messages="messages"
      breakpoint="lg"
      div-classes="lead p-5"
    ></the-instructions>
  </div>
  <!-- <div style="height: 500px"></div> -->
</template>

<script>
import BaseBackgroundImage from "../UI/BaseBackgroundImage.vue";
import BaseBackgroundShape from "../UI/BaseBackgroundShape.vue";
import BasePresentation from "../UI/BasePresentation.vue";
import TheInstructions from "../layout/TheInstructions.vue";

import { TheInstructionsMessage } from "../../utilities/classes";

export default {
  components: {
    BaseBackgroundImage,
    BaseBackgroundShape,
    BasePresentation,
    TheInstructions,
  },
  created() {},
  data() {
    return {
      ç_height: "75vh",
      cars: [
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
        "https://wallpaperscraft.com/public/img/general/icons/app.svg",
        "https://wallpaperscraft.com/public/img/general/icons/google.svg",
        "https://wallpaperscraft.com/public/img/general/icons/tiktok.svg",
        "https://wallpaperscraft.com/public/img/general/icons/app.svg",
        "https://wallpaperscraft.com/public/img/general/icons/google.svg",
        "https://wallpaperscraft.com/public/img/general/icons/tiktok.svg",
        "https://wallpaperscraft.com/public/img/general/icons/app-logo.svg",
        "https://wallpaperscraft.com/public/img/general/icons/google.svg",
        "https://wallpaperscraft.com/public/img/general/icons/app.svg",
        "https://wallpaperscraft.com/tag/supercar/1280x720",
        "https://wallpaperscraft.com/public/img/general/app1.png",
        "https://wallpaperscraft.com/public/img/general/app2.png",
        "https://wallpaperscraft.com/public/img/general/app3.png",
        "https://wallpaperscraft.com/public/img/general/app4.png",
        "https://wallpaperscraft.com/public/img/general/app5.png",
      ],
      messages: [
        new TheInstructionsMessage("Evviva", "Il divino marione è giunto"),
        new TheInstructionsMessage("Gioite", "Sara un periodo di prosperità"),
        new TheInstructionsMessage(
          "Prostratevi",
          "Fate sentire la vosta gioia"
        ),
      ],
    };
  },
  props: {},
  methods: {},
  computed: {
    bgImage() {
      return "src/assets/images/main_background.png";
    },
  },
  provide() {
    return {
      ç_height: this.ç_height,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Mukta:wght@200;300;400;500;600;700&display=swap");
@import "../node_modules/bootstrap/scss/bootstrap"; // PERFORMANCE: QUESTO RALLENTA MOLTO

.not-mobile {
  display: none;
}

@include media-breakpoint-up(lg) {
  .not-mobile {
    display: block;
  }
}
</style>
