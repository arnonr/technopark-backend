<template>
  <div>
    <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
      <div class="container">
        <div class="row">
          <div class="col-xxl-12">
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
                <span class="dvdr"
                  ><i class="fa-solid fa-circle-small"></i
                ></span>
                <span>
                  <NuxtLink href="/annouce"> รายการข่าวประกาศ</NuxtLink>
                </span>
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
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">แก้ไขข่าวประกาศ</h5>
                <hr />
                <div>
                  <div class="row">
                    <div class="col-md-12 mb-20">
                      <div class="">
                        <label for="">หัวข้อ</label>
                        <input
                          class="form-control"
                          v-model="item.title"
                          name="title"
                          type="text"
                          placeholder="หัวข้อ"
                        />
                      </div>
                    </div>
                    <div class="col-md-12 mb-20">
                      <div class="row">
                        <div class="col-md-12">
                          <label for="formFile" class="form-label"
                            >ไฟล์</label
                          >
                        </div>
                        <div class="col-md-10">
                          <input
                            ref="file"
                            class="form-control"
                            type="file"
                            id="formFile"
                            @change="onFileChanged($event)"
                          />
                        </div>
                        <div class="col-md-2">
                          <a
                            :href="item.annouce_file_old"
                            target="_blank"
                            class="btn btn-primary"
                            style="width: 100%"
                          >
                            View Old File
                          </a>
                        </div>
                      </div>
                    </div>


                    <div class="col-md-12 mb-20">
                      <label for="">วันที่ลงข่าว</label>
                      <VueDatePicker
                        v-model="item.created_annouce"
                        :enable-time-picker="false"
                        locale="th"
                        auto-apply
                        :format="format"
                      >
                        <template #year-overlay-value="{ text }">
                          {{ parseInt(text) + 543 }}
                        </template>
                        <template #year="{ year }">
                          {{ year + 543 }}
                        </template>
                      </VueDatePicker>
                    </div>

                    <div class="col-md-12 mt-20">
                      <div class="contact__btn-2">
                        <button class="btn btn-success" @click="onSubmit">
                          Save
                        </button>
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
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

dayjs.extend(buddhistEra);

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const format = (date) => {
  const day = dayjs(date).locale("th").format("DD");
  const month = dayjs(date).locale("th").format("MMM");
  const year = date.getFullYear() + 543;

  return `${day} ${month} ${year}`;
};

const item = ref({
  title: "",
  created_annouce: dayjs(),
  is_publish: 1,
  annouce_file: null,
  annouce_file_old: null,
});

const file = ref(null);

// Fetch
const { data: res } = await useAsyncData("annouce", async () => {
  let data = await $fetch(
    `${runtimeConfig.public.apiBase}/annouce/${route.params.id}`
  );
  return data;
});

item.value = { ...res.value.data };
item.value.annouce_file_old = res.value.data.annouce_file;
item.value.annouce_file = null;

// Method
const onSubmit = async () => {
  let data = {
    ...item.value,
    annouce_file: file.value.files != null ? file.value.files[0] : [],
    created_annouce:
      item.value.created_annouce != ""
        ? dayjs(item.value.created_annouce).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
  };

  var form_data = new FormData();

  for (var key in data) {
    form_data.append(key, data[key]);
  }
  await $fetch(`${runtimeConfig.public.apiBase}/annouce/${route.params.id}`, {
    method: "PUT",
    body: form_data,
  })
    .then((res) => {
      if (res.msg == "success") {
        localStorage.setItem("added", 1);
        console.log("Annouce Add Success");
        router.push({
          path: "/annouce",
        });
      } else {
        console.log("error");
      }
    })
    .catch((error) => error.data);
};

const onFileChanged = ($event) => {
  console.log("selected file", file.value.files);
};

onMounted(() => {
  //   initFroala();
});
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}
</style>
