<template>
  <div id="container" class="container-fluid p-0">
    <div class="bg-image position-fixed"></div>
    <div id="masthead" class="masthead position-fixed"></div>
    <div class="row main-text-container text-light position-relative">
      <div class="main-text col-md-6">
        <h1 class="head-message display-1">Noleggia una macchina di lusso</h1>
        <p class="lead fs-3 text-secondary col-md-6">Scegli l'auto, dicci dove possiamo contattarti e pensiamo a tutto noi!</p>
        <div class="d-grid gap-2 col-3 mx-auto mt-5">
          <button type="button" class="btn btn-warning">Scegli una macchina</button>
        </div>
      </div>
    </div>
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

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Mukta:wght@200;300;400;500;600;700&display=swap');

  $bg_hight: 80vh;
  $phi: 1.618;

  .bg-image {
    background: url('../../assets/images/main_background.png');
    height: $bg_hight;
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-y: 0%;
  }

  @media screen and (min-width: 500px) {
      .masthead {
      height: $bg_hight;
      width: 75vw;
      min-height: 0;
      padding-bottom: 0;

      &::before {
        transform: skewX(-9deg);
        transform-origin: top right;
      }
    }
  }

  .masthead {
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.75);
    }
  }

  .main-text-container {
    height: $bg_hight;
  }

  .main-text {
    // border: 1px solid red;
    height: 60%;
    margin: auto 10%// percentage($phi / 10)
  }

  .head-message {
    font-family: 'Mukta', sans-serif;
    text-transform: uppercase;
  }

  
</style>