<template>
  <base-dialog @close="closeDialog">
    <!-- mode="not-closable" -->
    <div class="container-fluid">
      <!-- Titolo -->
      <h3 id="title">{{ title }}</h3>
      <hr />
      <form id="form" @submit.prevent="submit">
        <!-- Nome -->
        <div class="mb-4">
          <label for="name" class="form-label">*Nome</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Nome e cognome"
            ref="nome"
            required
            v-model="form.userName"
          />
        </div>
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="form-label">*Indirizzo Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="nome@esempio.com"
            required
            v-model="form.email"
          />
        </div>
        <!-- Conferma Email -->
        <div class="mb-4">
          <label for="email" class="form-label">*Conferma Indirizzo Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="nome@esempio.com"
            required
            v-model="form.confirmEmail"
          />
        </div>
        <!-- Intervallo -->
        <div class="mb-4">
          <label for="dates" class="form-label">*Intervallo</label>
          <!-- Bottoni Intervallo -->
          <div id="dates" class="input-group">
            <button
              v-for="input in inputs"
              :key="input.buttonId"
              :id="input.buttonId"
              class="btn btn-outline-secondary"
              :class="{ active: checkActiveInput(input.name) }"
              type="button"
              @click="toggleActiveInput(input.name)"
            >
              {{ input.text }}
            </button>
            <!-- Input Intervallo -->
            <input
              v-for="input in inputs"
              :key="input.inputId"
              :id="input.inputId"
              type="date"
              :name="input.name"
              class="form-control"
              v-show="checkActiveInput(input.name)"
              v-model="form[input.name]"
              required
            />
          </div>
          <div id="date-help" class="form-text">{{ rentInterval }}</div>
        </div>
        <!-- Note -->
        <div class="mb-4">
          <label for="note" class="form-label">Note</label>
          <textarea
            type="note"
            class="form-control"
            id="email"
            placeholder="Altre indicazioni..."
            rows="1"
            v-model="form.notes"
          ></textarea>
        </div>
        <!-- Asterisco -->
        <div class="form-text mb-3">*I campi con un asterisco sono obbligatori</div>
        <!-- Invio -->
        <div class="my-3 d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" class="btn btn-outline-secondary" @click="closeDialog">
            Annulla
          </button>
          <button type="submit" class="btn btn-primary me-md-2">
            Richiedi preventivo
          </button>
        </div>
      </form>
    </div>
  </base-dialog>
</template>

<script>
import BaseDialog from "../../UI/BaseDialog.vue";

import { requiredString } from "../../../utilities/props";
import { Form, FormDateInput } from "../../../utilities/classes";

export default {
  components: {
    BaseDialog,
  },
  mounted() {
    this.$refs.nome.focus();
  },
  emits: ["close"],
  inject: ["toggleFeedbackPage", "postRequest"],
  data() {
    return {
      activeInput: "from",
      form: new Form(
        this.car
        //,
        // "Mario Rossi",
        // "mario.rossi@gmail.com",
        // "mario.rossi@gmail.com",
        // "2023-01-15",
        // "2023-01-19",
        // ""
      ),
      inputs: [
        new FormDateInput("from", "A partire dal", "button-from", "date-from"),
        new FormDateInput("to", "Fino al", "button-to", "date-to"),
      ],
    };
  },
  computed: {
    title() {
      return `Prenota una ${this.car}`;
    },
    rentInterval() {
      const [from, to] = this.form.reverseDates();
      return `Dal ${from} al ${to}`;
    },
  },
  props: {
    car: requiredString,
  },
  methods: {
    checkActiveInput(input) {
      return input === this.activeInput;
    },
    toggleActiveInput(input) {
      this.activeInput = input;
    },
    closeDialog() {
      this.$emit("close");
    },
    async submit() {
      if (this.form.isValid()) {
        try {
          const result = await this.postRequest(this.form.request());
          console.log(`Server: ${result.status}`);
          this.toggleFeedbackPage("SUCCESS");
        } catch (error) {
          if (error.name === "AxiosError") {
            if (error.code === "ERR_NETWORK") {
              console.log(`CONNECTION REFUSED: ${error.message}`);
              this.toggleFeedbackPage("FAILURE");
            }
          } else console.log(error);
        }
      } else {
        const errors = this.form.getErrors();
        console.log(errors);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#title {
  text-align: center;
}

#form {
  margin-top: 2rem;
}
</style>
