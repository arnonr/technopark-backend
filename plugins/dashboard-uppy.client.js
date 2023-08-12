import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/vue";
import "@uppy/dashboard/dist/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Dashboard);
});
