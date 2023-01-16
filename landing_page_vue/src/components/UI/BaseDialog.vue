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
@import "../../assets/main.scss";
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
  top: 0;
  width: 30rem;
  max-width: 100vw;
  max-height: 95vh;
  overflow: scroll;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
  animation: modal 0.3s ease-out;
}

@include media-breakpoint-up(sm) {
  dialog {
    top: 4vh; // IMPORTANT VALUE (formerly 42.5)
    left: calc(50% - 15rem);
  }
}

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
