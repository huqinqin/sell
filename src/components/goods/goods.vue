<template>
     <div class="goods">
        <div class="menu-wrapper" ref="menu">
          <ul class="list">
            <li class="list-many" v-for="(item , index) in goods" :class="{'current': currentIndex === index}" @click="selectMenu(index,$event)">
              <span class="goods-list" v-if="goods">
                 <span class="icon" :class="classMap[item.type]" v-show="item.type>0"></span>{{item.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="goods-wrapper" ref="goods">
            <ul class="goods-item">
              <li  class="goods-detail goods-detail-hook" v-for="item in goods">
                <h1 class="title">{{item.name}}</h1>
                <ul class="detail">
                   <li   v-for="food in item.foods" class="food-item detail-shop" >
                     <div class="icon"><img :src="food.icon" alt="" style="width: 56px;height:56px"></div>
                     <div class="content" @click="selectedFood(food,$event)">
                       <h2 class="name">{{food.name}}</h2>
                       <p class="desc">{{food.description}}</p>
                       <div class="sell">
                         <span class="month-sell">月售：{{food.sellCount}}</span>
                         <span class="rating">好评率{{food.rating}}%</span>
                       </div>
                       <div class="money">
                         <span>￥{{food.price}}</span>
                         <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                       </div>
                     </div>
                     <div class="cartswrapper">
                       <cartsctrl :food="food"></cartsctrl>
                     </div>
                   </li>
                </ul>

              </li>
            </ul>
        </div>
        <shopcarts :deliveryPrice="seller.deliveryPrice"  :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcarts>

         <food  :food="isSelectedFood" ref="food"></food>

     </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcarts from '../shopcarts/shopcarts.vue';
  import cartsctrl from '../cartsctrl/cartsctrl.vue';
  import food from '../food/food.vue';
     const ERROK = 0;
     export default{
         data() {
             return {
                 goods: [],
                 listHeight: [],
                 scrollY: 0,
                isSelectedFood: {}
             };
         },
       computed: {
            currentIndex: function() {
              for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                  return i;
                }
              }
              return 0;
            },
         selectFoods: function() {
                let foodLsit = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                          foodLsit.push(food);
                        }
                    });
                });
               return foodLsit;
         }
       },
         props: {
             seller: {
                 type: Object
             }
         },
         created() {
             this.$http.get('/api/goods').then((response) => {
               response = response.body;
               if (response.errno === ERROK) {
                   this.goods = response.data;
                   this.$nextTick(function () {
                     this.initScroll();
                     this.calculate();
                   });
               }
             }, (response) => {
                 console.log('输入错误');
             });
           this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
         },
       methods: {
             initScroll: function() {
                 this.menuScroll = new BScroll(this.$refs.menu, {
                     click: true
                 });
                 this.goodsScroll = new BScroll(this.$refs.goods, {
                     probeType: 3,
                     click: true
                 });
                 this.goodsScroll.on('scroll', (pos) => {
                     this.scrollY = Math.abs(Math.round(pos.y));
                 });
             },
             calculate: function () {
                  let goodsDetail = this.$refs.goods.getElementsByClassName('goods-detail-hook');
                  let height = 0;
                  this.listHeight.push(height);
                  for (let i = 0; i < goodsDetail.length; i++) {
                      height += goodsDetail[i].clientHeight;
                      this.listHeight.push(height);
                  }
                  return this.listHeight;
             },
             selectMenu: function(index, event) {
                 if (!event._constructed) {
                     return;
                 }
                 let goodsDetail = this.$refs.goods.getElementsByClassName('goods-detail-hook');
                 let goods = goodsDetail[index];
                 this.goodsScroll.scrollToElement(goods, 300);
             },
         selectedFood: function (food, $event) {
           if (!event._constructed) {
             return;
           }
           this.isSelectedFood = food;
           this.$refs.food.show();
         }
       },
       components: {
         shopcarts,
         cartsctrl,
         food
       }
     };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixmin.styl";
     .goods
        display : flex
        position :absolute
        top:177px
        bottom:46px
        width 100%
        overflow hidden
        .menu-wrapper
          flex : 0 0 80px
          width :80px
          background : #f3f5f7
          margin-top 20px
          .list
            line-height :14px
            .list-many
              height : 54px
              display :table
              width :100%
              border-1px(rgba(7,17,27,0.1))
              &.current
                position : relative
                top: -1px
                z-index:100
                font-weight :700
                background:#fff
                border-none()
              .goods-list
                  display :table-cell
                  font-size :12px
                  color:rgb(0,0,0)
                  font-weight :200
                  vertical-align : middle
                  font-weight : bold
                  padding:0 12px
                  .icon
                    display :inline-block
                    width :12px
                    height:12px
                    margin-right : 2px
                    vertical-align :middle
                    &.decrease
                      background:url("./decrease_3@2x.png")
                      background-size:12px 12px
                    &.discount
                      background:url("./discount_3@2x.png")
                      background-size:12px 12px
                    &.guarantee
                      background:url("./guarantee_3@2x.png")
                      background-size:12px 12px
                    &.invoice
                      background:url("./guarantee_3@2x.png")
                      background-size:12px 12px
                    &.special
                      background:url("./guarantee_3@2x.png")
                      background-size:12px 12px
        .goods-wrapper
          flex:1
          .goods-item
            .goods-detail
              .title
                background :rgba(7,17,27,0.2)
                height :24px
                line-height: 24px
                border-left:4px solid rgba(7,17,27,0.1)
                padding:5px
                font-size:15px
                font-weight :500
                color:rgb(147,153,159)
              .detail
                width:100%
                height:100%
                font-size:0
                .detail-shop
                  padding:3.5px 0
                  border-1px(rgba(7,17,27,0.2))
                  &::last-child
                    border-none()
                  .icon
                     display:inline-block
                     flex:0 0 56px
                     width: 56px
                     height:56px
                     vertical-align :middle
                     margin-left:18px
                  .content
                      position relative
                      display :inline-block
                      flex:1
                      margin-left:10px
                      vertical-align : middle
                      max-width : 201px
                      .name
                        font-size: 10px
                        color:rgb(7,17,27)
                        line-height:14px
                        font-weight :700
                        margin :2px 0
                      .desc
                        font-size: 10px
                        color:rgb(147,153,159)
                        line-height:20px
                        margin-bottom 0
                      .sell
                         height 24px
                         line-height  24px
                         .month-sell
                            display inline-block
                            line-height 20px
                            color:rgb(147,153,159)
                            margin-right :12px
                         .rating
                           display inline-block
                           line-height 20px
                           color:rgb(147,153,159)
                      .money
                         color:rgb(147,153,159)
                         position :relative
                         height: 24px
                         line-height 24px
                         vertical-align center
                  .cartswrapper
                      position : absolute
                      bottom:0
                      right:0
</style>
