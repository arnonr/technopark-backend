<template>
  <section class="portfolio__area pt-40 pb-40">
    <div class="container" v-if="items.length != 0">
      <div class="row">
        <div class="col-md-12">
          <h4 class="text-custom-primary">ข่าวประกาศ</h4>
          <hr />
          <table class="table table-bordered table-striped table-news-document">
            <thead>
              <tr>
                <th style="width: 10px" class="text-center">#</th>
                <th style="width: 70%">หัวข้อข่าวประกาศ</th>
                <th class="text-center">ดาวน์โหลด</th>
              </tr>
            </thead>
            <tbody v-if="items.length != 0">
              <tr v-for="(it, index) in items" :key="it.id">
                <td class="text-center">
                  {{ index + 1 }}
                </td>
                <td>
                  <a :href="it.annouce_file" target="_blank">{{ it.title }}</a>
                </td>
                <td class="text-center">
                  <a :href="it.annouce_file" target="_blank">
                    <button type="button" class="btn btn-primary btn-sm">
                      <i class="fa fa-file-pdf"></i>
                    </button>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-xxl-12">
        <div class="tp-pagination mt-30">
          <blog-pagination
            :totalPage="totalPage"
            :currentPage="currentPage"
            @update:currentPage="currentPage = $event"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import
import BlogPagination from "~/components/common/pagination/BlogPagination.vue";
const runtimeConfig = useRuntimeConfig();

// Variable
const items = ref([]);
const perPage = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);

const search = ref({
  is_publish: 1,
});

// Function Fetch
const fetchItems = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/annouce`, {
    params: {
      ...search.value,
      perPage: perPage.value,
      currentPage: currentPage.value,
    },
  })
    .then((res) => {
      items.value = res.data;
      totalPage.value = res.totalPage;
      totalItems.value = res.totalData;
    })
    .catch((error) => error.data);
};
fetchItems();

onMounted(() => {});

watchEffect(fetchItems);

watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

useHead({
  title: "ข่าวประกาศ อุทยานเทคโนโลยี มจพ.",
});
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
</style>
