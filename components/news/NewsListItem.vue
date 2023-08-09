<template>
  <div class="blog__list-item">
    <div class="blog__item-10 white-bg transition-3 fix">
      <div class="row">
        <div class="col-xl-5 col-lg-12 col-md-6">
          <nuxt-link :href="'/news/' + item.id">
            <div class="blog__thumb-10 w-img fix">
              <img :src="item.news_file" alt="" /></div
          ></nuxt-link>
        </div>
        <div class="col-xl-7 col-lg-12 col-md-6">
          <nuxt-link :href="'/news/' + item.id">
            <div class="blog__content-10">
              <div class="blog__content-10-top">
                <h3 class="blog__title-10">
                  {{ item.title }}
                </h3>

                <p style="text-align: justify; text-indent: 2em">
                  {{ item.detail.slice(0, 400) }}...
                </p>
              </div>

              <div
                class="blog__content-10-bottom d-flex align-items-center flex-wrap"
              >
                <div class="blog__meta-author-10 d-flex align-items-center">
                  <div class="blog__meta-author-content-10">
                    <span>
                      <i class="fa fa-tag"></i>
                      {{ item.news_type.name }}
                    </span>
                  </div>
                  <div class="blog__meta-author-content-10 pl-20">
                    <span>
                      <i class="fa fa-calendar"></i>
                      {{
                        dayjs(item.created_news)
                          .locale("th")
                          .format("DD MMM BB")
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

export default {
  props: {
    item: {},
  },
  setup() {
    dayjs.extend(buddhistEra);
  },
  data() {
    return {
      dayjs,
    };
  },
};
</script>

<style scoped>
.blog__list-item .blog__thumb-10 {
  width: 100%;
  height: 100%;
}

.blog__list-item {
  padding-right: 25px;
}

.blog__title-10 {
  color: #ff6600;
}
</style>
