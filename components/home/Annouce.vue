<template>
  <div class="" v-if="items.length != 0">
    <div class="row">
      <div class="col-md-12">
        <h4 class="text-custom-primary">ข่าวประกาศ</h4>
        <hr />
        <table class="table table-bordered table-striped table-news-document">
          <thead>
            <tr>
              <th style="width: 10px;" class="text-center">#</th>
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

    <div class="div-btn-annouce">
      <div class="col">
        <div class="tp-button-demo text-end">
          <NuxtLink to="/annouce" class="tp-btn-border-brown"
            >ข่าวประกาศทั้งหมด</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

const items = ref([]);

const search = ref({
  is_publish: 1,
});

const fetchItems = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/annouce`, {
    params: {
      ...search.value,
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
