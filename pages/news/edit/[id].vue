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
                  <NuxtLink href="/news"> รายการข่าว</NuxtLink>
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
                <h5 class="card-title">แก้ไขข่าว</h5>
                <hr />
                <div>
                  <div class="row">
                    <div class="col-md-12 mb-20">
                      <div class="">
                        <label for="">หัวข้อข่าว</label>
                        <input
                          class="form-control"
                          v-model="item.title"
                          name="title"
                          type="text"
                          placeholder="หัวข้อข่าว"
                        />
                      </div>
                    </div>
                    <div class="col-md-12 mb-20">
                      <div class="row">
                        <div class="col-md-12">
                          <label for="formFile" class="form-label"
                            >รูปภาพปก</label
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
                            :href="item.news_file_old"
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
                      <div class="">
                        <label for="">ประเภท</label>
                        <v-select
                          v-if="selectOptions.newsTypes.length != 0"
                          label="title"
                          :options="selectOptions.newsTypes"
                          v-model="item.news_type_id"
                          class="form-control"
                          :clearable="true"
                        ></v-select>
                      </div>
                    </div>

                    <div class="col-md-12 mb-20">
                      <div class="">
                        <label for="">เนื้อหาข่าว</label>
                        <client-only>
                          <froala
                            :tag="'textarea'"
                            :config="config"
                            v-model="item.detail"
                          ></froala>
                        </client-only>
                      </div>
                    </div>

                    <div class="col-md-12 mb-20">
                      <label for="">วันที่ลงข่าว</label>
                      <VueDatePicker
                        v-model="item.created_news"
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

                    <div class="col-md-12 mb-20">
                      <label for="news_file">แกลลอรี</label>
                      <client-only>
                        <dashboard
                          :uppy="uppy"
                          ref="dash"
                          style="width: 100%"
                          :props="{
                            doneButtonHandler: null,
                            hideCancelButton: true,
                            showRemoveButtonAfterComplete: true,
                          }"
                        />
                      </client-only>
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/vue";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import XHRUpload from "@uppy/xhr-upload";

dayjs.extend(buddhistEra);

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const selectOptions = ref({
  newsTypes: [],
});

const r = (Math.random() + 1).toString(36).substring(7);

const uppy = new Uppy({
  meta: { news_id: route.params.id, secret_key: r, news_gallery_id: null },
  debug: true,
  restrictions: {
    allowedFileTypes: ["image/*", "video/*"],
  },
}).use(XHRUpload, {
  endpoint: `${runtimeConfig.public.apiBase}/froala/uppy`,
  fieldName: "file",
});

uppy.on("upload-success", (file, response) => {
  uppy.setFileMeta(file.id, {
    url: response.body.link,
    news_id: response.body.news_id,
    news_gallery_id: response.body.news_gallery_id,
  });
});

uppy.on("file-removed", (file, reason) => {
  console.log(file, reason);
  if (file.meta.news_gallery_id != null) {
    $fetch(
      `${runtimeConfig.public.apiBase}/news-gallery/${file.meta.news_gallery_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.msg == "success") {
          console.log("success");
        } else {
          console.log("error");
        }
      })
      .catch((error) => error.data);
  }
});

const format = (date) => {
  const day = dayjs(date).locale("th").format("DD");
  const month = dayjs(date).locale("th").format("MMM");
  const year = date.getFullYear() + 543;

  return `${day} ${month} ${year}`;
};

const item = ref({
  title: "",
  news_type_id: { title: "", code: null },
  title: "",
  detail: "",
  created_news: dayjs(),
  is_publish: 1,
  news_file: null,
  news_file_old: null,
});

const file = ref(null);

const config = ref({
  height: 300,
  // inlineMode: false,
  pastePlain: true,
  paragraphy: false,
  quickInsertEnabled: false,
  toolbarButtons: [
    "undo",
    "redo",
    "fullscreen",
    "|",
    "fontSize",
    "color",
    "bold",
    "italic",
    "underline",
    "inlineClass",
    "|",
    "paragraphFormat",
    "align",
    "outdent",
    "indent",
    "|",
    "formatOL",
    "formatUL",
    "quote",
    "-",
    "insertLink",
    "insertImage",
    "insertVideo",
    "insertFile",
    "insertTable",
    "|",
    "fontAwesome",
    "insertHR",
    "selectAll",
    "clearFormatting",
    "|",
    "print",
    "getPDF",
    "html",
  ],
  // Change buttons for XS screen.
  toolbarButtonsXS: [
    ["undo", "redo"],
    ["bold", "italic", "underline"],
  ],
  placeholderText: "",
  attribution: false,
  key: "enter-your-license-key-here",
  disableRightClick: true,

  imageUploadURL: `${runtimeConfig.public.apiBase}/froala/image`,
  imageAllowedTypes: ["jpeg", "jpg", "png"],

  fileUploadURL: `${runtimeConfig.public.apiBase}/froala/document`,
  videoUploadURL: `${runtimeConfig.public.apiBase}/froala/video`,

  // fileUpload: false,
  // imageUpload: false,
  imagePaste: false,
  imagePasteProcess: false,
  imageResize: true,
  crossDomain: true,
  events: {
    keyup: function (inputEvent) {
      item.value.detail = this.html.get();
    },
    click: function (clickEvent) {
      item.value.detail = this.html.get();
    },
    "commands.after": function (cmd, param1, param2) {
      item.value.detail = this.html.get();
    },
    "paste.after": function (pasteEvent) {
      item.value.detail = this.html.get();
    },
    initialized: function () {
      this.html.insert(item.value.detail);
    },
  },
});
// Fetch
const fetchNewsType = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/news-type`, {
    params: {
      is_publish: 1,
    },
  })
    .then((res) => {
      selectOptions.value.newsTypes = res.data.map((e) => {
        let d = {
          title: e.name,
          code: e.id,
        };
        return d;
      });
    })
    .catch((error) => error.data);
};
fetchNewsType();

const { data: res } = await useAsyncData("news", async () => {
  let data = await $fetch(
    `${runtimeConfig.public.apiBase}/news/${route.params.id}`
  );
  return data;
});

item.value = { ...res.value.data };
item.value.news_file_old = res.value.data.news_file;
item.value.news_file = null;

item.value.news_type_id = {
  title: res.value.data.news_type.name,
  code: res.value.data.news_type_id,
};

const fetchNewsGallery = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/news-gallery`, {
    params: {
      is_publish: 1,
      news_id: route.params.id,
    },
  })
    .then(async (res) => {
      let newsGallery = res.data;

      console.log(res.data);
      for (let i = 0; i < newsGallery.length; i++) {
        await fetch(newsGallery[i].news_gallery_file)
          .then((response) => response.blob())
          .then((blob) => {
            uppy.addFile({
              name: null,
              type: blob.type,
              data: blob,
              meta: {
                relativePath: newsGallery[i].news_gallery_file,
                news_id: newsGallery[i].news_id,
                news_gallery_id: newsGallery[i].id,
                secret_key: newsGallery[i].secret_key,
                isRemote: true,
              },
              source: "Local",
              isRemote: false,
            });
          });
      }
      //

      //
      uppy.getFiles().forEach((file) => {
        uppy.setFileState(file.id, {
          progress: { uploadComplete: true, uploadStarted: true },
        });
      });
    })
    .catch((error) => error.data);
};

fetchNewsGallery();

// Method
const onSubmit = async () => {
  let data = {
    ...item.value,
    news_file: file.value.files != null ? file.value.files[0] : [],
    news_type_id: item.value.news_type_id.code,
    news_type: undefined,
    detail: item.value.detail.replace(
      '<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
      ""
    ),
    created_news:
      item.value.created_news != ""
        ? dayjs(item.value.created_news).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
  };

  var form_data = new FormData();

  for (var key in data) {
    form_data.append(key, data[key]);
  }
  await $fetch(`${runtimeConfig.public.apiBase}/news/${route.params.id}`, {
    method: "PUT",
    body: form_data,
  })
    .then((res) => {
      if (res.msg == "success") {
        localStorage.setItem("added", 1);
        console.log("News Add Success");
        router.push({
          path: "/news/" + res.id,
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
