<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12" v-if="item != null">
          <div class="breadcrumb__content p-relative z-index-1">
            <div class="postbox__category">
              <NuxtLink
                :to="{
                  path: '/news',
                  query: { news_type_id: item.news_type_id },
                }"
              >
                ข่าว{{ item.news_type.name }}
              </NuxtLink>
            </div>
            <!-- <h4 class="breadcrumb__title">
                {{ item.title }}
              </h4> -->

            <div class="breadcrumb__list">
              <span>
                <NuxtLink
                  :to="{
                    path: '/',
                  }"
                >
                  หน้าหลัก
                </NuxtLink>
               </span>
              <span class="dvdr"><i class="fa-solid fa-circle-small"></i></span>
              <span>
                <NuxtLink href="/news"> ข่าวทั้งหมด</NuxtLink>
              </span>
              <span class="dvdr"><i class="fa-solid fa-circle-small"></i></span>
              <span> {{ item.title }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  -->
  <section class="postbox__area pt-40 pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="postbox__wrapper" v-if="item">
            <!-- Image -->
            <div class="postbox__top">
              <div class="postbox__thumb m-img mb-55">
                <img :src="item.news_file" alt="" />
              </div>
            </div>
            <!-- Content -->
            <div class="postbox__main">
              <div class="row">
                <div class="col-lg-12">
                  <div class="postbox__main-wrapper">
                    <div
                      class="postbox__meta-wrapper d-flex align-items-center flex-wrap"
                    >
                      <div class="postbox__meta-item">
                        <div class="postbox__meta-content">
                          <span class="postbox__meta-type">
                            <i class="fa fa-tag"></i>
                            {{ item.news_type ? item.news_type.name : "" }}
                          </span>
                        </div>
                      </div>
                      <div class="postbox__meta-item">
                        <div class="postbox__meta-content">
                          <span class="postbox__meta-type">
                            <i class="fa fa-calendar"></i>
                            {{
                              dayjs(item.created_news)
                                .locale("th")
                                .format("DD MMM BB")
                            }}
                          </span>
                        </div>
                      </div>
                      <div class="postbox__meta-item">
                        <div class="postbox__meta-content">
                          <span class="postbox__meta-type">
                            <i class="fa fa-eye"></i>
                            {{ item.count_views }} views
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="postbox__details-content-wrapper">
                      <h3>{{ item.title }}</h3>
                      <hr />
                      <div>{{ item.detail }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const item = ref(null);

const fetchItem = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/news/${route.params.id}`)
    .then((res) => {
      item.value = res.data;
    })
    .catch((error) => error.data);
};
fetchItem();

useHead({
  title: "ข่าวอุทยานเทคโนโลยี มจพ.",
});
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}
</style>
