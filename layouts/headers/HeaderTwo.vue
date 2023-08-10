<template>
    <header>
      <div class="header__area">
        <div class="header__top-4 header__padding-4">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-6">
                <div class="logo text-end">
                  <NuxtLink to="/">
                    <img
                      src="~/assets/img/iconwebtechnopark/logo.png"
                      style="width: 90%"
                      alt=""
                    />
                  </NuxtLink>
                </div>
              </div>
              <div class="col-xxl-5 col-xl-5 col-lg-3 d-none d-lg-block mt-20">
                <div class="header__welcome">
                  <h4>ระบบจัดการเว็บไซต์ อุทยานเทคโนโลยี</h4>
                  <p class="d-none d-xl-inline-block">
                    มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
                  </p>
                  <!-- <p><i class="fa-light fa-clock"></i> Sunday-Thures 10am-07pm</p> -->
                </div>
              </div>
           
            </div>
          </div>
        </div>
        <div
          :class="`header__style-4 header__sticky ${
            isSticky ? 'header-sticky' : ''
          }`"
          id="header-sticky"
        >
          <div class="container">
            <div class="mega-menu-wrapper p-relative">
              <div class="row align-items-center">
                <div class="col-xxl-2 col-xl-2 col-lg-2 col-6">
                  <div class="logo">
                    <NuxtLink to="/">
                      <img
                        src="~/assets/img/iconwebtechnopark/logo.png"
                        style="width: 70%"
                        alt=""
                      />
                    </NuxtLink>
                  </div>
                </div>
                <div class="col-xxl-8 col-xl-7 col-lg-7 d-none d-lg-block">
                  <div class="main-menu main-menu-4 main-menu-ff-space">
                    <nav id="mobile-menu">
                      <!-- menus start -->
                      <menus />
                      <!-- menus end -->
                    </nav>
                  </div>
                </div>
               <div class="col-xxl-2 col-xl-3 col-lg-3 col-6">
                  <div class="header__style-4-right d-flex align-items-center justify-content-end">
                   <!--   <div class="header__btn-4 text-end d-none d-lg-block">
                      <nuxt-link href="/contact" class="tp-btn-brown">Free Consultation</nuxt-link>
                    </div>-->
                    <div class="header__hamburger ml-50 d-lg-none">
                      <button @click="handleOpenSidebar" type="button" class="hamburger-btn hamburger-btn-brown offcanvas-open-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
        <div class="header__bottom-4 d-none d-lg-block">
          <div class="container">
            <div class="mega-menu-wrapper p-relative">
              <div class="row align-items-center">
                <div class="col-xxl-12 col-xl-12 col-lg-12 text-center">
                  <div class="main-menu main-menu-4 main-menu-ff-space">
                    <nav>
                      <!-- menus start -->
                      <menus />
                      <!-- menus end -->
                    </nav>
                  </div>
                </div>
                <!-- <div class="col-xxl-4 col-xl-3 col-lg-3">
                  <div class="header__btn-4 text-end">
                    <nuxt-link href="/contact" class="tp-btn-brown">Free Consultation</nuxt-link>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  
    <!-- off canvas full start -->
    <off-canvas-two ref="off_canvas" />
    <!-- off canvas full end -->
  </template>
  
  <script>
  import menus from "./menus.vue";
  import OffCanvasTwo from "~~/components/common/off-canvas/OffCanvasTwo.vue";
  
  export default {
    components: { menus, OffCanvasTwo },
    data() {
      return {
        isSticky: false,
      };
    },
    methods: {
      handleSticky() {
        if (window.scrollY > 80) {
          this.isSticky = true;
        } else {
          this.isSticky = false;
        }
      },
      handleOpenSidebar() {
        this.$refs.off_canvas.openOffcanvas();
      },
    },
    mounted() {
      window.addEventListener("scroll", this.handleSticky);
    },
  };
  </script>
  <style scoped>
  .header__bottom-4 {
    background-color: #ff6600;
    line-height: 3em;
    
  }
  
  .header__padding-4 {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  
  
  </style>
  