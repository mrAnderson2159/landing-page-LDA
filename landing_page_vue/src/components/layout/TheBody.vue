<template>
  <div class="container-fluid">
    <base-card>
      <div class="image-blurred-edge" :style="{backgroundImage: `url(${cars[0]})`}"></div>
    </base-card>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {
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
        "https://wallpaperscraft.com/public/img/general/app5.png"
      ]
    };
  },
  props: {},
  methods: {},
};
</script>

<style scoped>
  .image-blurred-edge {
    /* you need to match the shadow color to your background or image border for the desired effect*/
    width: 200px;
    height: 200px;
    box-shadow: 0 0 8px 8px white inset;
  }
</style>