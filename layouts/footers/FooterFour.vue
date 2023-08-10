<template>
  <footer>
    <div
      :class="`footer__area ${style_2 ? 'footer__style-3' : ''}`"
      :data-bg-color="`footer-bg-${style_2 ? 'grey-4' : 'black'}`"
    >
      <div class="footer__bottom-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-sm-6">
              <div class="footer__copyright-5">
                <p>
                  © {{ new Date().getFullYear() }}
                  <!-- <nuxt-link href="/">Harry</nuxt-link> -->
                  มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
                </p>
              </div>
            </div>
            <!-- <div class="col-sm-6">
              <div class="footer__social-5 text-sm-end">
                <social />
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Social from "~~/components/social/Social.vue";

export default {
  components: { Social },
  props: {
    style_2: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.footer__style-3 .footer__bottom-5 {
  padding-top: 27px;
  padding-bottom: 20px;
  border-top: 1px solid #e1e1ec;
  background-color: #ff6600;
}

.footer__style-3 .footer__copyright-5 p {
  color: #fff;
}

.footer__style-3 .footer__widget ul li a:hover {
  color: #ff6600;
}

.footer__style-3 .footer__widget-title {
  color: #ff6600;
}

/* .footer__info-icon span {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 46px;
    text-align: center;
    border: 1.5px solid var(--tp-theme-4);
    font-size: 18px;
    color: var(--tp-theme-4);
    border-radius: 50%;
    margin-right: 10px;
} */
</style>
