<template>
  <div class="wrapper">
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.url" />
      </swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- 左右箭头 -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
  </div>
</template>
<script>
export default {
  name: "HomeSwiper",
  data() {
    return {
      swiperOption: {
        //显示分页
        pagination: ".swiper-pagination",
        paginationClickable: true,
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        //自动轮播
        autoplay: 3000,
        //开启循环模式
        loop: true,
      },
      swiperList: [
        {
          id: "000",
          url:
            "https://source.qunarzz.com/site/images/wns/20200712_qunar_dujia_750x192_1.jpg",
        },
        {
          id: "001",
          url:
            "https://source.qunarzz.com/site/images/wns/20200720_qunar_dujia_750x192_3.jpg",
        },
        {
          id: "002",
          url:
            "https://source.qunarzz.com/site/images/wns/20200724_qunar_dujia_banner_750x192_5.jpg",
        },
        {
          id: "003",
          url:
            "https://source.qunarzz.com/site/images/wns/20200723_qunar_dujia_homepage_750x192_6.jpg",
        },
      ],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(30, 50000, false);
  },
};
</script>
<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet-active {
  background: white;
}

.wrapper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 31.25%;
}

.swiper-img {
  width: 100%;
}
</style>
