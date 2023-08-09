<template>
  <section class="portfolio__area pt-40 pb-40">
    <div class="container" v-if="items.length != 0">
      <div class="row">
        <div class="col-xxl-12">
          <div class="portfolio__masonary-btn-2 text-center mb-50">
            <div
              class="masonary-menu filter-button-group"
              v-if="newsType.length != 0"
            >
              <button
                v-for="(nt, i) in newsType"
                :key="i"
                @click="onChangeNewsType(nt.id, nt.category)"
                :class="`${nt.category === activeCategory ? 'active' : ''}`"
              >
                <!-- @click="handleCategoryItem(cate)"
                :class="`${cate === activeCategory ? 'active' : ''}`" -->
                {{ nt.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row gx-2 grid">
        <div
          v-for="(it, i) in items"
          :key="i"
          class="col-xxl-3 col-xl-3 col-lg-6 col-md-6"
        >
          <news-grid-item :item="it" />
        </div>
      </div>

      <div class="div-btn-news">
        <div class="col">
          <div class="tp-button-demo text-end">
            <NuxtLink to="/news" class="tp-btn-border-brown"
              >ข่าวทั้งหมด</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import NewsGridItem from "~/components/news/NewsGridItem.vue";

const runtimeConfig = useRuntimeConfig();

const items = ref([]);
const newsType = ref([]);
const activeCategory = ref("news-all");

const search = ref({
  news_type_id: undefined,
  is_publish: 1,
});

const fetchNewsType = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/news-type`, {
    params: {
      is_publish: 1,
    },
  })
    .then((res) => {
      let d = res.data.map((e) => {
        e.category = "news-" + e.name;
        return e;
      });

      d.unshift({
        id: null,
        name: "ข่าวทั้งหมด",
        category: "news-all",
      });

      newsType.value = d;
    })
    .catch((error) => error.data);
};
fetchNewsType();

const fetchItems = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/news`, {
    params: {
      ...search.value,
      news_type_id:
        search.value.news_type_id == null
          ? undefined
          : search.value.news_type_id,
      perPage: 8,
      currentPage: 1,
    },
  })
    .then((res) => {
      items.value = res.data;
    })
    .catch((error) => error.data);
};
fetchItems();

const onChangeNewsType = async (id, category) => {
  search.value.news_type_id = id;
  await fetchItems();
  activeCategory.value = category;
  search.value.news_type_id = id;
  //
};
</script>

<style scoped>
.tp-btn-border-brown {
  border-radius: 2em;
}
</style>
