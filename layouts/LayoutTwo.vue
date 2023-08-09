<template>
  <div class="fix">
    <HeaderTwo />

    <main>
      <slot></slot>
    </main>
    <footer-four />
    <BackToTop/>
  </div>
</template>

<script>
import HeaderTwo from "./headers/HeaderTwo.vue";
import FooterFour from "./footers/FooterFour.vue";
import BackToTop from "./footers/component/BackToTop.vue";

export default {
  components: {
    HeaderTwo,
    FooterFour,
    BackToTop,
  },
};
</script>
