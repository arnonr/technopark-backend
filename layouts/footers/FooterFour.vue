<template>
  <footer>
    <div
      :class="`footer__area ${style_2 ? 'footer__style-3' : ''}`"
      :data-bg-color="`footer-bg-${style_2 ? 'grey-4' : 'black'}`"
    >
      <div class="footer__top footer__top-5">
        <div class="container">
          <div class="row">
            <div class="col-xxl-4 col-xl-4 col-lg-7 col-md-6">
              <div class="footer__widget footer__widget-5 mb-50 footer-col-5-2">
                <h3 class="footer__widget-title">ลิ้งค์</h3>

                <div class="footer__widget-content">
                  <ul>
                    <li>
                      <nuxt-link href="/home-agency">โครงการฝึกอบรม</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link href="/portfolio-masonry">สมัครงาน</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link href="/about"
                        >อุทยานเทคโนโลยี กรุงเทพฯ</nuxt-link
                      >
                    </li>
                    <li>
                      <nuxt-link href="/portfolio-metro"
                        >อุทยานเทคโนโลยี ปราจีนฯ</nuxt-link
                      >
                    </li>
                    <li>
                      <nuxt-link href="/portfolio-masonry"
                        >อุทยานเทคโนโลยี ระยอง</nuxt-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xxl-5 col-xl-4 col-lg-5 col-md-6">
              <div class="footer__widget footer__widget-5 mb-50 footer-col-5-1">
                <h3 class="footer__widget-title">เกี่ยวกับอุทยานเทคโนโลยี</h3>

                <div class="footer__widget-content">
                  <div class="footer__info">
                    <p>
                      <span class="fw-bold"
                        >มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</span
                      >
                      <br />
                      1518 ถนนประชาราษฎร์ 1 แขวงวงศ์สว่าง เขตบางซื่อ<br />
                      กรุงเทพฯ 10800
                    </p>
                    <p>
                      <span class="fw-bold">โทรศัพท์</span> : +66 2 555-2000<br />
                      <span class="fw-bold">แฟกซ์</span> : +66 2 587-4350<br />
                      <span class="fw-bold">อีเมล</span> :
                      contact@technopark.kmutnb.ac.th
                    </p>
                    <!-- <div class="footer__opening d-flex align-items-start">
                      <div class="footer__opening-icon mr-15">
                        <span>
                          <svg
                            width="37"
                            height="34"
                            viewBox="0 0 37 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.7646 9.18399L28.5562 30.095C28.1853 31.6559 26.7944 32.7378 25.187 32.7378H4.87881C2.54507 32.7378 0.875929 30.4503 1.57141 28.2093L8.07806 7.31396C8.52626 5.86117 9.87088 4.85645 11.3855 4.85645H30.3954C31.8637 4.85645 33.0846 5.75286 33.5947 6.98928C33.8883 7.65385 33.9501 8.41122 33.7646 9.18399Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-miterlimit="10"
                            />
                            <path
                              d="M24.6006 32.7372H31.9882C33.9819 32.7372 35.5429 31.0525 35.4038 29.0588L33.8737 8.00879"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M14.832 8.59748L16.4394 1.9209"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M25.1865 8.61182L26.6393 1.9043"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11.7715 17.2822H24.1357"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M10.2266 23.4639H22.5908"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <div class="footer__opening-content">
                        <h4>Opening Hours</h4>
                        <p>Mon – Sat 8:00 – 17:30 Sunday – CLOSED</p>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
              <div class="footer__widget footer__widget-5 mb-50 footer-col-5-3">
                <h3 class="footer__widget-title">ติดตามเราได้ที่</h3>

                <div class="footer__widget-content">
                  <div class="footer__info">
                    <div class="footer__info-item d-flex align-items-start">
                      <div class="footer__info-icon mr-20">
                        <a href="">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              style="fill: #ff6600"
                            >
                              <path
                                d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                              />
                            </svg>
                          </span>
                        </a>
                        <a href="" class="ml-10">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              style="fill: #ff6600"
                            >
                              <path
                                d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
