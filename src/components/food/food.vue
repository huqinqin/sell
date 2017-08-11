<template>
  <transition name="foodAnimate" >
    <div class="foodDesc" v-show="showFlag" ref="foodBox" >
      <div>
        <div class="wrapperBox">
        <div class="imgWrapper">
          <img :src="food.image" alt="" class="img">
        </div>
        <div class="food_content">
          <div class="food_name">{{food.name}}</div>
          <div class="food_sell">
            <span class="month_sell">月售{{food.sellCount}}份</span>
            <span class="food_rating">好评率{{food.rating}}%</span>
          </div>
          <div class="food_price">
            <span class="new_price">￥{{food.price}}</span>
            <span class="old_price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="cartsBox" v-show="food.count > 0">
          <cartsctrl :food="food"></cartsctrl>
        </div>
        <div class="buy" v-show="!food.count || food.count=== 0 " @click.stop.prevent="addFirst">加入购物车</div>
        <div class="icon_list glyphicon glyphicon-chevron-left" @click="backFood"></div>
      </div>
        <split></split>
        <div class="introFood">
          <div class="titleFood">商品介绍</div>
          <div class="contentFood">{{food.info}}</div>
        </div>
        <split></split>
        <div class="ratings-wrapper">
          <div class="ratinds-title">商品评价</div>
          <selectRatings :ratings-type="ratingsType" :content-only="contentOnly" :selected-ratings="selectRatings" :ratings="food.ratings" v-on:select="selectSome"></selectRatings>
        </div>
      </div>
     </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import vue from 'vue';
  import BScroll from 'better-scroll';
  import cartsctrl from '../cartsctrl/cartsctrl.vue';
  import split from '../split/split.vue';
  import selectRatings from '../selectRatings/selectRatings.vue';
   const ALL = 2;
    export default{
       props: {
         food: {
             type: Object
         }
       },
      data() {
           return {
              showFlag: false,
              ratingsType: {
                all: '全部',
                positive: '推荐',
                negtive: '吐槽'
             },
             contentOnly: true,
             selectRatings: ALL
           };
      },
      methods: {
        backFood: function () {
          this.showFlag = false;
        },
        show: function () {
          this.showFlag = true;
          this.selectRatings = ALL;
          this.contentOnly = true;
          this.$nextTick(function () {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.foodBox, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
          });
        },
        addFirst: function (event) {
          if (!event._constructed) {
            return;
          }
          if (!this.food.count) {
            vue.set(this.food, 'count', 1);
          }
        },
        selectSome: function (type) {
           this.selectRatings = type;
          this.$nextTick(function () {
            this.scroll.refresh();
          });
        }
      },
      components: {
        cartsctrl,
        split,
        selectRatings
      },
      events: {
           'select'(type) {
               this.selectRatings = type;
               this.$nextTick(function () {
                 this.scroll.refresh();
               });
           }
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .foodDesc
     width 100%
     height 100%
     background #fff
     z-index 300
     position fixed
     left 0
     top 0
     transform translate3d(0,0,0)
  .foodAnimate-enter-active,.foodAnimate-leave-active
      transition all 1.5s
  .foodAnimate-enter,.foodAnimate-leave-active
      transform translate3d(100%,0,0)
     .wrapperBox
        position relative
       .imgWrapper
         width 100%
         .img
           width 100%
           height 100%
       .icon_list
         position absolute
         padding :12px
         font-size : 24px
         left 0
         top 0
         background #000
       .food_content
          padding 18px
          .food_name
              font-size 28px
              font-weight 700
              color rgb(7,17,27)
              line-height 28px
          .food_sell
              font-size 0
              margin 16px 0 36px 0
            .month_sell
                display inline-block
                color rgb(147,153,159)
                line-height 20px
                font-size 20px
            .food_rating
                display inline-block
                font-size 20px
                color rgb(147,153,159)
                line-height 20px
                margin-left:12px

          .food_price
             margin 0 0 27px 0
             font-size 0
             .new_price
               display inline-block
               font-weight 700
               color rgb(240,20,20)
               line-height 24px
               font-size 28px
             .old_price
                font-size 20px
                font-weight 700
                color rgb(147,153,159)
                line-height 48px
                text-decoration line-through
                margin-left 12px
       .cartsBox
         position  absolute
         right 36px
         bottom 52px
       .buy
          height 48px
          line-height 48px
          padding 0 24px
          background rgb(0,160,220)
          border-radius 24px
          position  absolute
          right 36px
          bottom 40px
          font-size 20px
          color rgb(255,255,255)
      .introFood
        padding 36px
        .titleFood
          font-size 24px
          font-weight 500
        .contentFood
          font-size 18px
          font-weight 200
          color rgb(77,85,93)
          line-height 24px
          margin-top 10px
      .ratings-wrapper
        width 100%
        font-size 24px
        font-weight 500
        padding 36px
</style>
