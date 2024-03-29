<template>
  <!-- body-not-mobile -->
  <div
    v-if="mode === 'body-not-mobile'"
    id="body-not-mobile"
    class="row main-text-container text-light position-relative"
  >
    <div class="main-text col-lg-7">
      <h1 class="title display-3">{{ title }}</h1>
      <p class="subtitle lead fs-3 text-mylight">{{ subtitle }}</p>
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
    <div class="btn-container">
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
import { requiredString, requiredCssUnit } from "../../utilities/props";

export default {
  inject: ["toggleCarSelectionPage"],
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
    height: requiredCssUnit,
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
  computed: {},
};
</script>

<style lang="scss" scoped>
$height: v-bind(height);

.main-text-container {
  height: $height;
  z-index: 4;
  bottom: $height;

  & .main-text {
    // border: 1px solid red;
    height: 60%;
    margin: auto 5%; // percentage($phi / 10)

    & .title {
      font-family: "Mukta", sans-serif;
      margin-bottom: 2vw;
    }

    & .subtitle {
      margin-bottom: 5vw;
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

  & .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;

    & button {
      margin: 2rem 0;
    }
  }
}

button {
  font-size: 1.25em;
  padding: 1em 2em;
}

.text-mylight {
  color: rgb(160, 173, 185) !important;
}
</style>
