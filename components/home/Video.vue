<template>
  <div class="" v-if="items.length != 0">
    <div class="row">
      <div class="col-md-12">
        <h4 class="text-custom-primary">วิดีโอเกี่ยวกับ อุทยานฯ</h4>
        <hr />
        <div class="row" v-if="items.length != 0">
          <div class="col-md-12 mb-2">
            <div class="about__video-wrapper">
              <div class="about__video-thumb">
                <img
                  :src="itemFirst.video_file"
                  class="img-video-modal-first"
                  alt="about img"
                />
                <div class="about__play">
                  <a
                    href="#"
                    @click.prevent="handleVideoPopup(itemFirst)"
                    class="about__play-btn popup-video tp-pulse-border"
                  >
                    <span class="video-play-bg"></span>
                    <img
                      src="~/assets/img/about/6/about-play-icon.png"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4" v-for="(it, index) in items" :key="index">
            <div class="about__video-wrapper">
              <div class="about__video-thumb">
                <img
                  :src="it.video_file"
                  class="img-video-modal"
                  alt="about img"
                />
                <div class="about__play">
                  <a
                    href="#"
                    @click.prevent="handleVideoPopup(it)"
                    class="about__play-btn popup-video"
                  >
                    <span class="video-play-bg"></span>
                    <img
                      src="~/assets/img/about/6/about-play-icon.png"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="div-btn-annouce mt-15">
      <div class="col">
        <div class="tp-button-demo text-end">
          <NuxtLink to="/video" class="tp-btn-border-brown"
            >วิดีโอทั้งหมด</NuxtLink
          >
        </div>
      </div>
    </div>

    <video-modal
      ref="video_modal"
      :video-url="videoUrl"
      @update:videoUrl="videoUrl = $event"
    />
  </div>
</template>

<script setup>
import VideoModal from "~~/components/common/modals/VideoModal.vue";

const runtimeConfig = useRuntimeConfig();

const video_modal = ref(null);
const videoUrl = ref(null);

const items = ref([]);
const itemFirst = ref({});

const search = ref({
  is_publish: 1,
});

const fetchItems = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/video`, {
    params: {
      ...search.value,
      perPage: 4,
      currentPage: 1,
    },
  })
    .then((res) => {
      items.value = res.data;
      itemFirst.value = res.data[0];
      items.value.shift();
    })
    .catch((error) => error.data);
};
fetchItems();

const handleVideoPopup = (it) => {
  videoUrl.value = it.video_url;
  //   video_modal.value.playVideo();
};
</script>

<style scoped>
.tp-btn-border-brown {
  border-radius: 2em;
}

.text-custom-primary {
  color: #ff6600;
}

.btn-primary {
  background-color: #ff6600;
  /* color:#ff6600     */
}

.btn-primary {
  background-color: #ff6600;
  border-color: #ff6600;
}

.btn-primary:hover {
  background-color: #e65c00;
  border-color: #e65c00;
}

.about__play-btn {
  width: 30px;
  height: 30px;
  line-height: 30px;
}

.img-video-modal-first {
  height: 300px;
}

img-video-modal {
  height: 100px;
}

@media screen and (max-width: 480px) {
  .img-video-modal-first {
    height: 220px;
  }

  .img-video-modal {
    height: 220px;
  }
}
</style>
