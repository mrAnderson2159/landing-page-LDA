<template>
  <base-dialog @close="closeDialog">
    <!-- mode="not-closable" -->
    <div class="container-fluid">
      <!-- Titolo -->
      <h3 id="title">{{ title }}</h3>
      <hr />
      <form
        id="form"
        @submit.prevent="submit"
        class="row g-3 needs-validation"
        ref="form"
        novalidate
      >
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
            name="userName"
          />
          <div class="invalid-feedback">{{ errors.userName }}</div>
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
            name="email"
          />
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <!-- Conferma Email -->
        <div class="mb-4">
          <label for="confirmEmail" class="form-label">*Conferma Indirizzo Email</label>
          <input
            type="email"
            class="form-control"
            id="confirmEmail"
            placeholder="nome@esempio.com"
            required
            v-model="form.confirmEmail"
            name="confirmEmail"
          />
          <div class="invalid-feedback">{{ errors.confirmEmail }}</div>
        </div>
        <!-- Intervallo -->
        <div class="mb-4">
          <label class="form-label">*Intervallo</label>
          <!-- Bottoni Intervallo -->
          <div id="dates" class="input-group">
            <div class="input-group mb-4" v-for="input in inputs" :key="input.name">
              <span class="input-group-text">{{ input.text }}</span>
              <select
                ref="hourRent"
                class="form-select"
                aria-label="hour"
                :name="input.name + 'Hour'"
              >
                <option
                  v-for="(hour, i) in getHours"
                  :key="hour"
                  :value="hour"
                  :selected="!i"
                >
                  {{ hour }}
                </option>
              </select>
              <input
                type="date"
                aria-label="date"
                class="form-control"
                :name="input.name + 'Date'"
                :min="new Date().toISOString().split('T')[0]"
              />
            </div>

            <!-- <button
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
            <input
              v-for="input in inputs"
              :key="input.inputId"
              :id="input.inputId"
              type="date"
              name="dates"
              class="form-control"
              v-show="checkActiveInput(input.name)"
              v-model="form[input.name]"
              required
            />
            <div class="invalid-feedback">{{ errors.dates }}</div> -->
          </div>
          <div id="date-help" class="form-text">{{ rentInterval }}</div>
        </div>
        <!-- Note -->
        <div class="mb-4">
          <label for="note" class="form-label">Note</label>
          <textarea
            type="text"
            class="form-control"
            id="notes"
            placeholder="Altre indicazioni..."
            rows="1"
            v-model="form.notes"
          ></textarea>
        </div>
        <!-- Asterisco -->
        <div class="form-text mb-3">*I campi con un asterisco sono obbligatori</div>
        <!-- Invio -->
        <!-- not-mobile -->
        <div class="my-3 d-grid gap-2 d-md-flex justify-content-md-end not-mobile">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="closeDialog"
            :disabled="loading"
          >
            Annulla
          </button>
          <button v-if="loading" class="btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Caricamento...
          </button>
          <input
            v-else
            type="submit"
            class="btn btn-primary me-md-2"
            value="Richiedi preventivo"
            name="submit"
          />
        </div>
        <!-- mobile -->
        <!-- <div class="mobile button-mobile my-3">
          <button v-if="loading" class="btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Caricamento...
          </button>
          <input
            v-else
            type="submit"
            class="btn btn-primary me-md-2"
            value="Richiedi preventivo"
            name="submit"
          />
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="closeDialog"
            :disabled="loading"
          >
            Annulla
          </button>
        </div> -->
        <div class="mobile button-mobile"></div>
        <p id="requestExists" v-if="requestExistError">Richiesta già inviata</p>
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

    Array.from(this.$refs.form.children).forEach((field) => {
      const input = field.querySelector("input");
      if (input !== null) {
        input.addEventListener("blur", (event) => {
          this.validateForm();
        });
      }
    });

    console.log(this.$refs.hourRent);
  },
  emits: ["close"],
  inject: ["toggleFeedbackPage", "postRequest"],
  data() {
    return {
      activeInput: "from",
      form: new Form(this.car),
      inputs: [
        new FormDateInput("from", "Data ritiro", "button-from", "date-from"),
        new FormDateInput("to", "Data riconsegna", "button-to", "date-to"),
      ],
      errors: {},
      requestExistError: false,
      loading: false,
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
    getHours() {
      const hours = [];

      for (let i = 0; i < 21; i++) {
        const adding = Math.floor(i / 2);
        hours.push(`${9 + adding}:${i % 2 ? "30" : "00"}`);
      }

      return hours;
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
    validateForm() {
      // console.log("bluuuur");
    },
    async submit(event) {
      const form = event.target;
      if (this.form.isValid()) {
        try {
          this.loading = true;
          const result = await this.postRequest(this.form.request());
          this.loading = false;
          if (result.data.code === 0) {
            this.toggleFeedbackPage("SUCCESS");
          } else {
            for (const error of result.data.errors) {
              switch (error) {
                case "CONFLICT_USER_EMAIL":
                  this.errors.email =
                    "Esiste già un utente con questa email con un altro nome";
                  form.email.classList.add("is-invalid");
                  break;
                case "QUERY_EXISTS":
                  this.requestExistError = true;
                  break;
              }
            }
          }
        } catch (error) {
          if (error.name === "AxiosError") {
            if (error.code === "ERR_NETWORK") {
              console.log(`CONNECTION REFUSED: ${error.message}`);
              this.toggleFeedbackPage("FAILURE");
            }
          } else console.log(error);
        }
      } else {
        const { errors, valids } = this.form.getErrors();
        // console.log(errors);
        for (const error of errors) {
          switch (error) {
            case "USERNAME_MISSING":
              this.errors.userName = "Questo campo deve essere compilato";
              form.name.classList.add("is-invalid");
              break;
            case "SURNAME_MISSING":
              this.errors.userName = "Inserire nome e cognome";
              form.name.classList.add("is-invalid");
              break;
            case "EMAIL_MISSING":
              this.errors.email = "Questo campo deve essere compilato";
              form.email.classList.add("is-invalid");
              break;
            case "CONFIRMEMAIL_MISSING":
              this.errors.confirmEmail = "Questo campo deve essere compilato";
              form.confirmEmail.classList.add("is-invalid");
              break;
            case "EMAIL_VALIDATION":
              this.errors.email = "";
              this.errors.confirmEmail = "Le email non coincidono";
              form.email.classList.add("is-invalid");
              form.confirmEmail.classList.add("is-invalid");
              break;
            case "FROM_MISSING":
              this.errors.dates = "Inserire il giorno di prenotazione";
              for (const date of form.dates) {
                date.classList.add("is-invalid");
              }
              break;
            case "TO_MISSING":
              this.errors.dates = "Inserire il giorno di restituzione";
              for (const date of form.dates) {
                date.classList.add("is-invalid");
              }
              break;
            case "DATE_VALIDATION":
              this.errors.dates =
                "La data di restituzione non può precedere quella di prenotazione";
              for (const date of form.dates) {
                date.classList.add("is-invalid");
              }
              break;
          }
        }
        for (const valid of valids) {
          // console.log({ valid, form_valid: form[valid] });
          form[valid].classList.remove("is-invalid");
          form[valid].classList.add("is-valid");
        }
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

#requestExists {
  color: #dc3545;
  font-size: 0.875em;
  margin: 0;
  text-align: right;
}

.button-mobile {
  height: 75px;
}

.input-group-text {
  min-width: 35%;
}
</style>
