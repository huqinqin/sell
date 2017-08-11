<template>
     <div class="shopcarts">
       <div class="cartsContent">
         <div class="content-left" @click="toggleList">
         <div class="icon-wrapper">
           <div class="icon" :class="{ highlight: totalCount > 0}">
             <img src="./shopcarts.png" alt="" width="90%" height="90%" >
           </div>
           <div class="num" v-show="totalCount > 0 ">{{totalCount}}</div>
         </div>
         <div class="price" :class="{ highlight: totalCount > 0}">￥{{total}}</div>
         <div class="sell">另需配送费{{deliveryPrice}}元</div>
       </div>
         <div class="content-right">
           <span class="reach" :class="isEnough">{{diff}}</span>
         </div>
       </div>
       <transition name="animate">
         <div class="itemInfo" v-show="listShow" >
           <div class="itemTitle">
             <span class="itemCarts">购物车</span>
             <span class="itemClear">清空</span>
           </div>
           <ul class="itemFoods" ref="cartsMethod">
             <li class="itemFood" v-for="food in selectFoods">
               <span class="FoodTitle">{{food.name}}</span>
               <span class="foodPrice" >￥{{food.price * food.count }}</span>
               <div class="carts">
                 <cartsctrl :food="food" ></cartsctrl>
               </div>
             </li>
           </ul>
         </div>
       </transition>
     </div>
</template>
<script type="text/ecmascript-6">
  import cartsctrl from '../cartsctrl/cartsctrl.vue';
  import BScroll from 'better-scroll';
    export default{
        data() {
            return {
                fold: true
            };
        },
        components: {
            cartsctrl
        },
        props: {
            selectFoods: {
                type: Array,
              default() {
                    return [];
              }
            },
          deliveryPrice: {
            type: Number,
            default: 0
          },
          minPrice: {
            type: Number,
            default: 0
          }
        },
       computed: {
            total: function() {
                let sum = 0;
               this.selectFoods.forEach((item) => {
                    sum += item.price * item.count;
                });
               return sum;
            },
            totalCount: function() {
                let count = 0;
              this.selectFoods.forEach((item) => {
                  count += item.count;
              });
              return count;
            },
            diff: function() {
              if (this.total === 0) {
                  return '￥' + this.minPrice + '起送';
              } else if (this.total < this.minPrice) {
                  let cost = this.minPrice - this.total;
                return '还差￥' + cost + '起送';
              } else {
                return '去结算';
              }
            },
            isEnough: function () {
          if (this.total < this.minPrice) {
              return 'notenough';
          } else {
             return 'enough';
          }
        },
             listShow: function () {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    if (!this.scroll) {
                      this.$nextTick(function() {
                        this.scroll = new BScroll(this.$refs.cartsMethod, {
                          click: true
                        });
                      });
                    } else {
                        this.scroll.refresh();
                    }
                }
                return show;
             }
        },
      methods: {
        toggleList: function () {
          if (!this.totalCount) {
            return false;
          }
          this.fold = !this.fold;
        }
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
     .shopcarts
       position : fixed
       left:0
       bottom:0
       width : 100%
       height: 46px
       z-index 1000
       .cartsContent
          background:#141d27
          display :flex
          .content-left
             flex:1
            .icon-wrapper
               position : relative
               top : -6px
               width :56px
               height 56px
               display :inline-block
               padding:6px
               background:#141d27
               border-radius :50%
               z-index 1001
               .icon
                 padding:12px
                 width :40px
                 height :40px
                 background:#272f38
                 margin :0 2px
                 box-sizing : border-box
                 border-radius :50%
                 &.highlight
                   background :rgb(0,160,220)
               .num
                 position : absolute
                 top: -6px
                 left: 32px
                 width :32px
                 height : 18px
                 line-height :18px
                 text-align :center
                 background :red
                 color: #ffffff
                 font-weight :700
                 border-radius :30%
            .price
              display :inline-block
              line-height :24px
              vertical-align :center
              margin-top :12px
              padding-right :12px
              border-right :1px solid rgba(255,255,255,0.1)
              font-size: 16px
              font-weight :700px
              color:rgba(255,255,255,0.4)
              &.highlight
                 color:rgb(255,255,255)
                 font-weight :700
            .sell
              display : inline-block
              color:rgba(255,255,255,0.4)
          .content-right
            flex: 0 0 105px
            width : 105px
            .reach
               display :inline-block
               width :100%
               height :48px
               line-height :48px
               text-align :center
               background :#2b333b
               font-size :14px
               font-weight :bold
               color:#979a9c
               &.enough
                 background : rgb(0,160,220)
                 color: #ffffff
                 font-weight:700
              &.notenough
                 background: #979a9c
       .itemInfo
           position absolute
           left 0
           top 0
           z-index -1
           width 100%
           background #fff
           transform: translate3d(0,-100%,0)
       .animate-enter-active,.animate-leave-active
            transition all 0.5s
       .animate-leave-active,.animate-enter
            transform translate3d(0,0,0)
          .itemTitle
               display flex
               font-size 0
               background #f3f5f7
               height 40px
               border-bottom 2px solid rgba(7,17,27,0.1)
               .itemCarts
                 flex 1
                 display inline-block
                 line-height 40px
                 font-size: 18px
                 font-weight 200
                 color rgb(7,17,27)
                 text-align left
                 margin-left 15px
               .itemClear
                 flex 1
                 display inline-block
                 font-size 16px
                 color rgb(0,160,220)
                 line-height 40px
                 text-align right
                 margin-right 15px
          .itemFoods
               width  100%
               .itemFood
                 display flex
                 width 80%
                 font-size 0
                 height 40px
                 line-height 40px
                 margin 0 auto
                 border-bottom 1px soild rgba(7,17,27,0.1)
                 .FoodTitle
                   display inline-block
                   font-size 14px
                   font-weight bold
                   flex 0 0 40%
                   width 40%
                   text-align left
                 .foodPrice
                   color rgb(240,20,20)
                   font-size 16px
                   flex 0 0 15%
                   width 20%
                   text-align center
                 .carts
                   display inline-block
                   width 40%
                   text-align right
</style>
