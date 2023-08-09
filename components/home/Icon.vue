<template>
  <section :class="`brand__area ${el_style ? 'pt-30' : ''}`">
    <div class="container">
      <div
        class="brand__item-wrapper-6 d-flex flex-wrap justify-content-between"
        v-if="icons.length != 0"
      >
        <div
          class="brand__item-6"
          v-for="(it, index) in icons"
          :key="index"
          style="margin-bottom: 30px"
        >
          <a href="#" class="project-link-img">
            <img :src="it.icon_file" :alt="it.name" style="width: 80%;"/>
            <br /><br />    
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

const icons = ref([
  {
    id: 1,
    name: "Green",
    icon_file: "/images/iconwebtechnopark/icon_green.png",
    url: "https://www.google.com/",
  },
  {
    id: 2,
    name: "KM",
    icon_file: "/images/iconwebtechnopark/icon_km.png",
    url: "https://www.google.com/",
  },
  {
    id: 3,
    name: "MOU",
    icon_file: "/images/iconwebtechnopark/icon_mou.png",
    url: "https://www.google.com/",
  },
  {
    id: 4,
    name: "Standard",
    icon_file: "/images/iconwebtechnopark/icon_standard.png",
  },
]);
</script>

<style scoped></style>
