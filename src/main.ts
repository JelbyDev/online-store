import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import components from "@/components/appExport";

loadFonts();

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});
app.use(router);
app.use(createPinia());
app.use(vuetify);
app.mount("#app");
