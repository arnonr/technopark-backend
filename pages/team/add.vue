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
                  <NuxtLink href="/team"> รายการบุคลากร</NuxtLink>
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
                <h5 class="card-title">เพิ่มบุคลากร</h5>
                <hr />
                <div>
                  <div class="row">
                    <div class="col-md-2 mb-20">
                      <div class="">
                        <label for="">คำนำหน้า</label>
                        <input
                          class="form-control"
                          v-model="item.prefix"
                          name="prefix"
                          type="text"
                          placeholder="คำนำหน้า"
                        />
                      </div>
                    </div>

                    <div class="col-md-5 mb-20">
                      <div class="">
                        <label for="">ชื่อ</label>
                        <input
                          class="form-control"
                          v-model="item.firstname"
                          name="firstname"
                          type="text"
                          placeholder="ชื่อ"
                        />
                      </div>
                    </div>

                    <div class="col-md-5 mb-20">
                      <div class="">
                        <label for="">นามสกุล</label>
                        <input
                          class="form-control"
                          v-model="item.surname"
                          name="surname"
                          type="text"
                          placeholder="นามสกุล"
                        />
                      </div>
                    </div>
                    <div class="col-md-12 mb-20">
                      <div class="">
                        <label for="formFile" class="form-label">รูป</label>
                        <input
                          ref="file"
                          class="form-control"
                          type="file"
                          id="formFile"
                          @change="onFileChanged($event)"
                        />
                      </div>
                    </div>

                    <div class="col-md-4 mb-20">
                      <div class="">
                        <label for="">หน่วยงาน</label>
                        <v-select
                          v-if="selectOptions.departments.length != 0"
                          label="title"
                          :options="selectOptions.departments"
                          v-model="item.department_id"
                          class="form-control"
                          :clearable="true"
                        ></v-select>
                      </div>
                    </div>

                    <div class="col-md-4 mb-20">
                      <div class="">
                        <label for="">ฝ่ายงาน</label>
                        <input
                          class="form-control"
                          v-model="item.position_level"
                          name="position_level"
                          type="text"
                          placeholder="ฝ่ายงาน"
                        />
                      </div>
                    </div>

                    <div class="col-md-4 mb-20">
                      <div class="">
                        <label for="">ตำแหน่งงาน</label>
                        <input
                          class="form-control"
                          v-model="item.position"
                          name="position"
                          type="text"
                          placeholder="ตำแหน่งงาน"
                        />
                      </div>
                    </div>

                    <div class="col-md-4 mb-20">
                      <div class="">
                        <label for="">เบอร์โทรศัพท์</label>
                        <input
                          class="form-control"
                          v-model="item.phone"
                          name="phone"
                          type="text"
                          placeholder="เบอร์โทรศัพท์"
                        />
                      </div>
                    </div>


                    <div class="col-md-4 mb-20">
                      <div class="">
                        <label for="">อีเมล</label>
                        <input
                          class="form-control"
                          v-model="item.email"
                          name="email"
                          type="text"
                          placeholder="email"
                        />
                      </div>
                    </div>

                    <div class="col-md-4 mb-20">
                      <div class="">
                        <label for="">ลำดับ</label>
                        <input
                          class="form-control"
                          v-model="item.level"
                          name="level"
                          type="text"
                          placeholder="ลำดับ"
                        />
                      </div>
                    </div>

                    <div class="col-md-4 mb-20">
                      <div class="">
                        <label for="">เผยแพร่</label>
                        <input
                          class="form-control"
                          v-model="item.is_publish"
                          name="surname"
                          type="text"
                          placeholder="นามสกุล"
                        />
                      </div>
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
import Swal from "sweetalert2";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

dayjs.extend(buddhistEra);

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const selectOptions = ref({
  departments: [],
});

const item = ref({
  prefix: "",
  firstname: "",
  surname: "",
  position: "",
  position_level: "",
  department_id: { title: "", value: null },
  phone: "",
  email: "",
  level: "",
  is_publish: 1,
  team_file: null,
});

const file = ref(null);

const fetchDepartments = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/department`, {
    params: {
      is_publish: 1,
    },
  })
    .then((res) => {
      selectOptions.value.departments = res.data.map((e) => {
        let d = {
          title: e.name,
          value: e.id,
        };
        return d;
      });
    })
    .catch((error) => error.data);
};
fetchDepartments();

// Method
const onSubmit = async () => {
  let data = {
    ...item.value,
    team_file: file.value.files != null ? file.value.files[0] : null,
    department_id: item.value.department_id.value,
  };

  var form_data = new FormData();

  for (var key in data) {
    form_data.append(key, data[key]);
  }

  await $fetch(`${runtimeConfig.public.apiBase}/team`, {
    method: "POST",
    body: form_data,
  })
    .then((res) => {
      if (res.msg == "success") {
        localStorage.setItem("added", 1);
        console.log("Team Add Success");
        router.push({
          path: "/team/" + res.id,
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
