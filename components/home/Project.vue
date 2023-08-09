<template>
  <section
    :class="`brand__area ${el_style ? 'pt-30' : ''}`"
    style="background-color: #ffd8be"
  >
    <div class="container">
      <div
        class="brand__item-wrapper-6 d-flex flex-wrap justify-content-between"
      >
        <div
          class="brand__item-6"
          v-for="(it, index) in project"
          :key="index"
          style="margin-bottom: 30px"
        >
          <a href="#" class="project-link-img">
            <img :src="it.project_file" :alt="it.name" />
            <br />
            <span class="fw-bold">{{ it.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  el_style: {
    type: Boolean,
    default: true,
  },
});

const project = ref([
  {
    name: "ศูนย์ปฏิบัติการ",
    project_file: "/images/iconwebtechnopark/center_black.png",
    url: "#",
  },
  {
    name: "หลักสูตร",
    project_file: "/images/iconwebtechnopark/program_black.png",
    url: "#",
  },
  {
    name: "65 ปี มจพ.",
    project_file: "/images/iconwebtechnopark/65_black.png",
    url: "#",
  },
  {
    name: "ผลงานโดดเด่น",
    project_file: "/images/iconwebtechnopark/project_black.png",
    url: "#",
  },
]);
</script>

<style scoped>
.brand__item-6 img {
  opacity: 1;
}

.brand__item-6 > .project-link-img:hover {
  /* https://angel-rs.github.io/css-color-filter-generator/ */
  filter: brightness(0) saturate(100%) invert(55%) sepia(77%) saturate(4539%)
    hue-rotate(0deg) brightness(101%) contrast(106%);
}

</style>
