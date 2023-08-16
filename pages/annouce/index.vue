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
                        placeholder="หัวข้อข่าว"
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
                <NuxtLink to="/annouce/add" class="btn btn-success">
                  <i class="fa fa-plus" />
                  เพิ่มข่าวประกาศ
                </NuxtLink>
              </div>
              <table
                class="table table-bordered table-striped table-list"
                v-if="items.length != 0"
              >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">หัวข้อข่าว</th>
                    <th scope="col">วันที่</th>
                    <th scope="col">ไฟล์</th>
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
                      {{
                        dayjs(it.created_annouce)
                          .locale("th")
                          .format("DD MMM BB")
                      }}
                    </td>
                    <td class="text-center">
                      <a
                        class="btn btn-sm btn-warning"
                        :href="it.annouce_file"
                        target="_blank"
                      >
                        <i class="fa fa-file-pdf"></i>
                      </a>
                    </td>
                    <td class="text-center">
                      <NuxtLink :to="`/annouce/edit/${it.id}`">
                        <button class="btn btn-primary btn-sm">
                          <i class="fa fa-edit" />
                        </button>
                      </NuxtLink>

                      <button class="btn btn-danger btn-sm ml-10" @click="onConfirmDelete(it.id)">
                        <i class="fa fa-trash" />
                      </button>
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
import Swal from "sweetalert2";
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
  newsTypes: [],
});

// Function Fetch
const fetchItems = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/annouce`, {
    params: {
      ...search.value,
      perPage: perPage.value.value,
      currentPage: currentPage.value,
      orderBy: "created_annouce",
      order: "desc",
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

const resetSearch = () => {
  search.value = {
    title: null,
    is_publish: 1,
  };
};

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
  await $fetch(`${runtimeConfig.public.apiBase}/annouce/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      fetchItems();
    //   router.push("/annouce");
    })
    .catch((error) => error.data);
};
</script>

<style scoped>
th {
  text-align: center;
}
</style>
