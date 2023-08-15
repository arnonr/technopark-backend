<template>
  <section class="portfolio__area pt-40 pb-40">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12 mb-20">
          <!-- Search -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">ค้นหา</h5>
              <hr />
              <div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="">
                      <label for="">หัวข้อ</label>
                      <input
                        class="form-control"
                        v-model="search.title"
                        name="title"
                        type="text"
                        placeholder="หัวข้อ"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="">จำนวนรายการ/หน้า</label>
                    <v-select
                      label="title"
                      :options="selectOptions.perPage"
                      v-model="perPage"
                      class="form-control"
                    ></v-select>
                  </div>

                  <div class="col-md-12 mt-20">
                    <div class="contact__btn-2">
                      <button class="btn btn-danger" @click="resetSearch">
                        ล้าง
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-xl-12">
              <div class="text-end mb-20">
                <NuxtLink to="/news/add"  class="btn btn-success">
                    <i class="fa fa-plus" />
                    เพิ่ม
                </NuxtLink>
              </div>
              <table
                class="table table-bordered table-striped table-list"
                v-if="items.length != 0"
              >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">หัวข้อ</th>
                    <th scope="col">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(it, index) in items" :key="index">
                    <th scope="row">
                      {{
                        currentPage != 1
                          ? index + 1 + (currentPage - 1) * perPage.value
                          : index + 1
                      }}
                    </th>
                    <td>{{ it.title }}</td>
                    <td class="text-center">
                      <NuxtLink :to="`/about/${it.id}`">
                        <button class="btn btn-primary">
                          <i class="fa fa-edit" />
                        </button>
                      </NuxtLink>
                      <NuxtLink
                        target="_blank"
                        :href="`http://technopark.kmutnb.ac.th/about/${it.id}`"
                      >
                        <button class="btn btn-warning ml-10">
                          <i class="fa fa-eye" />
                        </button>
                      </NuxtLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-xxl-12" v-if="items.length != 0">
              <div class="tp-pagination mt-30">
                <blog-pagination
                  :totalPage="totalPage"
                  :currentPage="currentPage"
                  @update:currentPage="currentPage = $event"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import BlogPagination from "~/components/common/pagination/BlogPagination.vue";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
dayjs.extend(buddhistEra);
// Variable
// const route = useRoute();
// const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const items = ref([]);
const perPage = ref({ title: "20", value: 20 });
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);
const search = ref({
  title: null,
  news_type_id: undefined,
  is_publish: 1,
});


const selectOptions = ref({
  perPage: [
    { title: "2", value: 2 },
    { title: "20", value: 20 },
    { title: "40", value: 40 },
    { title: "60", value: 60 },
  ],
  orderBy: [{ title: "ลำดับ/level", value: "level" }],
  order: [
    { title: "น้อย -> มาก", value: "asc" },
    { title: "มาก -> น้อย", value: "desc" },
  ],
});

const fetchItems = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/about`, {
    params: {
      ...search.value,
      perPage: perPage.value.value,
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

watchEffect(fetchItems);
// Function Change
onMounted(() => {});

watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

const showPublish = [
  { text: "None", color: "secondary" },
  { text: "Publish", color: "success" },
];

const resetSearch = () => {
  search.value = {
    title: null,
    is_publish: 1,
  };
};
</script>

<style scoped>
th {
  text-align: center;
}
</style>
