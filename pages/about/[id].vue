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
                <NuxtLink href="/about"> ข่าวทั้งหมด</NuxtLink>
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
              :to="'/about/edit/' + item.id"
              class="btn btn-success"
              v-if="item"
            >
              <i class="fa fa-edit"></i>
              แก้ไข
            </NuxtLink>
          </div>
          <div class="card">
            <div class="card-body" v-if="item">
              <div>
                <h3 class="card-title">หัวข้อ : {{ item.title }}</h3>
                <hr />
              </div>
              <div class="mb-10">
                <span class="fw-bold">เนื้อหา : </span>
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

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// portfolio images
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import Swal from "sweetalert2";

dayjs.extend(buddhistEra);

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();


const item = ref(null);
const showPublish = [
  { text: "None", color: "secondary" },
  { text: "Publish", color: "success" },
];

// Fetch
const fetchItem = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/about/${route.params.id}`)
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
  await $fetch(`${runtimeConfig.public.apiBase}/about/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      router.push("/about");
    })
    .catch((error) => error.data);
};

</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}
</style>
