<template>
  <div
    v-if="item"
    :class="`blog__grid-item ${masonry ? 'blog__masonary' : ''} ${
      !item.video_file ? 'no-img' : ''
    }`"
  >
    <div
      class="blog__item-10 white-bg transition-3 mb-30 fix item-link"
      data-bs-toggle="modal"
      :data-bs-target="'#videoModal' + item.id"
    >
      <!-- data-bs-target="#exampleModal" -->
      <div class="blog__thumb-10 w-img fix">
        <img :src="item.video_file" alt="blog img" v-if="item.video_file" />
      </div>
      <div class="blog__content-10">
        <div class="blog__content-10-top">
          <h3 class="blog__title-10">
            <nuxt-link data-bs-toggle="modal" data-bs-target="#exampleModal">{{
              item.title
            }}</nuxt-link>
          </h3>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade modal-lg"
    :id="'videoModal' + item.id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static" 
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ item.title }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="stopVideos()"
          ></button>
        </div>
        <div class="modal-body">
          <iframe
            width="100%"
            height="500"
            :src="item.video_url"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  item: {},
  masonry: {
    type: Boolean,
    default: false,
  },
});

var stopVideos = function () {
  var videos = document.querySelectorAll("iframe, video");
  Array.prototype.forEach.call(videos, function (video) {
    if (video.tagName.toLowerCase() === "video") {
      video.pause();
    } else {
      var src = video.src;
      video.src = src;
    }
  });
};

</script>

<style scoped>
.blog__item-10 {
  border-radius: 0px;
  border: solid 1px #eee;
}

.text-color-primary {
  color: #fe6600;
}

.blog__grid-item .blog__content-10-top {
  padding: 1em;
  padding-top: 2em;
  min-height: 150px;
}

.blog__content-10-bottom {
  border-top: 0px;
  padding: 1em;
}

.blog__thumb-10 {
  max-height: 250px;
}
</style>
