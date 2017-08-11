<template>
   <div class="ratingWrapper" ref="wrappers">
     <div class="ratingBox">
       <div class="ratingContent">
         <div class="ratingContentLeft">
           <div class="ratingContentNum">{{seller.serviceScore}}</div>
           <div class="ratingContentTitle">综合评分</div>
           <div class="ratingContentThen">高于周边商家{{seller.rankRate}}</div>
         </div>
         <div class="ratingContentRight">
           <div class="serverTop"><span class="serverSpan">服务态度</span><stars :size="36"  :score="seller.serviceScore" class="stars"></stars></div>
           <div class="serverTop"><span class="serverSpan">服务态度</span><stars :size="36"  :score="seller.score" class="stars"></stars></div>
           <div class="serverTop"><span class="serverSpan">送达时间</span><span class="runTime">{{seller.deliveryTime}}分钟</span></div>
         </div>
       </div>
       <split></split>
       <div class="allRatings">
         <div class="threeRatings">
           <span class="all" :class="{active: allNot === 2}" @click="selectAll(2)">{{allSatisfy.ALL}}<span class="num">{{ratings.length}}</span></span>
           <span class="satisfy" :class="{active: allNot === 0}" @click="selectAll(0)">{{allSatisfy.Satisfy}}<span class="num">{{indexOff}}</span></span>
           <span class="noSatisfy" :class="{active: allNot === 1}" @click="selectAll(1)">{{allSatisfy.noSatisfy}}<span class="num">{{Oppo}}</span></span>
         </div>
         <div class="onlyCont">
           <input type="checkbox" checked="isChecked" @click="isChecked = !isChecked"><span class="inp">只看有内容的评价</span>
         </div>
         <ul class="useRatings">
           <li class="usrratingItem" v-for="rating in ratings" v-show="needShow(allNot,rating.text,rating.rateType)">
             <div class="ratingsImg"><img :src="rating.avatar" alt=""></div>
             <div class="ratingRight">
               <div class="userName">{{rating.username}}</div>
               <div>
                 <stars :size="24" :score="rating.score" class="contentStar"></stars><span class="riving" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
               </div>
               <div class="userWord">{{rating.text}}</div>
               <div class="recommoned">
                 <span class="pointer" :class="{pointer1: rating.rateType === 0, pointer2: rating.rateType === 1}"></span><span class="pointerContent" v-for="recommend in rating.recommend">{{recommend}}</span>
               </div>
             </div>
           </li>
         </ul>
       </div>
     </div>
   </div>
</template>
<script type="text/ecmascript-6">
  import split from '../split/split.vue';
  import stars from '../stars/stars.vue';
  import BScroll from 'better-scroll';
  const ERR_OK = 0;
   export default{
     props: {
       seller: {
         type: Object
       }
     },
     data() {
       return {
         ratings: [],
         indexOff: 0,
         Oppo: 0,
         allSatisfy: {
           ALL: '全部',
           Satisfy: '满意',
           noSatisfy: '不满意'
         },
         isChecked: {
           default: true
         },
          allNot: 2
       };
     },
     components: {
       split,
       stars
     },
     created() {
       this.$http.get('/api/ratings').then(function (response) {
         response = response.body;
         if (response.errno === ERR_OK) {
           this.ratings = response.data;
            this.$nextTick(function() {
             this._initScroll();
             this.satisfyLength();
           });
         }
       });
     },
     computed: {
     },
     methods: {
       _initScroll: function () {
           if (!this.scroll) {
             this.scroll = new BScroll(this.$refs.wrappers, {
               click: true
             });
           } else {
               this.scroll.refresh();
           }
       },
       selectAll: function (sType) {
           this.allNot = sType;
       },
       needShow: function (type, text, rateType) {
         if (type === 2 && this.isChecked && text) {
             return true;
         }
         if (this.isChecked && rateType === type && text) {
            return true;
         }
         if (type === 2 && !this.isChecked) {
           return true;
         }
         if (!this.isChecked && rateType === type) {
           return true;
         }
         this.$nextTick(function () {
           this.scroll.refresh();
         });
       },
       satisfyLength: function () {
         let countt = [];
         let List = [];
         this.ratings.forEach(function (ratingItem) {
           if (ratingItem.rateType === 0) {
             countt.push(ratingItem);
           }
           if (ratingItem.rateType === 1) {
             List.push(ratingItem);
           }
         });
         this.indexOff = countt.length;
         this.Oppo = List.length;
       }
     }
   };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .ratingWrapper
    position fixed
    top 200px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .ratingBox
     .ratingContent
       display flex
       width 100%
       .ratingContentLeft
         flex 0 0 150px
         width 150px
         margin 18px 0
         border-right 1px solid rgb(147,153,159,0.1)
         @media only screen and (max-width 320px)
           flex 0 0 110px
           width 110px
         .ratingContentNum
           text-align center
           font-size 24px
           color rgb(255,153,0)
           line-height 28px
         .ratingContentTitle
            font-size 12px
            color rgb(7,17,27)
            line-height 20px
            text-align center
            font-weight 700
         .ratingContentThen
           font-size 10px
           color rgb(7,17,27)
           line-height 20px
           text-align center
       .ratingContentRight
         flex 1
         margin 18px 0
         .serverTop
           font-size 0
           padding-left 24px
           .serverSpan
             display inline-block
             margin-right 10px
             font-size 12px
             color rgb(7,17,27)
             line-height 36px
             font-weight 700
           .stars
             display inline-block
             margin 0 0px 12px 0
           .runTime
             display inline-block
             color rgb(147,153,159)
             line-height 36px
             font-size 12px


     .allRatings
         width 100%
        .threeRatings
          margin 36px 12px 0px 12px
          padding-bottom 36px
          border-bottom 1px solid rgba(77,85,93,0.2)
          .all
            display inline-block
            width 75px
            height 36px
            line-height 36px
            font-size 16px
            color rgba(0,0,0,0.2)
            background rgba(0,160,220,0.2)
            text-align center
            font-weight 500
            margin-right 12px
            &.active
              background rgb(0,160,220)
              color rgb(255,255,255)
          .num
            display inline-block
            margin-left:5px
          .satisfy
              display inline-block
              width 75px
              height 36px
              line-height 36px
              font-size 16px
              color rgb(77,85,93)
              background rgba(0,160,220,0.2)
              text-align center
              font-weight 500
              margin-right 12px
              &.active
                background rgb(0,160,220)
                color rgb(255,255,255)
           .noSatisfy
               display inline-block
               width 75px
               height 36px
               line-height 36px
               font-size 16px
               color rgba(0,0,0,0.5)
               background rgba(77,85,93,0.2)
               text-align center
               font-weight 500
               &.active
                 background rgb(77,85,93)
                 color rgb(255,255,255)
        .onlyCont
           padding 36px 12px 36px 12px
           font-size 12px
           color rgb(147,153,159)
           font-weight 500
           border-bottom 1px solid rgba(77,85,93,0.2)
           input
             display inline-block
             vertical-align top
             margin-top 0
           span
             display inline-block
             vertical-align top
             margin-left 5px
        .useRatings
          width 100%
          .usrratingItem
            display flex
            padding 36px 0px  36px 0px
            margin: 0px 12px 0px 12px
            border-bottom 1px solid rgba(147,153,159,0.2)
            .ratingsImg
              flex 0 0 58px
              width 58px
              margin-right 12px
              img
                width 56px
                height: 56px
                border-radius 50%
                vertical-align top
            .ratingRight
              width 100%
              .userName
                color rgb(7,17,27)
                line-height 24px
                font-size 10px
              .contentStar
                margin 0
                line-height 24px
                display inline-block
                margin-right 12px
                .riving
                   font-size 10px
                   color rgb(147,153,159)
                   font-weight 200
                   line-height:24px
              .userWord
                color rgb(7,17,27)
                line-height 15px
                font-size 12px
              .recommoned
                width 100%
                line-height 32px
                .pointer
                  display inline-block
                  height 12px
                  width 12px
                  vertical-align middle
                .pointer1
                  background rgb(0,160,220)
                .pointer2
                  background rgb(183,187,191)
                .pointerContent
                  display inline-block
                  height 25px
                  line-height 25px
                  text-align center
                  border 1px solid rgba(7,17,27,0.1)
                  border-radius 2px
                  margin-left 12px
                  background white
</style>
