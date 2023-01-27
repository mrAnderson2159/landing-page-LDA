<template>
  <!-- body-not-mobile -->
  <div
    v-if="mode === 'body-not-mobile'"
    id="body-not-mobile"
    class="row main-text-container text-light position-relative"
  >
    <div class="main-text col-md-6">
      <h1 class="title display-1">{{ title }}</h1>
      <p class="subtitle lead fs-3 text-secondary col-md-6">{{ subtitle }}</p>
      <div class="d-grid gap-2 col-3 mt-5 submit-container">
        <button type="submit" :class="settings.btnClass" @click="submitAction">
          {{ submit }}
        </button>
      </div>
    </div>
  </div>
  <!-- body-mobile -->
  <div v-else-if="mode === 'body-mobile'" class="container-fluid" id="body-mobile">
    <h1 class="title">{{ title }}</h1>
    <p class="subtitle lead text-secondary">{{ subtitle }}</p>
    <div class="d-grid gap-2 col-6 mx-auto">
      <button type="submit" :class="settings.btnClass" @click="submitAction">
        {{ submit }}
      </button>
    </div>
  </div>
  <!-- footer-not-mobile -->
  <div
    v-else-if="mode === 'footer-not-mobile'"
    id="footer-not-mobile"
    class="row main-text-container text-light position-relative footer ms-5"
  >
    <div class="col">
      <h1 class="title display-6">{{ title }}</h1>
      <p class="subtitle lead fs-5 text-secondary col-md-6">{{ subtitle }}</p>
    </div>
    <div class="col btn-container">
      <button type="submit" :class="settings.btnClass" @click="submitAction">
        {{ submit }}
      </button>
    </div>
  </div>
</template>

<script>
import { requiredString, notRequiredCssUnit } from "../../utilities/props";

export default {
  inject: ["ç_height", "toggleCarSelectionPage"],
  created() {},
  data() {
    return {
      settings: {
        btnClass: "btn btn-success text-nowrap submit rounded-pill",
      },
    };
  },
  props: {
    title: requiredString,
    subtitle: requiredString,
    submit: requiredString,
    height: notRequiredCssUnit,
    mode: {
      ...requiredString,
      validator(value) {
        return [
          "body-not-mobile",
          "footer-not-mobile",
          "body-mobile",
          "footer-mobile",
        ].includes(value);
      },
    },
  },
  methods: {
    submitAction() {
      this.toggleCarSelectionPage();
    },
  },
  computed: {
    rightHeight() {
      return this.height || this.ç_height;
    },
  },
};
</script>

<style lang="scss" scoped>
$height: v-bind(rightHeight);

.main-text-container {
  height: $height;
  z-index: 4;
  bottom: $height;

  & .main-text {
    // border: 1px solid red;
    height: 60%;
    margin: auto 10%; // percentage($phi / 10)

    & .title {
      font-family: "Mukta", sans-serif;
    }
  }
}

.footer {
  width: 60%;
  padding-top: 8%;
}

.btn-container {
  display: flex;
  align-items: center;

  & button {
    margin: 0 auto;
  }
}

.title {
  text-transform: uppercase;
}

.title,
.subtitle {
  &:hover {
    cursor: default;
  }
}

#body-mobile {
  padding: 3rem 2rem;

  .title {
    font-size: 5.725vw;
  }

  .subtitle {
    font-size: 4.5vw;
    line-height: normal;
  }

  button {
    margin: 2rem 0;
  }
}

button {
  font-size: 1.25em;
  padding: 1em 2em;
}
</style>
