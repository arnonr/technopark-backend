<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12" v-if="item != null">
          <div class="breadcrumb__content p-relative z-index-1">
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
  <section class="postbox__area pt-40 pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="mb-20 text-end">
            <NuxtLink
              :to="'/news/edit/' + item.id"
              class="btn btn-success"
              v-if="item"
            >
              <i class="fa fa-edit"></i>
              แก้ไข
            </NuxtLink>

            <button
              class="btn btn-danger ml-10"
              @click="onConfirmDelete(item.id)"
            >
              <i class="fa fa-trash"></i>
              ลบ
            </button>
          </div>
          <div class="card">
            <div class="card-body" v-if="item">
              <div>
                <h3 class="card-title">หัวข้อข่าว : {{ item.title }}</h3>
                <hr />
              </div>
              <div class="mb-10">
                <span class="fw-bold">ประเภทข่าว : </span>
                <span class="fst-italic">{{ item.news_type.name }}</span>
                <hr />
              </div>
              <div class="mb-10">
                <span class="fw-bold">รูปภาพปก : </span>
                <div class="text-center">
                  <img :src="item.news_file" style="width: 50%" />
                </div>
                <hr />
              </div>
              <div class="mb-10">
                <span class="fw-bold">เนื้อหาข่าว : </span>
                <div v-html="item.detail"></div>
                <hr />
              </div>
              <div>
                <span class="fw-bold">เผยแพร่ : </span>

                <span
                  :class="
                    'badge rounded-pill bg-' +
                    showPublish[item.is_publish].color
                  "
                  >{{ showPublish[item.is_publish].text }}</span
                >
                <hr />
              </div>
              <div>
                <span class="fw-bold">จำนวนผู้เข้าชม : </span>
                <span class="fst-italic">{{ item.count_views }}</span>
                <hr />
              </div>

              <div>
                <span class="fw-bold">วันที่ลงข่าว : </span>
                <span class="fst-italic">
                  {{
                    dayjs(item.created_news).locale("th").format("DD MMM BB")
                  }}</span
                >
                <hr />
              </div>

              <div class="news_gallery">
                <span class="fw-bold">แกลลอรี่ : </span>
                <div class="container-fluid g-0">
                  <div class="row gx-0">
                    <div class="col-xxl-12">
                      <div class="portfolio__slider-6">
                        <ClientOnly>
                          <Swiper
                            class="portfolio__slider-active-6 swiper-container"
                            :slidesPerView="5"
                            :spaceBetween="20"
                            :modules="modules"
                            :loop="true"
                            :speed="3000"
                            :autoplay="{
                              delay: 3000,
                            }"
                            :breakpoints="{
                              1600: {
                                slidesPerView: 5,
                              },
                              1200: {
                                slidesPerView: 4,
                              },
                              992: {
                                slidesPerView: 3,
                              },
                              768: {
                                slidesPerView: 3,
                              },
                              576: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                              },
                              0: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                              },
                            }"
                          >
                            <SwiperSlide
                              v-for="(item, i) in newsGallery"
                              :key="item.id"
                              :class="`portfolio__item-6 ${
                                isActive ? '' : 'active'
                              } transition-3`"
                            >
                              <div
                                class="portfolio__thumb-6 fix"
                                @mouseover="isActive = true"
                                @mouseleave="isActive = false"
                              >
                                <a
                                  @click.prevent="handleImagePopup(i)"
                                  class="popup-image"
                                  href="#"
                                >
                                  <img
                                    :src="item.news_gallery_file"
                                    alt="image"
                                    style="width: 100%"
                                  />
                                </a>
                              </div>
                            </SwiperSlide>
                          </Swiper>
                        </ClientOnly>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <image-popup
      ref="image_popup"
      :images="newsGallery.map((item) => item.news_gallery_file)"
    />
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper";
import ImagePopup from "~~/components/common/modals/ImagePopup.vue";
// portfolio images
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import Swal from "sweetalert2";

dayjs.extend(buddhistEra);

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const modules = [Autoplay];
const image_popup = ref(null);

const newsGallery = ref([]);
const isActive = ref(false);

const item = ref(null);
const showPublish = [
  { text: "None", color: "secondary" },
  { text: "Publish", color: "success" },
];

// if (localStorage.getItem("added") == 1) {
//   //   snackbarText.value = "Added News";
//   //   snackbarColor.value = "success";
//   //   isSnackbarVisible.value = true;
//   localStorage.removeItem("added");
// }

// Fetch
const { data: res } = await useAsyncData("news-gallery", async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/news-gallery`, {
    params: {
      is_publish: 1,
      news_id: route.params.id,
    },
  });
  return data;
});

newsGallery.value = [...res.value.data];

const fetchItem = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/news/${route.params.id}`)
    .then((res) => {
      item.value = res.data;
    })
    .catch((error) => error.data);
};
fetchItem();

// Method
const onConfirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(id);
    }
  });
};

const onDelete = async (id) => {
  await $fetch(`${runtimeConfig.public.apiBase}/news/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      router.push("/news");
    })
    .catch((error) => error.data);
};

const handleImagePopup = (index) => {
  image_popup.value.showImg(index);
};
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}
</style>
