<template>
  <div
    v-if="item"
    :class="`blog__grid-item ${masonry ? 'blog__masonary' : ''} ${
      !item.news_file ? 'no-img' : ''
    }`"
  >
    <div class="blog__item-10 white-bg transition-3 mb-30 fix">
      <div class="blog__thumb-10 w-img fix">
        <nuxt-link v-if="item.news_file" :to="'news/' + item.id">
          <img :src="item.news_file" alt="blog img" />
        </nuxt-link>
      </div>
      <div class="blog__content-10">
        <div class="blog__content-10-top">
          <div v-if="!item.news_file" class="blog__tag-10">
            <a href="#">{{ item.news_type.name }}</a>
          </div>

          <h3 class="blog__title-10">
            <nuxt-link :to="'news/' + item.id">{{ item.title }}</nuxt-link>
          </h3>
        </div>
        <div
          class="blog__content-10-bottom d-flex align-items-center justify-content-between"
        >
          <div class="blog__meta-author-10 d-flex align-items-center">
            <div class="blog__meta-author-content-10">
              <nuxt-link
                v-if="item.news_file"
                :to="'news/' + item.id"
                class="text-color-primary"
              >
                อ่านต่อ <i class="fa fa-arrow-right news-link-view"></i>
              </nuxt-link>
            </div>
          </div>
          <div class="blog__meta-10 blog-meta-10-2">
            <span>
              {{ item.news_type.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {},
    masonry: {
      type: Boolean,
      default: false,
    },
  },
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
  min-height: 250px;
}

.blog__content-10-bottom {
  border-top: 0px;
  padding: 1em;
}
</style>
