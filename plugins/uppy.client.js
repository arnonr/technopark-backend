import Uppy from "@uppy/core";

// Don't forget the CSS: core and UI components + plugins you are using
import "@uppy/core/dist/style.css";
import XHRUpload from "@uppy/xhr-upload";

//
const r = (Math.random() + 1).toString(36).substring(7);

const uppy = new Uppy({
  meta: { news_id: null, secret_key: r, news_gallery_id: null },
  debug: true,
  restrictions: {
    allowedFileTypes: [
      "image/*",
      "video/*",
    ],
  },
}).use(XHRUpload, {
  endpoint: "http://localhost:3000/api/v1/news-gallery/uppy",
  fieldName: "file",
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(uppy);
});
