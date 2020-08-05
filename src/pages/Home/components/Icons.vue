<template>
  <div class="icons">
    <swiper ref="mySwiper">
      <swiper-slide v-for="page of pages" :key="page.index">
        <div class="icon" v-for="item of page" :key="item.id">
          <div class="icon-img">
            <img class="icon-img-content" :src="item.imgUrl" />
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeIcons",
  data() {
    return {
      iconList: [
        {
          id: "0001",
          imgUrl: "https://s.qunarzz.com/homenode/images/touchheader/hotel.png",
          desc: "热门景点"
        },
        {
          id: "0002",
          imgUrl:
            "https://imgs.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png",
          desc: "一日游"
        },
        {
          id: "0003",
          imgUrl:
            "https://imgs.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png",
          desc: "青岛必游"
        },
        {
          id: "0004",
          imgUrl:
            "https://imgs.qunarzz.com/piao/fusion/1803/bd/9f7b9b2b60c1502.png",
          desc: "踏青赏花"
        },
        {
          id: "0005",
          imgUrl:
            "https://imgs.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
          desc: "景点门票"
        },
        {
          id: "0006",
          imgUrl:
            "https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20194/f04285731d7121da1b9028e2bf431695.png",
          desc: "崂山"
        },
        {
          id: "0007",
          imgUrl:
            "https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20194/8671dfb53aecb10748c86b4c29971a14.png",
          desc: "青岛动物园"
        },
        {
          id: "0008",
          imgUrl:
            "https://imgs.qunarzz.com/piao/fusion/1803/50/26ffa31b56646402.png",
          desc: "青岛海底世界sssssss"
        },
        {
          id: "0009",
          imgUrl:
            "https://imgs.qunarzz.com/piao/fusion/1803/95/8246f27355943202.png",
          desc: "青岛方特"
        },
        {
          id: "0010",
          imgUrl:
            "https://imgs.qunarzz.com/piao/fusion/1803/97/02f5043b51b2102.png",
          desc: "威海西霞口"
        }
      ]
    };
  },
  computed: {
    pages() {
      const pages = [];
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibies.styl';
  @import '~@/assets/styles/mixins.styl';

.icons >>> .swiper-container {
  overflow: hidden;
  height: 0;
  padding-bottom: 50%;

  .icon {
    position: relative;
    float: left;
    width: 25%;
    height: 0;
    padding-bottom: 25%;

    .icon-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0.44rem;
      box-sizing: border-box;
      padding: 0.1rem;

      .icon-img-content {
        display: block;
        margin: 0 auto;
        height: 100%;
      }
    }

    .icon-desc {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 0.44rem;
      line-height: 0.44rem;
      text-align: center;
      color: $darkTextColor;
      ellipsis()
    }
  }
}
</style>