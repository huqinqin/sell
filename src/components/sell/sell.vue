<template>
  <div class="sellWrapper" ref="box">
    <div class="sellBox">
      <div class="sellContentTop">
        <div class="selltitle">
          <div class="title">{{seller.name}}</div>
          <stars class="starStar" :size="36" :score="seller.score"></stars><span class="total">({{seller.sellCount}})</span><span class="monthSell">月售{{seller.sellCount}}单</span>
          <div class="favorite">
            <div class="favoriteIcon" :class="{active: favorite}" @click="toggleFavorite"></div>
            <p class="favoriteWord">{{favoriteShow}}</p>
          </div>
        </div>
        <ul class="price">
          <li class="priceItem">
            <div class="priceTop">起送价</div>
            <div class="priceBottom">{{seller.minPrice}}元</div>
          </li>
          <li class="priceItem">
            <div class="priceTop">商家配送</div>
            <div class="priceBottom">{{seller.deliveryPrice}}元</div>
          </li>
          <li class="priceItem none">
            <div class="priceTop">平均配送时间</div>
            <div class="priceBottom">{{seller.deliveryTime}}元</div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="notice">
        <div class="noticeTitle">公告与活动</div>
        <p class="noticeContent">{{seller.bulletin}}</p>
        <ul class="activies">
          <li class="onSell" v-for="item in seller.supports">
            <span class="onSellIcon"></span><span class="onSellWord">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="shop">
        <div class="shopTitle">商家实景</div>
        <div class="picWrapper" ref="boxx">
          <ul class="pics" ref="pics">
            <li class="picItem" v-for="pic in seller.pics">
              <img :src="pic" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="shopInfo">
        <div class="shopInfoTitle">商家信息</div>
        <ul class="shopInfoContent">
          <li class="shopInfoList" v-for="info in seller.infos"><span class="infoWord">{{info}}</span></li>
        </ul>
      </div>
      <shopcarts :deliveryPrice="seller.deliveryPrice"  :minPrice="seller.minPrice"></shopcarts>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import stars from '../stars/stars.vue';
  import split from '../split/split.vue';
  import BScroll from 'better-scroll';
  import shopcarts from '../shopcarts/shopcarts.vue';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
  export default{
      props: {
          seller: {
              type: Object
          }
      },
    data() {
          return {
              favorite: (() => {
                return loadFromLocal(this.seller.id, 'favorite', false);
              })()
          };
    },
    computed: {
          favoriteShow: function () {
            return this.favorite ? '已收藏' : '未收藏';
          }
    },
    components: {
          stars,
          split,
          shopcarts
    },
    mounted() {
          this._initBScroll();
          this._initPics();
    },
    watch: {
          'seller'() {
            this._initBScroll();
            this._initPics();
          }
    },
    methods: {
      _initBScroll: function () {
        if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.box, {
                click: true
            });
        } else {
            this.scroll.refresh();
        }
      },
      _initPics: function () {
          if (this.seller.pics) {
            let margin = 6;
            let wid = 120;
            let picWidth = wid * this.seller.pics.length + margin * (this.seller.pics.length - 1);
            this.$refs.pics.style.width = picWidth + 'px';
            this.$nextTick(function () {
                if (!this.vscroll) {
                  this.vscroll = new BScroll(this.$refs.boxx, {
                    scrollX: true,
                    eventPassthrough: 'vertical'
                  });
                } else {
                    this.vscroll.refresh();
                }
            });
          }
      },
      toggleFavorite: function (event) {
        if (!event._constructed) {
            return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .sellWrapper
    position fixed
    top 200px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .sellBox
     .sellContentTop
       margin-top 18px
       position relative
       .selltitle
         padding 0 0 18px 0
         margin 0px 18px
         border-bottom 1px solid rgba(7,17,27,0.2)
         .title
          font-size 14px
          line-height 28px
          color rgb(7,17,27)
          font-weight 500
         .starStar
           display inline-block
           margin 0
         .total
           display inline-block
           color rgb(77,85,93)
           margin-left 16px
           font-weight 500
         .monthSell
           display inline-block
           color rgb(77,85,93)
           font-weight 500
           margin-left 12px
         .favorite
           position absolute
           right 18px
           top 5px
           width 50px
           .favoriteIcon
             width 20px
             height 20px
             background #d4d6d9
             margin 0 auto
             &.active
              background red
           .favoriteWord
             font-size 10px
             color rgb(77,85,93)
             line-height 20px
             text-align center
             margin-top 8px
       .price
         width 80%
         margin 0 auto
         display flex
         .priceItem
           flex 1
           text-align center
           line-height 40px
           margin 18px 0
           border-right 1px solid rgba(7,17,27,0.2)
           &:last-child
            border none
           .priceTop
             color rgb(147,153,159)
             font-size 12px
     .notice
       padding 18px
       width 100%
       .noticeTitle
         font-size 14px
         line-height 28px
         color rgb(7,17,27)
         font-weight 500
       .noticeContent
         color rgb(240,20,20)
         line-height 24px
         margin-left 12px
         font-size 12px
         font-weight 200
       .activies
         margin-left 12px
         .onSell
           line-height 48px
           border-top 1px solid rgba(7,17,27,0.1)
     .shop
       padding 18px
       .shopTitle
          font-size 14px
          line-height 28px
          color rgb(7,17,27)
          font-weight 500
       .picWrapper
         width 100%
         mergin-top 12px
         white-space nowrap
         overflow hidden
         .pics
           font-size 0
           .picItem
             display inline-block
             margin-right 12px

     .shopInfo
       padding 18px 18px 74px 18px
       .shopInfoTitle
         font-size 14px
         line-height 28px
         color rgb(7,17,27)
         font-weight 500
         margin-bottom 18px
       .shopInfoContent
          width 100%
          .shopInfoList
             width 96%
             margin 0 auto
             line-height 32px
             border-top 1px solid rgba(7,17,27,0.1)
             .infoWord
               display inline-block
               margin-left 12px
               font-size 12px
               color rgb(7,17,27)
               font-weight 200px
</style>
