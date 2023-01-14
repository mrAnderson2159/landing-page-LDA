// add the beginning of your app entry
import "vite/modulepreload-polyfill";
import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.scss";

const app = createApp(App);
app.mount("#app");
