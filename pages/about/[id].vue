<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12" v-if="item != null">
          <div class="breadcrumb__content p-relative z-index-1">
            <h4 class="breadcrumb__title">
                {{ item.title }}
              </h4>

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
            <!-- Content -->
            <div class="postbox__main">
              <div class="row">
                <div class="col-lg-12">
                  <div class="postbox__main-wrapper">
                    <div class="postbox__details-content-wrapper">
                      
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
  await $fetch(`${runtimeConfig.public.apiBase}/about/${route.params.id}`)
    .then((res) => {
      item.value = res.data;
    })
    .catch((error) => error.data);
};
fetchItem();

useHead({
  title: 'เกี่ยวกับเรา อุทยานเทคโนโลยี มจพ.',
});
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}
</style>
