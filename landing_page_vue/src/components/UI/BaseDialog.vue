<template>
  <teleport to="body">
    <div class="backdrop" @click="closeAction"></div>
    <dialog open>
      <slot></slot>
    </dialog>
  </teleport>
</template>

<script>
import { notRequiredString } from "../../utilities/props";

export default {
  emits: ["close"],
  methods: {
    closeAction() {
      const mode = this.mode;
      if (!mode || mode === "closable") this.close();
      else if (mode === "not-closable") {
        // pass
      }
    },
    close() {
      this.$emit("close");
    },
  },
  props: {
    mode: {
      ...notRequiredString,
      validator(value) {
        ["closable", "not-closable"].includes(value);
      },
    },
  },
  provide() {
    return {
      close: this.close,
    };
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  // Bisogna bloccare l'overflow
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  top: 12vh; // IMPORTANT VALUE (formerly 42.5)
  width: 30rem;
  left: calc(50% - 15rem);
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
  animation: modal 0.3s ease-out;
}

/*
    Possiamo animare la comparsa del dialog senza problemi, tuttavia animarne la
    scomparsa è impossibile poiché, visto che in App.vue questo elemento viene
    mostrato con una v-if, quando viene chiuso viene eliminato dal DOM, quindi
    non è possibile animarlo con il CSS, ma è qui che Vue ci viene in aiuto...
    (v. prossima lezione)
*/

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(0) scale(0.3);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
