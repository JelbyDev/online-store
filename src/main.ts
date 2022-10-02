import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";

const mainApp = createApp(App);

mainApp.use(router).mount("#app");
