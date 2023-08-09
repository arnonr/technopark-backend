<template>
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
              <span class="dvdr"><i class="fa-solid fa-circle-small"></i></span>
              <span> บุคลากร </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="accordion__area faq__style-3 pt-40 pb-105">
    <div class="container">
      <div class="text-center pb-30 pt-320">
        <h3 class="text-color-primary">บุคลากร</h3>
        <hr />
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="faq__tab-content tp-accordion">
            <div
              class="accordion"
              id="general_accordion_p"
              v-if="departments.length != 0"
            >
              <div
                class="accordion-item"
                v-for="(dp, index) in departments"
                :key="index"
                style="border-radius: 45px"
              >
                <h2 class="accordion-header" id="headingOne_p">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapse' + dp.id + '_p'"
                    :aria-expanded="index == 0 ? 'false' : 'false'"
                    aria-controls="collapseOne_p"
                  >
                    <i class="fa fa-user"></i>
                    <span class="ml-10">{{ dp.name }}</span>
                  </button>
                </h2>
                <div
                  :id="'collapse' + dp.id + '_p'"
                  :class="
                    index == 0
                      ? 'accordion-collapse collapse show'
                      : 'accordion-collapse collapse '
                  "
                  :aria-labelledby="'heading' + dp.id + '_p'"
                  data-bs-parent="#general_accordion_p"
                >
                  <div class="accordion-body">
                    <div class="row mt-20">
                      <div
                        v-for="(it, i) in dp.teamItems"
                        :key="i"
                        class="team__item-10 col-lg-3"
                      >
                        <div class="team__thumb-10 p-relative m-img">
                          <nuxt-link href="/team-details">
                            <img :src="it.team_file" alt="" />
                          </nuxt-link>

                          <div class="team__contact-overlay">
                            <div class="team__contact-top">
                              <span>
                                <svg
                                  width="52"
                                  height="53"
                                  viewBox="0 0 52 53"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M42.1757 38.0741L43.1507 45.9738C43.4006 48.0488 41.1757 49.4987 39.4008 48.4237L28.926 42.1989C27.776 42.1989 26.6511 42.124 25.5511 41.974C27.4011 39.7991 28.501 37.049 28.501 34.0741C28.501 26.9743 22.3512 21.2246 14.7514 21.2246C11.8514 21.2246 9.17653 22.0495 6.95158 23.4994C6.87658 22.8744 6.85156 22.2494 6.85156 21.5995C6.85156 10.2247 16.7263 1 28.926 1C41.1257 1 51.0005 10.2247 51.0005 21.5995C51.0005 28.3493 47.5255 34.3242 42.1757 38.0741Z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M28.4993 34.0732C28.4993 37.0481 27.3994 39.7981 25.5494 41.9731C23.0745 44.973 19.1495 46.8979 14.7497 46.8979L8.22482 50.7727C7.12484 51.4477 5.72487 50.5228 5.87487 49.2478L6.49985 44.323C3.14994 41.9981 1 38.2731 1 34.0732C1 29.6733 3.34995 25.7984 6.94986 23.4985C9.17481 22.0485 11.8497 21.2236 14.7497 21.2236C22.3495 21.2236 28.4993 26.9734 28.4993 34.0732Z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </span>
                              <!-- <p>Get touch with me</p> -->
                            </div>
                            <div class="team__contact-wrapper">
                              <p class="team-tel">
                                <i class="fa fa-phone"></i> {{ it.phone }}
                              </p>
                              <p class="team-email mt-20">
                                {{ it.email }}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="team__content-10 text-center">
                          <h3 class="team__title-10 pb-20">
                            {{ it.prefix + it.firstname + " " + it.surname }}
                          </h3>
                          <span class="team__designation-10">
                            {{ it.position }}
                            <br />
                            {{ it.position_level }}
                          </span>
                        </div>
                      </div>
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
</template>

<script>
import SalScrollAnimationMixin from "~/mixins/SalScrollAnimationMixin";

export default {
  mixins: [SalScrollAnimationMixin],
};
</script>

<script setup>
// Variable
const runtimeConfig = useRuntimeConfig();
const items = ref([]);
const departments = ref([]);

const search = ref({
  is_publish: 1,
});

// Function Fetch
const fetchDepartments = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/department`, {
    params: {
      is_publish: 1,
    },
  })
    .then((res) => {
      departments.value = res.data.map((e) => {
        e.teamItems = [];
        return e;
      });
      fetchItems();
    })
    .catch((error) => error.data);
};
fetchDepartments();

const fetchItems = async () => {
  await $fetch(`${runtimeConfig.public.apiBase}/team`, {
    params: {
      ...search.value,
    },
  })
    .then((res) => {
      items.value = res.data;

      for (const it of res.data) {
        const departmentIndex = departments.value.findIndex(
          (el) => it.department_id == el.id
        );
        departments.value[departmentIndex].teamItems.push(it);
      }
    })
    .catch((error) => error.data);
};

// Function Change
onMounted(() => {});

useHead({
  title: "บุคลากร อุทยานเทคโนโลยี มจพ.",
});
</script>

<style scoped>
.accordion-header {
  background-color: #ff6600;
  border-radius: 1.5em;
}

.faq__style-3 .faq__tab-content .accordion-button {
  color: #fff;
}

.faq__tab-content .accordion-button {
  padding: 20px 20px;
}

.faq__tab-content .accordion-button.collapsed::after {
  color: #fff;
}
.faq__style-3 .faq__tab-content .accordion-button:hover::after {
  color: #fff;
}

.faq__tab-content .accordion-button::after {
  color: #fff;
}

.m-img img {
  width: 100%;
}

.team__thumb-10 {
  border: 2px solid #eaeaef;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}

.team__contact-overlay {
  background-image: linear-gradient(
    180deg,
    rgba(255, 102, 0, 0.95) 0.01%,
    rgba(230, 92, 0, 0.95) 100%
  );    
}

.team__contact-wrapper > p {
  color: #fff;
}
</style>
