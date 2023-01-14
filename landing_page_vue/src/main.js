// add the beginning of your app entry
import "vite/modulepreload-polyfill";
import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/main.scss";

const app = createApp(App);
app.axios = axios;
app.VueAxios = VueAxios;
app.mount("#app");
