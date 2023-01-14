<template>
  <HomePageBody />
  <HomePageFooter />
</template>

<script>
import HomePageBody from "../layout/HomePage/HomePageBody.vue";
import HomePageFooter from "../layout/HomePage/HomePageFooter.vue";

import { TheInstructionsMessage } from "../../utilities/classes";

export default {
  components: {
    HomePageBody,
    HomePageFooter,
  },
  inject: ["env"],
  data() {
    return {};
  },
  methods: {
    mainBackground() {
      const env = this.env();
      if (env === "DEVELOPMENT") return "src/assets/images/main_background.png";
      else if (env === "PRODUCTION") return "static/images/main_background.png";
    },
    //   mainBackground() {
    //     const address = `/${encrypt("main_background")}/`;
    //     return new Promise((resolve, reject) => {
    //       axios({
    //         method: "GET",
    //         url: address,
    //         responseType: "blob",
    //         headers: {
    //           accept: "blob",
    //           "Access-Control-Allow-Origin": "*",
    //         },
    //       })
    //         .then((image) => resolve(image))
    //         .catch((error) => reject(error));
    //     });
    //   },
  },
  provide() {
    return {
      presentation: {
        title: "Noleggia una macchina di lusso",
        subtitle: "Scegli l'auto, lascia un recapito e pensiamo a tutto noi!",
        submit: "Scegli una macchina",
      },
      messages: [
        new TheInstructionsMessage(
          "Sceglila",
          "Seleziona una macchina tra quelle disponibili nel nostro catalogo"
        ),
        new TheInstructionsMessage(
          "Scrivici",
          "Inviaci un recapito telefonico o una mail su cui possiamo contattarti per concordare \
          il preventivo"
        ),
        new TheInstructionsMessage(
          "Ricevila",
          "Ricevi la macchina chiavi in mano e restituiscila a fine periodo"
        ),
      ],
      mainBackground: this.mainBackground(),
    };
  },
};
</script>

<style lang="scss"></style>
