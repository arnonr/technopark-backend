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
                  <NuxtLink href="/about"> รายการ</NuxtLink>
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
                <h5 class="card-title">แก้ไข</h5>
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
                          placeholder="หัวข้อข่าว"
                        />
                      </div>
                    </div>

                    <div class="col-md-12 mb-20">
                      <div class="">
                        <label for="">เนื้อหา</label>
                        <client-only>
                          <froala
                            :tag="'textarea'"
                            :config="config"
                            v-model="item.detail"
                          ></froala>
                        </client-only>
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

const item = ref({
  title: "",
  detail: "",
  is_publish: 1,
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

const { data: res } = await useAsyncData("about", async () => {
  let data = await $fetch(
    `${runtimeConfig.public.apiBase}/about/${route.params.id}`
  );
  return data;
});

item.value = { ...res.value.data };

// Method
const onSubmit = async () => {
  let data = {
    ...item.value,
    detail: item.value.detail.replace(
      '<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
      ""
    ),
  };

  await $fetch(`${runtimeConfig.public.apiBase}/about/${route.params.id}`, {
    method: "PUT",
    body: data,
  })
    .then((res) => {
      if (res.msg == "success") {
        localStorage.setItem("added", 1);
        console.log("About Add Success");
        router.push({
          path: "/about/" + res.id,
        });
      } else {
        console.log("error");
      }
    })
    .catch((error) => error.data);
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
