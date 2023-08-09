<template>
  <nav>
    <ul>
      <li>
        <NuxtLink
          :class="
            'tp-pagination-prev prev page-numbers page-link ' + prevBtnClass
          "
          @click="onChangePage('prev')"
        >
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.17749 10.105L1.62499 5.55248L6.17749 0.999981"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.3767 5.55249L1.75421 5.55249"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Prev
        </NuxtLink>
      </li>
      <li v-for="(it, index) in numPage" :key="index" class="page-link">
        <NuxtLink
          @click="onChangePage(it)"
          :class="currentPage == it ? 'current' : ''"
          >{{ it }}</NuxtLink
        >
      </li>
      <!-- 
      <li>
        <span class="current">2</span>
      </li>
      <li>
        <NuxtLink href="/blog">3</NuxtLink>
      </li> -->
      <li>
        <NuxtLink
          :class="'next page-numbers page-link ' + nextBtnClass"
          @click="onChangePage('next')"
        >
          Next
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.82422 1L14.3767 5.5525L9.82422 10.105"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.625 5.55249H14.2475"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps(["currentPage", "totalPage"]);
const emit = defineEmits(["update:currentPage"]);
const prevBtnClass = ref("");
const nextBtnClass = ref("");
const numPage = ref([1, 2, 3]);

if (props.currentPage == 1) {
  prevBtnClass.value = "page-link-disabled";
  if (props.totalPage == 1) {
    numPage.value = [1];
  }

  if (props.totalPage == 2) {
    numPage.value = [1,2];
  }
} else {
  prevBtnClass.value = "";
}
if (props.currentPage == props.totalPage) {
  nextBtnClass.value = "page-link-disabled";
} else {
  nextBtnClass.value = "";
}

watch(
  () => [props.currentPage, props.totalPage],
  ([newsCurrentPage, newsTotalPage]) => {
    if (newsCurrentPage == 1) {
      prevBtnClass.value = "page-link-disabled";
    } else {
      prevBtnClass.value = "";
    }
    if (newsCurrentPage == newsTotalPage) {
      nextBtnClass.value = "page-link-disabled";
    } else {
      nextBtnClass.value = "";
    }

    if (newsCurrentPage == 1) {
      if (newsTotalPage == 1) {
        numPage.value = [1];
      } else if (newsTotalPage == 2){
        numPage.value = [1,2];
      }else{
        numPage.value = [1, 2, 3];
      }
    } else {
      if (newsTotalPage - newsCurrentPage > 0) {
        numPage.value = [
          newsCurrentPage - 1,
          newsCurrentPage,
          newsCurrentPage + 1,
        ];
      }
    }
  }
);

const onChangePage = (type) => {
  if (type == "prev" && props.currentPage != 1) {
    emit("update:currentPage", props.currentPage - 1);
  }

  if (type == "next" && props.currentPage <= props.totalPage - 1) {
    emit("update:currentPage", props.currentPage + 1);
  }

  if (typeof type === "number") {
    console.log(type);
    emit("update:currentPage", type);
  }
};
</script>

<style>
.page-link {
  cursor: pointer;
}

.page-link-disabled {
  background-color: #ccc !important;
  cursor: default;
}
</style>
