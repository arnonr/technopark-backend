<template>
  <HomeProject />
  <HomeBanner />
  <HomeNews />

  <section class="annouce_and_video pt-40 pb-40">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <HomeAnnouce />
        </div>
        <div class="col-md-6">
          <HomeVideo />
        </div>
      </div>
    </div>
  </section>
  <HomeIcon />
</template>

<script setup>
useHead({
  title: "อุทยานเทคโนโลยี มจพ.",
});
</script>
