<template>
  <the-body></the-body>
  <the-footer></the-footer>
</template>

<script>
import TheBody from "../layout/HomePage/TheBody.vue";
import TheFooter from "../layout/HomePage/TheFooter.vue";

import { TheInstructionsMessage } from "../../utilities/classes";

export default {
  components: {
    TheBody,
    TheFooter,
  },
  data() {
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
    };
  },
  provide() {
    return {
      presentation: this.presentation,
      messages: this.messages,
    };
  },
};
</script>

<style lang="scss"></style>
