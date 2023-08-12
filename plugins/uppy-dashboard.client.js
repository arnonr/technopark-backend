import Uppy from '@uppy/core'
// import "froala-editor/js/froala_editor.pkgd.min.js";

// // Require Froala Editor css files.
// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/css/froala_style.min.css";

import { DashboardModal } from '@uppy/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(DashboardModal);
});
