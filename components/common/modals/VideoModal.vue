<template>
  <div id="video-overlay" class="video-overlay" @click="closeVideo">
    <a class="video-overlay-close" @click.prevent="closeVideo">×</a>
  </div>
</template>

<script>
export default {
  props: {
    videoUrl: {
      type: String,
      immediate: true,
      default: "",
    },
  },
  emits: ["update:videoUrl"],
  watch: {
    videoUrl: function (newVal, oldVal) {
      // watch it
      if (newVal != null) {
        const videoOverlay = document.querySelector("#video-overlay");
        let iframeElement = document.createElement("iframe");
        iframeElement.setAttribute("src", newVal);
        iframeElement.style.width = "60%";
        iframeElement.style.height = "80%";

        videoOverlay?.classList.add("open");
        videoOverlay.appendChild(iframeElement);
      }
    },
  },
  methods: {
    playVideo() {
      const videoOverlay = document.querySelector("#video-overlay");
      let iframeElement = document.createElement("iframe");
      console.log(this.videoUrl + "FREEDOM");
      iframeElement.setAttribute("src", this.videoUrl);
      iframeElement.style.width = "60%";
      iframeElement.style.height = "80%";

      videoOverlay?.classList.add("open");
      videoOverlay.appendChild(iframeElement);
    },
    closeVideo() {
      const videoOverlay = document.querySelector("#video-overlay.open"),
        iframeElement = document.querySelector("#video-overlay.open iframe");
      this.$emit("update:videoUrl", null);
      videoOverlay?.classList.remove("open");
      iframeElement?.remove();
    },
  },
};
</script>
